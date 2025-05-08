import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BottomNav } from "@/components/business/bottom-nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "资产管理",
  description: "一个简单的资产管理应用",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body className={inter.className}>
        <main className="pb-16">
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  );
}
