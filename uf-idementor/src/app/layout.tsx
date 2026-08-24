import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UF-idémentor",
  description:
    "En AI-mentor som hjälper UF-elever testa och skärpa sina affärsidéer genom frågor - aldrig färdiga svar.",
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
