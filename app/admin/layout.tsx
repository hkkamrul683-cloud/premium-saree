"use client";

import React, { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Menu, X, Sparkles } from "lucide-react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#f7f3eb]">
      {/* Desktop Sidebar */}
      <div className="hidden md:block flex-shrink-0">
        <AdminSidebar />
      </div>

      {/* Mobile Top Header for Admin */}
      <div className="md:hidden flex items-center justify-between bg-[#1a050b] text-white px-4 py-3 border-b border-[#580c1f]">
        <Link href="/admin" className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#d4af37]" />
          <span className="font-serif font-bold text-sm tracking-wide">ROYAL ADMIN</span>
        </Link>
        <button
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
          className="p-1.5 rounded-lg bg-[#2d0913] text-[#f3e5ab]"
          aria-label="Toggle admin navigation"
        >
          {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileNavOpen && (
        <div className="md:hidden bg-[#1a050b] p-4 border-b border-[#580c1f]">
          <AdminSidebar onNavigate={() => setMobileNavOpen(false)} />
        </div>
      )}

      {/* Main Admin Content */}
      <main className="flex-1 min-w-0 overflow-x-hidden p-4 sm:p-8 lg:p-10">{children}</main>
    </div>
  );
}
