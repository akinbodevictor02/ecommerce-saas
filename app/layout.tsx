import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Navbar } from "@/components/ui/navbar";
import { Toaster } from "sonner";
import Providers from "./providers";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "E-commerce SaaS",
  description: "Modern SaaS E-commerce Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex-col bg-glow">

        {/* Paystack Script */}
        <Script
          src="https://js.paystack.co/v1/inline.js"
          strategy="beforeInteractive"
        />

        {/* 🔥 SESSION PROVIDER WRAPS EVERYTHING */}
        <Providers>

          {/* Navbar */}
          <Navbar />

          {/* Main Content */}
          <main className="flex-1 pt-20">
            {children}
          </main>

          <Footer />

          {/* Toaster */}
          <Toaster 
          position="top-right" 
          richColors
          closeButton
          expand
          />

        </Providers>

      </body>
    </html>
  );
}