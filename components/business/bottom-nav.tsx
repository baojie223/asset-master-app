"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon, WalletIcon, ReceiptIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    name: "首页",
    href: "/",
    icon: HomeIcon,
  },
  {
    name: "资产",
    href: "/assets",
    icon: WalletIcon,
  },
  {
    name: "交易",
    href: "/transactions",
    icon: ReceiptIcon,
  },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background">
      <div className="mx-auto flex max-w-screen-xl items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-1 flex-col items-center gap-1 px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
} 