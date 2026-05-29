"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Download, RefreshCw, Trash2 } from "lucide-react";
import { Lead } from "@/lib/types";
import { readLeads, removeLeads, toCsv } from "@/lib/storage";

export default function AdminPage() {
  const [leads, setLeads] = useState<Lead[]>([]);

  function refresh() {
    setLeads(readLeads());
  }

  useEffect(() => {
    refresh();
  }, []);

  function exportCsv() {
    const blob = new Blob([toCsv(leads)], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const element = document.createElement("a");
    element.href = url;
    element.download = "kingsway-academy-leads.csv";
    element.click();
    URL.revokeObjectURL(url);
  }

  function clearAll() {
    removeLeads();
    refresh();
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white px-5 py-8">
      <section className="mx-auto max-w-7xl">
        <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-white/80">
          <ArrowLeft size={18} />
          Back to demo
        </Link>

        <div className="rounded-[2rem] bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 p-6 shadow-soft">
          <div className="flex flex-col gap-5 border-b border-white/20 pb-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-slate-200">Admin dashboard</p>
              <h1 className="mt-2 text-3xl font-bold text-white">Captured inquiries</h1>
              <p className="mt-2 text-slate-300">Local demo leads submitted from the chat page.</p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button onClick={refresh} className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-3 text-sm font-semibold text-white">
                <RefreshCw size={16} />
                Refresh
              </button>
              <button onClick={exportCsv} className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-700 px-4 py-3 text-sm font-semibold text-white">
                <Download size={16} />
                Export CSV
              </button>
              <button onClick={clearAll} className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 px-4 py-3 text-sm font-semibold text-white">
                <Trash2 size={16} />
                Clear
              </button>
            </div>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[900px] border-separate border-spacing-y-3 text-left text-sm">
              <thead>
                <tr className="text-slate-300">
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Interest</th>
                  <th className="px-4 py-2">Language</th>
                  <th className="px-4 py-2">Created</th>
                </tr>
              </thead>
              <tbody>
                {leads.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="rounded-2xl bg-white/5 px-4 py-10 text-center text-slate-300">
                      No inquiries yet. Submit one from the chat demo first.
                    </td>
                  </tr>
                ) : (
                  leads.map((lead) => (
                    <tr key={lead.id} className="bg-white/5">
                      <td className="rounded-l-2xl px-4 py-4 font-semibold text-white">{lead.name}</td>
                      <td className="px-4 py-4 text-slate-300">{lead.email}</td>
                      <td className="px-4 py-4 text-slate-300">{lead.interest}</td>
                      <td className="px-4 py-4 text-slate-300">{lead.language.toUpperCase()}</td>
                      <td className="rounded-r-2xl px-4 py-4 text-slate-300">
                        {new Date(lead.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}
