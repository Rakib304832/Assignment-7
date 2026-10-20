import type { Metadata } from "next";
import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./component/Header";
import PriceTicker from "./component/PriceTicker";
import RouteTicker from "./component/RouteTicker";
import Footer from "./component/Footer";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "বাজার দর",
  description: "আজকের বাজারের পণ্যের দাম ও বাজারভিত্তিক তুলনা দেখুন।",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="bn"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-screen flex-col">
        <Suspense fallback={<div className="h-14 border-b border-gray-200 bg-white" />}>
          <Header />
        </Suspense>
        <Suspense fallback={<div className="h-8" aria-label="দাম লোড হচ্ছে" />}>
          <RouteTicker>
            <PriceTicker />
          </RouteTicker>
        </Suspense>
        {children}
        <Footer />
      </body>
    </html>
  );
}
