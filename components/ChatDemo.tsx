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
    if (chatContainerRef.current) {
      const container = chatContainerRef.current;
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto grid min-h-screen max-w-7xl items-center gap-8 px-5 py-8 lg:grid-cols-[1fr_1.1fr] lg:px-8">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-slate-200">
            <ShieldCheck size={16} />
            {text.badge}
          </div>

          <h1 className="mt-7 max-w-2xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
            {text.headline}
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">{text.subhead}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => setLanguage(language === "en" ? "es" : "en")}
              className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
            >
              <Globe2 size={18} />
              {language === "en" ? "Switch to Spanish" : "Cambiar a inglés"}
            </button>

            <a
              href="/admin"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              {text.adminLink}
              <ArrowRight size={18} />
            </a>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {["Bilingual FAQ", "Lead Capture", "CSV Export"].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
                <CheckCircle2 className="mb-3 text-cyan-300" size={20} />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/10 p-4 shadow-lg">
          <div className="grid gap-4 rounded-2xl bg-slate-100 p-4 text-slate-950 md:grid-cols-[1.1fr_0.9fr]">
            <section className="flex min-h-[600px] flex-col rounded-xl bg-white shadow-sm">
              <header className="flex items-center justify-between border-b border-slate-100 p-4">
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-950 text-white">
                    <Bot size={22} />
                  </div>
                  <div>
                    <h2 className="font-semibold">{text.chatTitle}</h2>
                    <p className="flex items-center gap-1.5 text-xs text-emerald-600">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      {text.chatStatus}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={clearChat}
                    className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:border-red-300 hover:bg-red-50 hover:text-red-600"
                    title="Clear chat history"
                  >
                    Clear
                  </button>
                  <MessageCircle className="text-slate-400" />
                </div>
              </header>

              <div className="flex-1 overflow-hidden flex flex-col">
                <div 
                  ref={chatContainerRef}
                  className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[400px]"
                >
                  {messages.map((message) => (
                    <div key={message.id} className={`flex gap-2 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                      {message.role === "assistant" && (
                        <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-slate-950 text-white">
                          <Bot size={15} />
                        </div>
                      )}

                      <div className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-6 ${message.role === "user" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700"}`}>
                        {message.text}
                      </div>

                      {message.role === "user" && (
                        <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-blue-100 text-blue-700">
                          <UserRound size={15} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-100 p-4">
                <div className="mb-3 flex flex-wrap gap-2">
                  {quickQuestions.map((question) => (
                    <button 
                      key={question.label} 
                      onClick={() => send(question.value)}
                      className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 transition hover:border-blue-300 hover:bg-blue-50"
                    >
                      {question.label}
                    </button>
                  ))}
                </div>

                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    send();
                  }}
                  className="flex gap-2"
                >
                  <input
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    placeholder={text.inputPlaceholder}
                    className="min-w-0 flex-1 rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                  />
                  <button 
                    className="grid h-12 w-12 place-items-center rounded-2xl bg-slate-950 text-white transition hover:bg-blue-700" 
                    aria-label="Send"
                  >
                    <Send size={18} />
                  </button>
                </form>
              </div>
            </section>

            <aside className="rounded-xl bg-slate-950 p-5 text-white">
              <h3 className="text-xl font-semibold">{text.leadTitle}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">{text.leadText}</p>

              <form onSubmit={submitLead} className="mt-6 space-y-3">
                <input
                  value={lead.name}
                  onChange={(event) => setLead({ ...lead, name: event.target.value })}
                  placeholder={text.name}
                  className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400 focus:border-cyan-300"
                />
                <input
                  value={lead.email}
                  onChange={(event) => setLead({ ...lead, email: event.target.value })}
                  placeholder={text.email}
                  type="email"
                  className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400 focus:border-cyan-300"
                />
                <textarea
                  value={lead.interest}
                  onChange={(event) => setLead({ ...lead, interest: event.target.value })}
                  placeholder={text.interest}
                  rows={4}
                  className="w-full resize-none rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400 focus:border-cyan-300"
                />
                <button className="w-full rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200">
                  {text.submit}
                </button>
              </form>

              <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-xs leading-5 text-slate-300">
                Demo storage uses browser localStorage. Production can connect to Supabase, Firebase, PostgreSQL, HubSpot, or email notification.
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
