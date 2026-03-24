import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI-workshop för lärare",
  description: "Workshop-formulär för diskussion om AI i undervisningen",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv">
      <body className="bg-gray-50 text-gray-900 antialiased">{children}</body>
    </html>
  );
}
