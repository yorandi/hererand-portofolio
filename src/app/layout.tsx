import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HereRand — Software Engineer",
  description:
    "Software engineer portfolio featuring full-stack applications, backend systems, and a biometric payment research prototype.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
