import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Ämnesövergripande arbetsområden – Årskurs 7–9",
  description:
    "Skriv in ett tema och välj ämnen att väva in – få ämnesövergripande arbetsområden för högstadiet, förankrade i det centrala innehållet i Lgr22.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv">
      <body>{children}</body>
    </html>
  );
}
