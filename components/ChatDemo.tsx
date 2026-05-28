"use client";

import { FormEvent, useMemo, useState, useEffect, useRef } from "react";
import { ArrowRight, Bot, CheckCircle2, Globe2, MessageCircle, Send, ShieldCheck, UserRound } from "lucide-react";
import { faqs, getAnswer, ui } from "@/lib/content";
import { addLead } from "@/lib/storage";
import { Language, Message } from "@/lib/types";

function id() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return Math.random().toString(36).slice(2);
}

export default function ChatDemo() {
  const [language, setLanguage] = useState<Language>("en");
  const [input, setInput] = useState("");
  const [lead, setLead] = useState({ name: "", email: "", interest: "" });
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial",
      role: "assistant",
      text: "Welcome. I can help with admissions, programs, tuition, and contact questions.",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isTyping) {
      const timer = setTimeout(() => {
        setIsTyping(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isTyping]);

  const text = ui[language];

  const quickQuestions = useMemo(
    () => faqs.map((faq) => ({ label: faq.question[language], value: faq.question[language] })),
    [language]
  );

  function send(value = input) {
    const question = value.trim();
    if (!question) return;

    const now = new Date().toISOString();
    setMessages((current) => [
      ...current,
      { id: id(), role: "user", text: question, timestamp: now },
    ]);
    setInput("");
    
    // Show typing indicator
    setIsTyping(true);
    
    // Simulate AI response delay
    setTimeout(() => {
      setMessages((current) => [
        ...current,
        { id: id(), role: "assistant", text: getAnswer(question, language), timestamp: new Date().toISOString() },
      ]);
      setIsTyping(false);
    }, 800);
  }

  function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!lead.name.trim() || !lead.email.trim()) return;

    addLead({
      id: id(),
      name: lead.name.trim(),
      email: lead.email.trim(),
      interest: lead.interest.trim() || "General inquiry",
      language,
      createdAt: new Date().toISOString(),
    });

    setLead({ name: "", email: "", interest: "" });
    setMessages((current) => [...current, { id: id(), role: "assistant", text: text.saved, timestamp: new Date().toISOString() }]);
  }

  function clearChat() {
    setMessages([
      {
        id: "initial",
        role: "assistant",
        text: "Welcome. I can help with admissions, programs, tuition, and contact questions.",
        timestamp: new Date().toISOString(),
      },
    ]);
  }

  return (
    <main className="min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <section className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-6 py-10 lg:grid-cols-[1fr_1.2fr] lg:px-10">
        <div className="relative">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-gradient-to-r from-white/10 to-white/5 px-5 py-2.5 text-sm text-slate-200 backdrop-blur-sm">
            <ShieldCheck size={18} />
            {text.badge}
          </div>

          <h1 className="mt-8 max-w-2xl text-5xl font-bold tracking-tight text-white md:text-7xl">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">{text.headline}</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">{text.subhead}</p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={() => setLanguage(language === "en" ? "es" : "en")}
              className="inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-white to-slate-100 px-6 py-3.5 text-sm font-semibold text-slate-900 transition-all hover:from-slate-100 hover:to-white hover:shadow-lg active:scale-95"
            >
              <Globe2 size={20} />
              {language === "en" ? "Switch to Spanish" : "Cambiar a inglés"}
            </button>

            <a
              href="/admin"
              className="inline-flex items-center gap-2.5 rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/15 hover:shadow-lg active:scale-95 backdrop-blur-sm"
            >
              {text.adminLink}
              <ArrowRight size={20} />
            </a>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {["Bilingual FAQ", "Lead Capture", "CSV Export"].map((item) => (
              <div key={item} className="rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-5 text-sm text-slate-200 backdrop-blur-sm">
                <CheckCircle2 className="mb-3.5 text-cyan-400" size={22} />
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-white/20 bg-gradient-to-br from-white/15 to-white/5 p-4 shadow-2xl shadow-blue-900/20 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl"></div>
          <div className="grid gap-4 rounded-2xl bg-gradient-to-br from-slate-50 to-white p-4 text-slate-950 md:grid-cols-[1.2fr_0.8fr]">
            <section className="flex min-h-[680px] flex-col rounded-xl bg-white shadow-lg border border-slate-200">
              <header className="flex items-center justify-between border-b border-slate-200/50 bg-gradient-to-r from-blue-50 to-white p-5">
                <div className="flex items-center gap-4">
                  <div className="relative grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-md">
                    <Bot size={24} />
                    <div className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-white bg-emerald-500"></div>
                  </div>
                  <div>
                    <h2 className="font-bold text-lg text-slate-900">{text.chatTitle}</h2>
                    <p className="flex items-center gap-2 text-sm text-slate-600">
                      <span className="flex h-2 w-2">
                        <span className="absolute inline-flex h-2 w-2 rounded-full bg-emerald-400 opacity-75 animate-ping"></span>
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                      </span>
                      {text.chatStatus}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={clearChat}
                    className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-all hover:border-red-400 hover:bg-red-50 hover:text-red-700 hover:shadow-sm active:scale-95"
                    title="Clear chat history"
                  >
                    <span className="flex items-center gap-1.5">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Clear Chat
                    </span>
                  </button>
                  <div className="h-8 w-8 rounded-lg bg-blue-100 grid place-items-center text-blue-600">
                    <MessageCircle size={18} />
                  </div>
                </div>
              </header>

              <div className="flex-1 overflow-hidden flex flex-col bg-gradient-to-b from-white to-slate-50/50">
                <div className="flex-1 overflow-y-auto p-5 space-y-4 max-h-[480px]">
                  {messages.map((message, index) => {
                    const showTimestamp = index === messages.length - 1 || 
                      (message.timestamp && messages[index + 1]?.timestamp && 
                       new Date(message.timestamp).getTime() - new Date(messages[index + 1].timestamp!).getTime() < -30000);
                    
                    return (
                      <div key={message.id} className={`flex gap-2 chat-message ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                        {message.role === "assistant" && (
                          <div className="relative grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-sm mt-0.5">
                            <Bot size={18} />
                          </div>
                        )}

                        <div className={`max-w-[78%] rounded-2xl px-5 py-3.5 text-sm leading-relaxed shadow-sm ${message.role === "user" ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white" : "bg-gradient-to-r from-slate-50 to-white text-slate-800 border border-slate-200/50"}`}>
                          <div className="font-medium">{message.text}</div>
                          {showTimestamp && message.timestamp && (
                            <div className={`text-xs mt-2 font-medium ${message.role === "user" ? "text-blue-200/90" : "text-slate-500"}`}>
                              {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          )}
                        </div>

                        {message.role === "user" && (
                          <div className="relative grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 text-blue-800 shadow-sm mt-0.5">
                            <UserRound size={18} />
                          </div>
                        )}
                      </div>
                    );
                  })}
                  
                  {isTyping && (
                    <div className="flex gap-2 chat-message justify-start">
                      <div className="relative grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-sm mt-0.5">
                        <Bot size={18} />
                      </div>
                      <div className="max-w-[78%] rounded-2xl px-5 py-3.5 bg-gradient-to-r from-slate-50 to-white text-slate-800 border border-slate-200/50 shadow-sm">
                        <div className="flex items-center gap-1.5">
                          <div className="h-2 w-2 rounded-full bg-slate-400 animate-pulse"></div>
                          <div className="h-2 w-2 rounded-full bg-slate-400 animate-pulse delay-150"></div>
                          <div className="h-2 w-2 rounded-full bg-slate-400 animate-pulse delay-300"></div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
                
                {messages.length > 10 && (
                  <div className="border-t border-slate-100 px-4 py-2 text-center">
                    <button
                      onClick={() => {
                        const chatContainer = document.querySelector('.overflow-y-auto');
                        if (chatContainer) {
                          chatContainer.scrollTop = chatContainer.scrollHeight;
                        }
                      }}
                      className="text-xs text-slate-500 hover:text-slate-700"
                    >
                      Scroll to latest messages
                    </button>
                  </div>
                )}
              </div>

              <div className="border-t border-slate-200/50 bg-gradient-to-t from-white to-slate-50/80 p-5">
                <div className="mb-4">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Quick Questions</p>
                  <div className="flex flex-wrap gap-2.5">
                    {quickQuestions.map((question) => (
                      <button key={question.label} onClick={() => {
                        const now = new Date().toISOString();
                        setMessages((current) => [
                          ...current,
                          { id: id(), role: "user", text: question.value, timestamp: now },
                        ]);
                        
                        // Show typing indicator
                        setIsTyping(true);
                        
                        // Simulate AI response delay
                        setTimeout(() => {
                          setMessages((current) => [
                            ...current,
                            { id: id(), role: "assistant", text: getAnswer(question.value, language), timestamp: new Date().toISOString() },
                          ]);
                          setIsTyping(false);
                        }, 800);
                      }} className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-all hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 hover:shadow-sm active:scale-95">
                        {question.label}
                      </button>
                    ))}
                  </div>
                </div>

                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    send();
                  }}
                  className="flex gap-3"
                >
                  <div className="relative flex-1">
                    <input
                      value={input}
                      onChange={(event) => setInput(event.target.value)}
                      placeholder={text.inputPlaceholder}
                      className="w-full rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-sm"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                  </div>
                  <button className="grid h-14 w-14 place-items-center rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white transition-all hover:from-blue-700 hover:to-blue-800 hover:shadow-lg active:scale-95" aria-label="Send">
                    <Send size={20} />
                  </button>
                </form>
              </div>
            </section>

            <aside className="rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white border border-slate-700/50 shadow-lg">
              <div className="mb-6">
                <h3 className="text-2xl font-bold">{text.leadTitle}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">{text.leadText}</p>
              </div>

              <form onSubmit={submitLead} className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-400">{text.name}</label>
                  <input
                    value={lead.name}
                    onChange={(event) => setLead({ ...lead, name: event.target.value })}
                    placeholder="Enter your full name"
                    className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3.5 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-400">{text.email}</label>
                  <input
                    value={lead.email}
                    onChange={(event) => setLead({ ...lead, email: event.target.value })}
                    placeholder="your.email@example.com"
                    type="email"
                    className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3.5 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-400">{text.interest}</label>
                  <textarea
                    value={lead.interest}
                    onChange={(event) => setLead({ ...lead, interest: event.target.value })}
                    placeholder="Tell us what you're interested in..."
                    rows={4}
                    className="w-full resize-none rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3.5 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                <button className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3.5 text-sm font-bold text-white transition-all hover:from-cyan-600 hover:to-blue-700 hover:shadow-lg active:scale-95">
                  {text.submit}
                </button>
              </form>

              <div className="mt-6 rounded-xl border border-slate-700/50 bg-slate-800/30 p-4 text-xs leading-relaxed text-slate-400">
                <div className="flex items-start gap-2">
                  <svg className="h-4 w-4 mt-0.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Demo storage uses browser localStorage. Production can connect to Supabase, Firebase, PostgreSQL, HubSpot, or email notification.</span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
