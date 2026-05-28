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
    <main className="min-h-screen bg-slate-100 px-5 py-8">
      <section className="mx-auto max-w-7xl">
        <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-950">
          <ArrowLeft size={18} />
          Back to demo
        </Link>

        <div className="rounded-[2rem] bg-white p-6 shadow-soft">
          <div className="flex flex-col gap-5 border-b border-slate-100 pb-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-600">Admin dashboard</p>
              <h1 className="mt-2 text-3xl font-bold text-slate-950">Captured inquiries</h1>
              <p className="mt-2 text-slate-500">Local demo leads submitted from the chat page.</p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button onClick={refresh} className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold">
                <RefreshCw size={16} />
                Refresh
              </button>
              <button onClick={exportCsv} className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white">
                <Download size={16} />
                Export CSV
              </button>
              <button onClick={clearAll} className="inline-flex items-center gap-2 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
                <Trash2 size={16} />
                Clear
              </button>
            </div>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[900px] border-separate border-spacing-y-3 text-left text-sm">
              <thead>
                <tr className="text-slate-500">
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
                    <td colSpan={5} className="rounded-2xl bg-slate-50 px-4 py-10 text-center text-slate-500">
                      No inquiries yet. Submit one from the chat demo first.
                    </td>
                  </tr>
                ) : (
                  leads.map((lead) => (
                    <tr key={lead.id} className="bg-slate-50">
                      <td className="rounded-l-2xl px-4 py-4 font-semibold text-slate-900">{lead.name}</td>
                      <td className="px-4 py-4 text-slate-600">{lead.email}</td>
                      <td className="px-4 py-4 text-slate-600">{lead.interest}</td>
                      <td className="px-4 py-4 text-slate-600">{lead.language.toUpperCase()}</td>
                      <td className="rounded-r-2xl px-4 py-4 text-slate-600">
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
