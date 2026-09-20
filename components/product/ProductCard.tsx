"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart, Star, ShoppingBag, Eye, Zap } from "lucide-react";
import { SareeProduct } from "@/lib/seed-data";
import { formatPrice } from "@/lib/utils";
import { useStore } from "@/lib/store";

interface ProductCardProps {
  product: SareeProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const [isHovered, setIsHovered] = useState(false);
  const [imageIdx, setImageIdx] = useState(0);

  const isFavorite = isInWishlist(product.id);

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    router.push("/checkout");
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div
      className="group relative bg-white rounded-xl overflow-hidden border border-[#ebe4d5] luxury-shadow luxury-card-hover flex flex-col h-full"
      onMouseEnter={() => {
        setIsHovered(true);
        if (product.images.length > 1) setImageIdx(1);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setImageIdx(0);
      }}
    >
      {/* Badges Overlay */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        {product.discount && product.discount > 0 && (
          <span className="px-2.5 py-1 text-[11px] font-bold tracking-wider uppercase text-white bg-[#800020] rounded-md shadow-sm">
            {product.discount}% OFF
          </span>
        )}
        {product.bestSeller && (
          <span className="px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase text-[#1a050b] bg-[#d4af37] rounded-md shadow-sm">
            Best Seller
          </span>
        )}
        {product.newArrival && !product.bestSeller && (
          <span className="px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase text-white bg-[#580c1f] rounded-md shadow-sm">
            New Arrival
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={handleToggleWishlist}
        className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-md transition-all ${
          isFavorite
            ? "bg-[#800020] text-white shadow-md"
            : "bg-white/80 text-gray-700 hover:text-[#800020] hover:bg-white"
        }`}
        aria-label="Toggle Wishlist"
      >
        <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
      </button>

      {/* Product Image Link */}
      <Link href={`/product/${product.slug}`} className="relative block aspect-[3/4] overflow-hidden bg-[#faf7f2]">
        <Image
          src={product.images[imageIdx] || product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Quick View Button on Hover */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
          <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/95 text-[#800020] text-xs font-semibold rounded-full shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye className="w-3.5 h-3.5 text-[#d4af37]" />
            View Details
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow justify-between bg-white">
        <div>
          {/* Category & Fabric Tag */}
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span className="uppercase tracking-wider font-medium text-[#800020]">
              {product.category}
            </span>
            <span className="truncate max-w-[120px] text-gray-400">
              {product.fabric}
            </span>
          </div>

          {/* Product Title */}
          <Link href={`/product/${product.slug}`}>
            <h3 className="text-sm font-medium text-[#1a1a1a] line-clamp-2 hover:text-[#800020] transition-colors leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-2">
            <div className="flex text-[#d4af37]">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating)
                      ? "fill-current text-[#d4af37]"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-[11px] font-semibold text-gray-600">
              {product.rating.toFixed(1)}
            </span>
            <span className="text-[11px] text-gray-400">
              ({product.reviewCount})
            </span>
          </div>
        </div>

        {/* Pricing & CTA */}
        <div className="mt-4 pt-3 border-t border-[#ebe4d5]/60">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-base font-bold text-[#800020]">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="text-xs text-gray-400 line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleAddToCart}
              className="flex items-center justify-center gap-1 py-2 px-2 text-xs font-semibold rounded-lg border border-[#800020] text-[#800020] hover:bg-[#800020] hover:text-white transition-colors"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add Cart</span>
            </button>
            <button
              onClick={handleBuyNow}
              className="flex items-center justify-center gap-1 py-2 px-2 text-xs font-bold rounded-lg bg-gradient-to-r from-[#800020] to-[#580c1f] text-white hover:brightness-110 transition-all shadow-xs"
            >
              <Zap className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Buy Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
