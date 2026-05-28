import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kingsway Academy Assistant",
  description: "Bilingual admissions chat POC",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
