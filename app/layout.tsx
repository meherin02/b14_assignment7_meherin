import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Suspense } from "react";
import { Hind_Siliguri } from "next/font/google";
import MarketHeader from "@/components/MarketHeader";
import HeaderSkeleton from "@/components/HeaderSkeleton";
import Footer from "@/components/Footer";
import AuthNotifications from "@/components/AuthNotifications";
import "./globals.css";

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-bangla",
  display: "swap",
});

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "বাজার দর | BazarDor",
  description: "প্রয়োজনীয় পণ্যের দাম এক নজরে।",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="bn" className={hindSiliguri.variable}>
      <body className="flex min-h-screen flex-col">
        <Suspense fallback={null}><AuthNotifications /></Suspense>
        <Suspense fallback={<HeaderSkeleton />}>
          <MarketHeader />
        </Suspense>
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
