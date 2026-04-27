import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ExamAI – Provplattform för gymnasielärare",
  description: "Skapa och genomför AI-genererade prov med GDPR-säker elevhantering",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
