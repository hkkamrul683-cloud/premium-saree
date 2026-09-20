import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Award, Heart, ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#b38f2e]">
          The Heritage of Bengal Weaves
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#800020]">
          The Art of the Pit-Loom
        </h1>
        <div className="w-16 h-0.5 bg-[#d4af37] mx-auto" />
        <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-light">
          Founded on the banks of the Shitalakshya river, Royal Saree Atelier was born out of a solemn commitment to revive, protect, and celebrate Bengal&apos;s UNESCO-recognized handloom craft.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border-4 border-[#d4af37]/30 bg-[#faf7f2]">
          <Image
            src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80"
            alt="Handloom Weaver"
            fill
            className="object-cover"
          />
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900">
            A Living Tapestry Spanning Generations
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            In our workshops across Demra, Narayanganj, and Tangail, weavers sit at subterranean pit looms where foot pedals and hand shuttles move in rhythmic symphony. Every Jamdani motif is laid by hand using supplementary wooden needles—a technique virtually unchanged since the royal courts of the Mughal era.
          </p>
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-white rounded-xl border border-[#ebe4d5]">
              <h3 className="text-xl font-serif font-bold text-[#800020]">150+</h3>
              <p className="text-xs text-gray-500">Master Artisan Families</p>
            </div>
            <div className="p-4 bg-white rounded-xl border border-[#ebe4d5]">
              <h3 className="text-xl font-serif font-bold text-[#800020]">100%</h3>
              <p className="text-xs text-gray-500">Fair Wages & Welfare</p>
            </div>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#800020] text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#580c1f] transition-all"
          >
            <span>Explore The Looms</span>
            <ArrowRight className="w-4 h-4 text-[#d4af37]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
