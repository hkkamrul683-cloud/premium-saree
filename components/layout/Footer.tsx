"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Phone, Mail, MapPin, ShieldCheck, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1a050b] text-[#fdfbf7] pt-16 pb-12 border-t-2 border-[#d4af37]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#580c1f]/60">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-[#d4af37]" />
              <span className="text-2xl font-serif font-bold tracking-wider text-white">
                ROYAL SAREE
              </span>
            </div>
            <p className="text-[#f3e5ab]/80 text-sm leading-relaxed max-w-sm">
              Preserving Bengal&apos;s timeless handloom legacy since 1988. Every saree is an original piece of living art, handwoven on authentic pit looms by multi-generational master weavers.
            </p>
            <div className="pt-2 flex flex-col space-y-2 text-xs text-[#fdfbf7]/90">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#d4af37]" />
                <span>Road 11, Banani & Dhanmondi 27, Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#d4af37]" />
                <span>+880 1800-SAREE (72733) / +880 1711-000000</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#d4af37]" />
                <span>concierge@royalsaree.com</span>
              </div>
            </div>
          </div>

          {/* Saree Categories */}
          <div>
            <h4 className="text-sm font-serif uppercase tracking-widest text-[#d4af37] font-semibold mb-4">
              Collections
            </h4>
            <ul className="space-y-2.5 text-sm text-[#fdfbf7]/80">
              <li>
                <Link href="/shop?category=jamdani" className="hover:text-[#d4af37] transition-colors">
                  Dhakai Jamdani
                </Link>
              </li>
              <li>
                <Link href="/shop?category=katan" className="hover:text-[#d4af37] transition-colors">
                  Royal Mirpur Katan
                </Link>
              </li>
              <li>
                <Link href="/shop?category=silk" className="hover:text-[#d4af37] transition-colors">
                  Rajshahi Mulberry Silk
                </Link>
              </li>
              <li>
                <Link href="/shop?category=muslin" className="hover:text-[#d4af37] transition-colors">
                  Gossamer Muslin
                </Link>
              </li>
              <li>
                <Link href="/shop?category=wedding" className="hover:text-[#d4af37] transition-colors">
                  Bridal Troussseau
                </Link>
              </li>
              <li>
                <Link href="/shop?category=tangail" className="hover:text-[#d4af37] transition-colors">
                  Tangail Handloom Taant
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Assistance */}
          <div>
            <h4 className="text-sm font-serif uppercase tracking-widest text-[#d4af37] font-semibold mb-4">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-sm text-[#fdfbf7]/80">
              <li>
                <Link href="/order-tracking" className="hover:text-[#d4af37] transition-colors">
                  Track Order Status
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-[#d4af37] transition-colors">
                  Customer Account
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="hover:text-[#d4af37] transition-colors">
                  My Wishlist
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#d4af37] transition-colors">
                  Our Weaving Heritage
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#d4af37] transition-colors">
                  Atelier Appointments
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#d4af37] transition-colors">
                  Artisan Care Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* VIP Privilege & Newsletter */}
          <div className="space-y-4">
            <h4 className="text-sm font-serif uppercase tracking-widest text-[#d4af37] font-semibold">
              Atelier Privileges
            </h4>
            <p className="text-xs text-[#fdfbf7]/70 leading-relaxed">
              Subscribe for private bridal previews, seasonal weave drops, and complimentary luxury gift packaging.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert("Thank you for joining Royal Saree Private Circle!"); }} className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                required
                className="w-full px-3.5 py-2 text-xs rounded-md bg-[#2d0913] border border-[#d4af37]/40 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
              />
              <button
                type="submit"
                className="w-full py-2 bg-gradient-to-r from-[#d4af37] to-[#b38f2e] text-[#1a050b] text-xs font-bold uppercase tracking-wider rounded-md hover:brightness-110 transition-all"
              >
                Join Private Circle
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar: Trust & Payment Icons */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#fdfbf7]/70">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[#f3e5ab] font-medium flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
              Accepted Payment Gateways:
            </span>
            <span className="px-2.5 py-1 rounded bg-[#2d0913] border border-[#d4af37]/30 text-white font-semibold">
              Cash on Delivery
            </span>
            <span className="px-2.5 py-1 rounded bg-[#df146e] text-white font-bold">
              bKash
            </span>
            <span className="px-2.5 py-1 rounded bg-[#f7941d] text-white font-bold">
              Nagad
            </span>
            <span className="px-2.5 py-1 rounded bg-[#1a1f71] text-white font-semibold">
              Visa / Mastercard
            </span>
          </div>

          <div className="text-center md:text-right">
            <p>© {new Date().getFullYear()} ROYAL SAREE ATELIER. All rights reserved.</p>
            <p className="text-[11px] text-[#f3e5ab]/60 mt-1 flex items-center justify-center md:justify-end gap-1">
              Crafted with <Heart className="w-3 h-3 text-[#df146e] inline fill-current" /> for Bengal Handloom Heritage
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
