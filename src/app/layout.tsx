import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ui/toast";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ComicCraft AI — Transform Your Imagination Into Comics",
    template: "%s | ComicCraft AI",
  },
  description:
    "AI-powered comic creation platform. Enter a story idea, generate scenes and characters, and produce stunning comic panels with full creative control.",
  keywords: [
    "comic creator",
    "AI comics",
    "comic generator",
    "story to comic",
    "character creator",
    "comic book maker",
  ],
  authors: [{ name: "ComicCraft AI" }],
  openGraph: {
    title: "ComicCraft AI — Transform Your Imagination Into Comics",
    description:
      "AI-powered comic creation platform with story generation, character design, and panel artwork.",
    type: "website",
    locale: "en_US",
    siteName: "ComicCraft AI",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-dark-bg text-surface-100">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
