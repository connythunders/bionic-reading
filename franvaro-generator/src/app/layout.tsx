import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frånvaro-generator",
  description:
    "Skapa vikariematerial på minuter – kopplat till Skolverkets kunskapskrav.",
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
