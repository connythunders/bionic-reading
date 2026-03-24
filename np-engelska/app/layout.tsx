import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NP Engelska – Träna inför Nationella Provet",
  description:
    "Öva på alla delar av det nationella provet i engelska för årskurs 9 med interaktiva uppgifter och AI-handledning. Speaking, Reading, Listening och Writing.",
  keywords: "nationella provet, engelska, årkurs 9, träna, NP, delprov A, B1, B2, C",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv">
      <body className="antialiased min-h-screen bg-white">{children}</body>
    </html>
  );
}
