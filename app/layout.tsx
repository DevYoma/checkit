import type { Metadata } from "next";
import { Nunito } from "next/font/google"; // Playful font for the Pokédex
import "./globals.scss";
import QueryProvider from "@/components/providers/query-provider";
import { NuqsAdapter } from 'nuqs/adapters/next/app';

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Pokédex Explorer",
  description: "A fun and fast PokéAPI explorer built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${nunito.variable} h-full antialiased font-sans`}
    >
      <body className="min-h-full flex flex-col" style={{ fontFamily: 'var(--font-nunito), sans-serif' }}>
        <NuqsAdapter>
          <QueryProvider>{children}</QueryProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
