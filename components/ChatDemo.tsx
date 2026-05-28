"use client";

import { FormEvent, useMemo, useState, useRef, useEffect } from "react";
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
    },
  ]);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const text = ui[language];

  const quickQuestions = useMemo(
    () => faqs.map((faq) => ({ label: faq.question[language], value: faq.question[language] })),
    [language]
  );

  function send(value = input) {
    const question = value.trim();
    if (!question) return;

    setMessages((current) => [
      ...current,
      { id: id(), role: "user", text: question },
      { id: id(), role: "assistant", text: getAnswer(question, language) },
    ]);
    setInput("");
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
    setMessages((current) => [...current, { id: id(), role: "assistant", text: text.saved }]);
  }

  function clearChat() {
    setMessages([
      {
        id: "initial",
        role: "assistant",
        text: "Welcome. I can help with admissions, programs, tuition, and contact questions.",
      },
    ]);
  }

  // Scroll to bottom when messages change
  useEffect(() => {
    if (!chatContainerRef.current) return;
    
    const container = chatContainerRef.current;
    
    // Always scroll to bottom when new messages are added
    // This ensures chat stays readable as messages accumulate
    const scrollTimer = setTimeout(() => {
      container.scrollTop = container.scrollHeight;
    }, 50);
    
    return () => clearTimeout(scrollTimer);
  }, [messages]);

  return (
    <main className="h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <section className="h-full mx-auto grid max-w-8xl items-center gap-8 px-6 py-8 lg:grid-cols-[1fr_1.35fr] lg:px-8">
        <div className="space-y-8 pl-2">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm text-slate-200 backdrop-blur-sm">
            <ShieldCheck size={18} />
            {text.badge}
          </div>

          <div>
            <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">{text.headline}</span>
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-300 lg:text-lg">{text.subhead}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setLanguage(language === "en" ? "es" : "en")}
              className="inline-flex items-center gap-2.5 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition-all hover:bg-slate-50 hover:shadow-sm active:scale-95"
            >
              <Globe2 size={18} />
              {language === "en" ? "Switch to Spanish" : "Cambiar a inglés"}
            </button>

            <a
              href="/admin"
              className="inline-flex items-center gap-2.5 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-white/15 hover:shadow-sm active:scale-95 backdrop-blur-sm"
            >
              {text.adminLink}
              <ArrowRight size={18} />
            </a>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {language === "en" 
              ? ["Bilingual FAQ", "Lead Capture", "CSV Export"].map((item) => (
                  <div key={item} className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200 backdrop-blur-sm">
                    <CheckCircle2 className="mb-3 text-cyan-400" size={20} />
                    <span className="font-medium">{item}</span>
                  </div>
                ))
              : ["FAQ Bilingüe", "Captura de Contactos", "Exportar CSV"].map((item) => (
                  <div key={item} className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200 backdrop-blur-sm">
                    <CheckCircle2 className="mb-3 text-cyan-400" size={20} />
                    <span className="font-medium">{item}</span>
                  </div>
                ))
            }
          </div>
        </div>

        <div className="rounded-3xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 p-5 shadow-2xl shadow-blue-900/10 backdrop-blur-sm h-[90vh] max-h-[800px]">
          <div className="grid gap-5 rounded-2xl bg-gradient-to-br from-slate-50 to-white p-5 text-slate-900 h-full md:grid-cols-[1.25fr_0.75fr]">
            <section className="flex flex-col rounded-xl bg-white shadow-lg border border-slate-200/50 h-full">
              {/* HEADER - FIXED */}
              <header className="flex items-center justify-between border-b border-slate-200/50 bg-gradient-to-r from-blue-50/50 to-white p-4 flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="relative grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-sm">
                    <Bot size={20} />
                    <div className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500"></div>
                  </div>
                  <div>
                    <h2 className="font-bold text-base text-slate-900 lg:text-lg">{text.chatTitle}</h2>
                    <p className="flex items-center gap-1.5 text-xs text-slate-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                      {text.chatStatus}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={clearChat}
                    className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition-all hover:border-red-400 hover:bg-red-50 hover:text-red-700 hover:shadow-sm"
                    title={text.clearChat}
                  >
                    <span className="flex items-center gap-1">
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      {text.clear}
                    </span>
                  </button>
                  <div className="h-8 w-8 rounded-lg bg-blue-100 grid place-items-center text-blue-600">
                    <MessageCircle size={16} />
                  </div>
                </div>
              </header>

              {/* MESSAGE AREA - SCROLLS HERE */}
              <div className="flex-1 min-h-0 overflow-hidden">
                <div 
                  ref={chatContainerRef}
                  className="h-full overflow-y-auto p-4 space-y-3 chat-scroll-area"
                >
                  {messages.map((message, index) => (
                    <div 
                      key={message.id} 
                      className={`flex gap-2.5 chat-message-enter ${message.role === "user" ? "justify-end" : "justify-start"}`}
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      {message.role === "assistant" && (
                        <div className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-sm">
                          <Bot size={14} />
                        </div>
                      )}

                      <div className={`max-w-[82%] rounded-xl px-4 py-3 text-sm leading-relaxed shadow-sm ${message.role === "user" ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white" : "bg-gradient-to-r from-slate-50 to-white text-slate-800 border border-slate-200/50"}`}>
                        {message.text}
                      </div>

                      {message.role === "user" && (
                        <div className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 text-blue-800 shadow-sm">
                          <UserRound size={14} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* QUICK QUESTIONS & INPUT - FIXED */}
              <div className="border-t border-slate-200/50 bg-gradient-to-t from-white to-slate-50/50 p-4 flex-shrink-0">
                <div className="mb-3">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">{text.quickQuestions}</p>
                  <div className="flex flex-wrap gap-2">
                    {quickQuestions.map((question) => (
                      <button 
                        key={question.label} 
                        onClick={() => send(question.value)}
                        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition-all hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 hover:shadow-sm"
                      >
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
                  className="flex gap-2"
                >
                  <div className="relative flex-1">
                    <input
                      value={input}
                      onChange={(event) => setInput(event.target.value)}
                      placeholder={text.inputPlaceholder}
                      className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-sm"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                  </div>
                  <button 
                    className="grid h-12 w-12 place-items-center rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white transition-all hover:from-blue-700 hover:to-blue-800 hover:shadow-sm" 
                    aria-label="Send"
                  >
                    <Send size={18} />
                  </button>
                </form>
              </div>
            </section>

            <aside className="rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 p-5 text-white border border-slate-700/50 shadow-lg h-full flex flex-col">
              <div className="mb-5">
                <h3 className="text-xl font-bold lg:text-2xl">{text.leadTitle}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{text.leadText}</p>
              </div>

              <form onSubmit={submitLead} className="space-y-3 flex-1 flex flex-col">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-400">{text.name}</label>
                  <input
                    value={lead.name}
                    onChange={(event) => setLead({ ...lead, name: event.target.value })}
                    placeholder={text.namePlaceholder}
                    className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-400">{text.email}</label>
                  <input
                    value={lead.email}
                    onChange={(event) => setLead({ ...lead, email: event.target.value })}
                    placeholder={text.emailPlaceholder}
                    type="email"
                    className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                <div className="flex-1">
                  <label className="mb-1.5 block text-xs font-semibold text-slate-400">{text.interest}</label>
                  <textarea
                    value={lead.interest}
                    onChange={(event) => setLead({ ...lead, interest: event.target.value })}
                    placeholder={text.interestPlaceholder}
                    rows={3}
                    className="w-full h-full resize-none rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                <button className="w-full rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 text-sm font-bold text-white transition-all hover:from-cyan-600 hover:to-blue-700 hover:shadow-sm">
                  {text.submit}
                </button>
              </form>

              <div className="mt-5 rounded-lg border border-slate-700/50 bg-slate-800/30 p-3 text-xs leading-relaxed text-slate-400">
                <div className="flex items-start gap-2">
                  <svg className="h-3.5 w-3.5 mt-0.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
