import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import React, { Suspense } from "react";
import Providers from "../../components/Providers";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Navbar from "../../components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return [
    { locale: "en" },
    { locale: "ru" },
    { locale: "tj" },
  ];
}

export const metadata: Metadata = {
  title: "TaskFlow | Next.js Showcase",
  description: "Modern fullstack application with Next.js, RTK Query and next-intl",
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50/60 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
        <Providers>
          <NextIntlClientProvider messages={messages}>
            <Suspense fallback={null}>
              <Navbar />
            </Suspense>
            <main className="flex-1">{children}</main>
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
