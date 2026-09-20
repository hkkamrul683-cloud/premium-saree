"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Layers,
  Tag,
  Settings,
  ArrowLeft,
  Sparkles,
  Users,
} from "lucide-react";

export default function AdminSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  const links = [
    { href: "/admin", label: "Dashboard Overview", icon: LayoutDashboard },
    { href: "/admin/products", label: "Saree Products", icon: Package },
    { href: "/admin/orders", label: "Customer Orders", icon: ShoppingBag },
    { href: "/admin/categories", label: "Weave Categories", icon: Layers },
    { href: "/admin/coupons", label: "Discount Coupons", icon: Tag },
  ];

  return (
    <aside className="w-64 bg-[#1a050b] text-[#fdfbf7] min-h-screen p-5 flex flex-col justify-between border-r border-[#580c1f]">
      <div className="space-y-6">
        {/* Brand Header */}
        <div className="pb-4 border-b border-[#580c1f]/60">
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#d4af37]" />
            <span className="font-serif font-bold text-lg text-white">
              ROYAL ATELIER
            </span>
          </Link>
          <span className="text-[10px] tracking-widest uppercase font-semibold text-[#d4af37] block mt-0.5">
            Admin Management Console
          </span>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1 text-xs">
          {links.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium transition-all ${
                  isActive
                    ? "bg-[#800020] text-white font-bold shadow-sm"
                    : "text-[#f3e5ab]/70 hover:bg-[#2d0913] hover:text-white"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-[#d4af37]" : ""}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Back to Public Store */}
      <div className="pt-6 border-t border-[#580c1f]/60">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs font-semibold text-[#f3e5ab] hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-[#d4af37]" />
          <span>Exit To Public Store</span>
        </Link>
      </div>
    </aside>
  );
}
