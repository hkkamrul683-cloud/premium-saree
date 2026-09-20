"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Award,
  Star,
  Quote,
  CheckCircle2,
} from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import { INITIAL_CATEGORIES } from "@/lib/seed-data";
import { useStore } from "@/lib/store";

export default function HomePage() {
  const { products } = useStore();

  const featuredProducts = products.filter((p) => p.featured).slice(0, 4);
  const bestSellers = products.filter((p) => p.bestSeller).slice(0, 4);
  const newArrivals = products.filter((p) => p.newArrival).slice(0, 4);

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#f7f3eb] to-[#fdfbf7] py-12 md:py-20 border-b border-[#ebe4d5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fce7ea] border border-[#800020]/20 text-[#800020] text-xs font-semibold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>The Royal Handloom Collection</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#1a1a1a] tracking-tight leading-[1.15]">
                Woven in Pure Silk, <br />
                <span className="text-[#800020]">Crowned in Gold.</span>
              </h1>

              <p className="text-base sm:text-lg text-gray-700 max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
                Experience the majestic artistry of authentic Dhakai Jamdani, Mirpur Katan, and gossamer Bengal Muslin. Handcrafted over weeks by master weavers to adorn your most cherished celebrations.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/shop"
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#800020] to-[#580c1f] text-white text-sm font-bold uppercase tracking-wider rounded-xl hover:brightness-110 shadow-lg shadow-[#800020]/20 transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Explore Collection</span>
                  <ArrowRight className="w-4 h-4 text-[#d4af37] group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/shop?category=wedding"
                  className="w-full sm:w-auto px-8 py-4 bg-white border border-[#d4af37] text-[#800020] text-sm font-bold uppercase tracking-wider rounded-xl hover:bg-[#faf7f2] shadow-sm transition-all text-center flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#d4af37]" />
                  <span>Bridal Sarees</span>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-[#ebe4d5]/80 max-w-lg mx-auto lg:mx-0 text-left">
                <div className="flex items-center gap-2 text-xs text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-[#800020] flex-shrink-0" />
                  <span>100% Authentic Handloom</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-[#800020] flex-shrink-0" />
                  <span>Tested Gold Zari</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-[#800020] flex-shrink-0" />
                  <span>Nationwide COD</span>
                </div>
              </div>
            </div>

            {/* Right Hero Image Mosaic */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                  <Image
                    src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1000&auto=format&fit=crop&q=80"
                    alt="Authentic Jamdani Handloom Saree"
                    fill
                    priority
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
                      UNESCO Intangible Heritage
                    </span>
                    <h3 className="font-serif text-xl font-bold mt-1">Dhakai Jamdani Atelier</h3>
                    <p className="text-xs text-gray-200 mt-1 font-light">
                      Handwoven on historic wooden pit-looms in Narayanganj.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. EXPLORE BY WEAVE CATEGORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#b38f2e]">
            Centuries of Heritage
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#800020] mt-1">
            Explore Weaves By Artisan Craft
          </h2>
          <div className="w-16 h-0.5 bg-[#d4af37] mx-auto mt-3" />
          <p className="text-xs sm:text-sm text-gray-600 mt-3 max-w-xl mx-auto font-light">
            Every thread narrates a storied legacy — from royal Mughal courts to contemporary wedding stages.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {INITIAL_CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.slug}`}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#ebe4d5]"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-base sm:text-lg font-serif font-bold text-white group-hover:text-[#f3e5ab] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-gray-300 line-clamp-1 mt-0.5 font-light">
                  {cat.description}
                </p>
                <div className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-[#d4af37]">
                  <span>Explore Weaves</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. PRODUCT CATALOG SECTIONS (Rendered dynamically when products exist) */}
      {products.length === 0 ? (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-[#ebe4d5] p-10 md:p-14 text-center space-y-3 shadow-xs">
            <Sparkles className="w-10 h-10 text-[#d4af37] mx-auto" />
            <h3 className="text-xl font-serif font-bold text-[#800020]">
              Artisanal Weaves In Production
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto">
              Our master weavers are currently curating handloom creations. Explore our weave categories or check back soon.
            </p>
            <div className="pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-[#800020] text-white text-xs font-semibold rounded-lg hover:bg-[#580c1f] transition-colors"
              >
                <span>View Weave Collections</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#d4af37]" />
              </Link>
            </div>
          </div>
        </section>
      ) : (
        <>
          {featuredProducts.length > 0 && (
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#ebe4d5]">
                <div>
                  <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#b38f2e]">
                    Handcrafted Treasures
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#800020] mt-1">
                    Featured Bridal & Festival Sarees
                  </h2>
                </div>
                <Link
                  href="/shop"
                  className="mt-3 sm:mt-0 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#800020] hover:text-[#580c1f] group"
                >
                  <span>View All Sarees</span>
                  <ArrowRight className="w-4 h-4 text-[#d4af37] group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          )}

          {bestSellers.length > 0 && (
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#ebe4d5]">
                <div>
                  <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#b38f2e]">
                    Customer Favorites
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#800020] mt-1">
                    Most Loved Best Sellers
                  </h2>
                </div>
                <Link
                  href="/shop?sort=popular"
                  className="mt-3 sm:mt-0 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#800020] hover:text-[#580c1f] group"
                >
                  <span>See Top Picks</span>
                  <ArrowRight className="w-4 h-4 text-[#d4af37] group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {bestSellers.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          )}

          {newArrivals.length > 0 && (
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#ebe4d5]">
                <div>
                  <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#b38f2e]">
                    Fresh From Looms
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#800020] mt-1">
                    New Arrivals Collection
                  </h2>
                </div>
                <Link
                  href="/shop?sort=newest"
                  className="mt-3 sm:mt-0 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#800020] hover:text-[#580c1f] group"
                >
                  <span>View All New</span>
                  <ArrowRight className="w-4 h-4 text-[#d4af37] group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {newArrivals.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          )}
        </>
      )}

      {/* 4. PROMOTIONAL PRIVILEGE BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#580c1f] to-[#800020] text-white p-8 md:p-12 shadow-2xl border-2 border-[#d4af37]/40">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 space-y-4">
              <span className="px-3 py-1 bg-[#d4af37] text-[#1a050b] text-xs font-bold uppercase tracking-widest rounded-md">
                Atelier Privilege
              </span>
              <h3 className="text-2xl sm:text-4xl font-serif font-bold tracking-tight">
                Bespoke Bridal Sarees & Royal Gift Packaging
              </h3>
              <p className="text-sm text-[#f3e5ab]/90 max-w-xl">
                Every luxury bridal consignment includes an acid-free archival storage box, hand-finished running blouse piece, and personal concierge guidance.
              </p>
            </div>
            <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col items-center justify-end gap-3">
              <Link
                href="/shop?category=wedding"
                className="w-full text-center px-6 py-3.5 bg-gradient-to-r from-[#d4af37] to-[#b38f2e] text-[#1a050b] text-xs font-bold uppercase tracking-wider rounded-xl hover:brightness-110 shadow-md transition-all"
              >
                Explore Bridal Weaves
              </Link>
              <Link
                href="/shop"
                className="w-full text-center px-6 py-3.5 bg-transparent border border-[#f3e5ab]/40 text-white text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-white/10 transition-all"
              >
                Browse All Weaves
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE US & HERITAGE PROMISES */}
      <section className="bg-[#faf7f2] py-16 border-y border-[#ebe4d5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#b38f2e]">
              The Royal Standard
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#800020] mt-1">
              Why Discerning Connoisseurs Choose Royal Saree
            </h2>
            <div className="w-16 h-0.5 bg-[#d4af37] mx-auto mt-3" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl border border-[#ebe4d5] text-center space-y-3 shadow-xs">
              <div className="w-12 h-12 rounded-full bg-[#fce7ea] flex items-center justify-center mx-auto text-[#800020]">
                <Award className="w-6 h-6 text-[#800020]" />
              </div>
              <h3 className="text-base font-serif font-bold text-gray-900">
                Loom Certified Authentic
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Directly sourced from ancestral weaver guilds with certified pure silk and tested gold zari authentication.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#ebe4d5] text-center space-y-3 shadow-xs">
              <div className="w-12 h-12 rounded-full bg-[#faf8ed] flex items-center justify-center mx-auto text-[#d4af37]">
                <ShieldCheck className="w-6 h-6 text-[#b38f2e]" />
              </div>
              <h3 className="text-base font-serif font-bold text-gray-900">
                Ethical Artisan Fair Trade
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                100% transparent weaver lineage ensuring master pit-loom artisans receive rightful prestige and dignity.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#ebe4d5] text-center space-y-3 shadow-xs">
              <div className="w-12 h-12 rounded-full bg-[#fce7ea] flex items-center justify-center mx-auto text-[#800020]">
                <Truck className="w-6 h-6 text-[#800020]" />
              </div>
              <h3 className="text-base font-serif font-bold text-gray-900">
                Nationwide Express & COD
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Complimentary shipping on orders over ৳5000 with secure Cash on Delivery, bKash, and Nagad options.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#ebe4d5] text-center space-y-3 shadow-xs">
              <div className="w-12 h-12 rounded-full bg-[#faf8ed] flex items-center justify-center mx-auto text-[#d4af37]">
                <RotateCcw className="w-6 h-6 text-[#b38f2e]" />
              </div>
              <h3 className="text-base font-serif font-bold text-gray-900">
                Seamless 7-Day Exchange
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Hassle-free exchange policy with personalized concierge assistance for wedding color matchmaking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#b38f2e]">
            Celebrated Moments
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#800020] mt-1">
            Words from Our Royal Patrons
          </h2>
          <div className="w-16 h-0.5 bg-[#d4af37] mx-auto mt-3" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-[#ebe4d5] shadow-xs space-y-4">
            <Quote className="w-8 h-8 text-[#d4af37]/40" />
            <p className="text-xs text-gray-700 italic leading-relaxed">
              &ldquo;The sheer delicacy of the authentic handloom weave took my breath away. Everyone at the ceremony couldn&apos;t stop complimenting the intricate artistry!&rdquo;
            </p>
            <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-serif font-bold text-gray-900">Nusrat Jahan</h4>
                <p className="text-[10px] text-gray-400">Dhaka, Bangladesh</p>
              </div>
              <div className="flex text-[#d4af37]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-current" />
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-[#ebe4d5] shadow-xs space-y-4">
            <Quote className="w-8 h-8 text-[#d4af37]/40" />
            <p className="text-xs text-gray-700 italic leading-relaxed">
              &ldquo;Finding authentic bridal handloom with real tested zari without inflated showroom markups used to be impossible. Delivered promptly with impeccable packaging.&rdquo;
            </p>
            <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-serif font-bold text-gray-900">Farzana Rahman</h4>
                <p className="text-[10px] text-gray-400">Chittagong, Bangladesh</p>
              </div>
              <div className="flex text-[#d4af37]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-current" />
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-[#ebe4d5] shadow-xs space-y-4">
            <Quote className="w-8 h-8 text-[#d4af37]/40" />
            <p className="text-xs text-gray-700 italic leading-relaxed">
              &ldquo;The sheer weightlessness and texture of the muslin weave is unbelievable. Thank you for keeping our ancestral handloom heritage alive with such royal standard.&rdquo;
            </p>
            <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-serif font-bold text-gray-900">Dr. Sabina Yasmin</h4>
                <p className="text-[10px] text-gray-400">Sylhet, Bangladesh</p>
              </div>
              <div className="flex text-[#d4af37]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-current" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
