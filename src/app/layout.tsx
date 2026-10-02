import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PEAT AI — Stop Prompting. Start Specifying.",
  description:
    "PEAT turns rough ideas into engineering-grade prompts for AI coding tools. Less back-and-forth. Better first outputs. Works with Claude, ChatGPT, Gemini, Cursor, and more.",
  keywords: [
    "prompt engineering",
    "AI coding",
    "prompt enhancement",
    "developer tools",
    "Claude",
    "ChatGPT",
    "Gemini",
    "Cursor",
  ],
  openGraph: {
    title: "PEAT AI — Stop Prompting. Start Specifying.",
    description:
      "Turn rough ideas into engineering-grade prompts for AI coding tools.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
