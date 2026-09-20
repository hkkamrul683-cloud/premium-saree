"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  Sparkles,
} from "lucide-react";
import { useStore } from "@/lib/store";

export default function Navbar() {
  const router = useRouter();
  const { cartCount, wishlistCount, setIsCartOpen } = useStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#fdfbf7]/95 backdrop-blur-md border-b border-[#ebe4d5] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-[#580c1f] hover:text-[#800020] focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Luxury Brand Logo */}
          <div className="flex-shrink-0 text-center lg:text-left">
            <Link href="/" className="group inline-flex flex-col items-center lg:items-start">
              <span className="flex items-center gap-1.5 text-2xl md:text-3xl font-serif font-bold tracking-wider text-[#800020] transition-colors group-hover:text-[#580c1f]">
                <Sparkles className="w-5 h-5 text-[#d4af37] animate-pulse" />
                ROYAL SAREE
              </span>
              <span className="text-[10px] tracking-[0.25em] uppercase font-semibold text-[#b38f2e] -mt-1">
                Luxury Handloom Atelier
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium">
            <Link
              href="/"
              className="text-[#1a1a1a] hover:text-[#800020] transition-colors py-1 hover:border-b-2 hover:border-[#d4af37]"
            >
              Home
            </Link>
            <Link
              href="/shop"
              className="text-[#1a1a1a] hover:text-[#800020] transition-colors py-1 hover:border-b-2 hover:border-[#d4af37]"
            >
              All Sarees
            </Link>
            <Link
              href="/shop?category=jamdani"
              className="text-[#1a1a1a] hover:text-[#800020] transition-colors py-1 hover:border-b-2 hover:border-[#d4af37]"
            >
              Jamdani
            </Link>
            <Link
              href="/shop?category=katan"
              className="text-[#1a1a1a] hover:text-[#800020] transition-colors py-1 hover:border-b-2 hover:border-[#d4af37]"
            >
              Katan
            </Link>
            <Link
              href="/shop?category=silk"
              className="text-[#1a1a1a] hover:text-[#800020] transition-colors py-1 hover:border-b-2 hover:border-[#d4af37]"
            >
              Pure Silk
            </Link>
            <Link
              href="/shop?category=wedding"
              className="text-[#800020] font-semibold hover:text-[#580c1f] transition-colors py-1 hover:border-b-2 hover:border-[#d4af37] flex items-center gap-1"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
              Bridal Edit
            </Link>
            <Link
              href="/order-tracking"
              className="text-[#1a1a1a] hover:text-[#800020] transition-colors py-1 hover:border-b-2 hover:border-[#d4af37]"
            >
              Track Order
            </Link>
            <Link
              href="/about"
              className="text-[#1a1a1a] hover:text-[#800020] transition-colors py-1 hover:border-b-2 hover:border-[#d4af37]"
            >
              Heritage
            </Link>
          </nav>

          {/* Action Icons */}
          <div className="flex items-center space-x-4 sm:space-x-5">
            {/* Search Toggle */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-[#580c1f] hover:text-[#800020] transition-colors rounded-full hover:bg-[#faf7f2]"
              aria-label="Search Products"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Customer Account */}
            <Link
              href="/account"
              className="p-2 text-[#580c1f] hover:text-[#800020] transition-colors rounded-full hover:bg-[#faf7f2] hidden sm:inline-flex"
              aria-label="My Account"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative p-2 text-[#580c1f] hover:text-[#800020] transition-colors rounded-full hover:bg-[#faf7f2]"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-[#800020] rounded-full border border-white">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-[#800020] hover:text-[#580c1f] transition-colors rounded-full hover:bg-[#faf7f2]"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-[#d4af37] rounded-full border border-white shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Expandable Search Input */}
        {isSearchOpen && (
          <div className="py-3 px-2 border-t border-[#ebe4d5] animate-in fade-in slide-in-from-top-2 duration-200">
            <form onSubmit={handleSearchSubmit} className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search handloom sarees by name, weave (e.g. Jamdani, Katan), color or fabric..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full pl-11 pr-24 py-2.5 rounded-full border border-[#d4af37] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#800020] shadow-sm"
              />
              <Search className="w-5 h-5 text-[#800020] absolute left-4 top-3" />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 px-5 py-1.5 bg-[#800020] text-white text-xs font-medium rounded-full hover:bg-[#580c1f] transition-colors"
              >
                Search
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#fdfbf7] border-b border-[#ebe4d5] px-6 py-6 space-y-4 shadow-xl">
          <form onSubmit={handleSearchSubmit} className="relative mb-4">
            <input
              type="text"
              placeholder="Search sarees..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#ebe4d5] bg-white text-sm focus:outline-none focus:ring-1 focus:ring-[#800020]"
            />
            <Search className="w-4 h-4 text-[#800020] absolute left-3.5 top-3" />
          </form>

          <div className="flex flex-col space-y-3 text-base font-medium text-[#1a1a1a]">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-1 border-b border-[#ebe4d5]/50 hover:text-[#800020]"
            >
              Home
            </Link>
            <Link
              href="/shop"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-1 border-b border-[#ebe4d5]/50 hover:text-[#800020]"
            >
              All Sarees
            </Link>
            <Link
              href="/shop?category=jamdani"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-1 border-b border-[#ebe4d5]/50 hover:text-[#800020]"
            >
              Dhakai Jamdani
            </Link>
            <Link
              href="/shop?category=katan"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-1 border-b border-[#ebe4d5]/50 hover:text-[#800020]"
            >
              Royal Katan
            </Link>
            <Link
              href="/shop?category=silk"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-1 border-b border-[#ebe4d5]/50 hover:text-[#800020]"
            >
              Pure Silk
            </Link>
            <Link
              href="/shop?category=wedding"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-1 border-b border-[#ebe4d5]/50 text-[#800020] font-semibold"
            >
              Bridal Collection 💍
            </Link>
            <Link
              href="/order-tracking"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-1 border-b border-[#ebe4d5]/50 hover:text-[#800020]"
            >
              Track Your Order 🚚
            </Link>
            <Link
              href="/account"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-1 hover:text-[#800020]"
            >
              My Account
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
