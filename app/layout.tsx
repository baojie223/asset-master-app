import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import { BottomNav } from "@/components/business/bottom-nav";
import { AuthProvider } from "@/lib/auth-context";
// import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jie & Lina's Journey",
  description: "纪念日网站",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body className={inter.className}>
        <AuthProvider>
          {/* <main className="pb-16"> */}
            {children}
          {/* </main> */}
          {/* <BottomNav /> */}
          {/* <Toaster /> */}
        </AuthProvider>
      </body>
    </html>
  );
}
