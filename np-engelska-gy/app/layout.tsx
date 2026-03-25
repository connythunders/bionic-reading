import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NP Engelska – Gymnasiet | Engelska 6",
  description:
    "Träna inför Nationella Provet i engelska för gymnasiet. Öva på Speaking, Reading, Listening och Writing på B2-C1 nivå (Engelska 6) med AI-handledning.",
  keywords: "nationella provet, engelska, gymnasiet, engelska 6, träna, NP, delprov A, B2, C1, gy11",
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
