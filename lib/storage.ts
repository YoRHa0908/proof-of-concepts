import { Lead } from "./types";

const KEY = "kingsway-academy-demo-leads";

export function readLeads(): Lead[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(KEY) || "[]") as Lead[];
  } catch {
    return [];
  }
}

export function addLead(lead: Lead) {
  if (typeof window === "undefined") return;
  const leads = readLeads();
  window.localStorage.setItem(KEY, JSON.stringify([lead, ...leads]));
}

export function removeLeads() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEY);
}

export function toCsv(leads: Lead[]) {
  const rows = [
    ["Name", "Email", "Interest", "Language", "Created At"],
    ...leads.map((lead) => [
      lead.name,
      lead.email,
      lead.interest,
      lead.language,
      new Date(lead.createdAt).toLocaleString(),
    ]),
  ];

  return rows
    .map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(","))
    .join("\n");
}
