import type { Metadata } from "next";
import "./globals.css";
import { PortfolioApp } from "@/components/PortfolioApp";
import { getActivity } from "@/lib/activity";

const themeScript = `(function(){try{var t=localStorage.getItem('hererand-theme');document.documentElement.dataset.theme=t==='light'||t==='dark'?t:matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light'}catch(e){document.documentElement.dataset.theme=matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light'}})()`;

export const metadata: Metadata = {
  title: {
    default: "HERERAND — Randi Fauzi | Software & Data",
    template: "%s | HERERAND",
  },
  description:
    "Meet Randi Fauzi, an Informatics Engineering graduate exploring web development, practical software solutions, and data engineering.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const activity = await getActivity();
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <PortfolioApp activity={activity}>{children}</PortfolioApp>
      </body>
    </html>
  );
}
