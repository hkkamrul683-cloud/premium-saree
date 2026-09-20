"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { useStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart } = useStore();

  if (wishlist.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-[#fce7ea] flex items-center justify-center mx-auto text-[#800020]">
          <Heart className="w-10 h-10" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#1a1a1a]">
          Your Wishlist is Empty
        </h1>
        <p className="text-sm text-gray-500 max-w-md mx-auto">
          Save your favorite royal Jamdani, Katan, and Pure Silk sarees here to easily review and shop them later.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#800020] text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#580c1f] shadow-md transition-all"
        >
          <span>Explore Saree Catalog</span>
          <ArrowRight className="w-4 h-4 text-[#d4af37]" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="mb-8 border-b border-[#ebe4d5] pb-4">
        <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#b38f2e]">
          Saved Masterpieces
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#800020] mt-1">
          My Saved Wishlist ({wishlist.length})
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl border border-[#ebe4d5] overflow-hidden shadow-xs flex flex-col justify-between"
          >
            <div className="relative aspect-[3/4] bg-[#faf7f2]">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
              />
              <button
                onClick={() => toggleWishlist(product)}
                className="absolute top-3 right-3 p-2 bg-white/90 rounded-full text-red-600 hover:bg-white shadow-xs"
                title="Remove from wishlist"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 space-y-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#800020]">
                  {product.category}
                </span>
                <Link
                  href={`/product/${product.slug}`}
                  className="block text-sm font-serif font-bold text-gray-900 line-clamp-2 hover:text-[#800020] mt-1"
                >
                  {product.name}
                </Link>
                <p className="text-xs font-bold text-[#800020] mt-1">
                  {formatPrice(product.price)}
                </p>
              </div>

              <button
                onClick={() => {
                  addToCart(product, 1);
                  toggleWishlist(product);
                }}
                className="w-full py-2.5 bg-[#800020] text-white text-xs font-semibold rounded-lg hover:bg-[#580c1f] transition-colors flex items-center justify-center gap-1.5"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Move to Bag</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
