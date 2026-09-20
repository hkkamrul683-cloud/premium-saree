"use client";

import React, { useState, useEffect, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import {
  Star,
  Heart,
  ShoppingBag,
  Zap,
  Truck,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Check,
  Plus,
  Minus,
  MessageSquare,
  Award,
} from "lucide-react";
import { SareeProduct } from "@/lib/seed-data";
import { formatPrice } from "@/lib/utils";
import { useStore } from "@/lib/store";
import ProductCard from "@/components/product/ProductCard";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { products, addToCart, toggleWishlist, isInWishlist } = useStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const product = products.find((p) => p.slug === resolvedParams.slug);

  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<"desc" | "specs" | "shipping" | "reviews">("desc");

  // Local reviews state - empty by default (no demo reviews)
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    if (product && product.colors && product.colors.length > 0 && !selectedColor) {
      setSelectedColor(product.colors[0]);
    }
  }, [product, selectedColor]);

  if (mounted && !product) {
    notFound();
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center space-y-3">
        <Sparkles className="w-8 h-8 text-[#d4af37] mx-auto animate-pulse" />
        <p className="text-sm font-serif text-gray-700">Loading saree details...</p>
      </div>
    );
  }

  const [newReviewAuthor, setNewReviewAuthor] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState("");
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const isFavorite = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor);
    router.push("/checkout");
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) return;

    setReviews([
      {
        id: `rev-${Date.now()}`,
        name: newReviewAuthor.trim(),
        rating: newReviewRating,
        date: "Just now",
        comment: newReviewComment.trim(),
        verified: true,
      },
      ...reviews,
    ]);

    setNewReviewAuthor("");
    setNewReviewComment("");
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 4000);
  };

  const relatedProducts = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Breadcrumb */}
      <nav className="text-xs text-gray-500 mb-6 flex items-center space-x-2">
        <Link href="/" className="hover:text-[#800020]">
          Home
        </Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-[#800020]">
          Shop
        </Link>
        <span>/</span>
        <Link href={`/shop?category=${product.category}`} className="capitalize hover:text-[#800020]">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-[#1a1a1a] font-medium truncate max-w-[200px]">
          {product.name}
        </span>
      </nav>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
        
        {/* Gallery Section */}
        <div className="lg:col-span-6 space-y-4">
          {/* Main Showcase Image */}
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#faf7f2] border border-[#ebe4d5] shadow-lg">
            <Image
              src={product.images[selectedImage] || product.images[0]}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-all duration-300"
            />
            {product.discount && product.discount > 0 && (
              <span className="absolute top-4 left-4 px-3 py-1 bg-[#800020] text-white text-xs font-bold uppercase rounded-md shadow-md">
                {product.discount}% OFF
              </span>
            )}
            <button
              onClick={() => toggleWishlist(product)}
              className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-all ${
                isFavorite
                  ? "bg-[#800020] text-white shadow-lg"
                  : "bg-white/80 text-gray-700 hover:text-[#800020] hover:bg-white"
              }`}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`} />
            </button>
          </div>

          {/* Thumbnail Strip */}
          <div className="flex gap-3 overflow-x-auto pb-2">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`relative w-20 h-24 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                  selectedImage === idx
                    ? "border-[#800020] scale-95 shadow-md"
                    : "border-[#ebe4d5] opacity-70 hover:opacity-100"
                }`}
              >
                <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Information */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#fce7ea] text-[#800020]">
                {product.category}
              </span>
              <span className="text-xs text-gray-500 font-medium">
                {product.fabric}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#1a1a1a] leading-tight">
              {product.name}
            </h1>

            {/* Rating Stars */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex text-[#d4af37]">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? "fill-current text-[#d4af37]"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-gray-700">
                {product.rating.toFixed(1)}
              </span>
              <span className="text-xs text-gray-400">
                ({reviews.length} Customer Reviews)
              </span>
            </div>
          </div>

          {/* Pricing */}
          <div className="p-4 bg-[#faf7f2] rounded-xl border border-[#ebe4d5] flex items-baseline gap-3">
            <span className="text-3xl font-bold text-[#800020]">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="text-sm text-gray-400 line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
            <span className="text-xs text-green-700 font-semibold ml-auto flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              Authentic Handloom Certified
            </span>
          </div>

          {/* Color Selection */}
          <div className="space-y-2">
            <label className="text-xs font-serif uppercase tracking-wider font-bold text-gray-900 block">
              Color Palette: <span className="font-normal text-gray-600">{selectedColor}</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedColor(c)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all flex items-center gap-1.5 ${
                    selectedColor === c
                      ? "border-[#800020] bg-[#fce7ea] text-[#800020] font-bold shadow-xs"
                      : "border-gray-200 bg-white text-gray-700 hover:border-gray-400"
                  }`}
                >
                  {selectedColor === c && <Check className="w-3.5 h-3.5 text-[#800020]" />}
                  <span>{c}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Specifications Overview */}
          <div className="grid grid-cols-2 gap-3 text-xs bg-white p-4 rounded-xl border border-[#ebe4d5]">
            <div>
              <span className="text-gray-400 block">Length:</span>
              <span className="font-medium text-gray-800">{product.length}</span>
            </div>
            <div>
              <span className="text-gray-400 block">Blouse Piece:</span>
              <span className="font-medium text-gray-800">{product.blouseDetails}</span>
            </div>
            <div>
              <span className="text-gray-400 block">Origin:</span>
              <span className="font-medium text-gray-800">{product.specifications.origin}</span>
            </div>
            <div>
              <span className="text-gray-400 block">Availability:</span>
              <span className={`font-semibold ${product.stock > 0 ? "text-green-700" : "text-red-600"}`}>
                {product.stock > 0 ? `In Stock (${product.stock} pieces)` : "Sold Out"}
              </span>
            </div>
          </div>

          {/* Quantity & CTA Buttons */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-[#ebe4d5] rounded-xl bg-white p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 text-gray-600 hover:text-black"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 text-sm font-bold text-gray-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="p-2 text-gray-600 hover:text-black"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                className="flex-1 py-3.5 px-6 bg-white border-2 border-[#800020] text-[#800020] hover:bg-[#800020] hover:text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow-xs disabled:opacity-50"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add To Shopping Bag</span>
              </button>
            </div>

            <button
              onClick={handleBuyNow}
              disabled={product.stock <= 0}
              className="w-full py-4 px-6 bg-gradient-to-r from-[#800020] to-[#580c1f] text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-md shadow-[#800020]/20 disabled:opacity-50"
            >
              <Zap className="w-4 h-4 text-[#d4af37]" />
              <span>Instant Buy Now — Proceed To Checkout</span>
            </button>
          </div>

          {/* Delivery & Security Badges */}
          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[#ebe4d5] text-center text-[11px] text-gray-600">
            <div className="p-2.5 rounded-lg bg-[#faf7f2] border border-[#ebe4d5]/60 flex flex-col items-center gap-1">
              <Truck className="w-4 h-4 text-[#800020]" />
              <span className="font-semibold">Free Express Shipping</span>
              <span className="text-[10px] text-gray-400">On orders over ৳5000</span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#faf7f2] border border-[#ebe4d5]/60 flex flex-col items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
              <span className="font-semibold">Cash on Delivery</span>
              <span className="text-[10px] text-gray-400">bKash & Nagad</span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#faf7f2] border border-[#ebe4d5]/60 flex flex-col items-center gap-1">
              <RotateCcw className="w-4 h-4 text-[#800020]" />
              <span className="font-semibold">7 Days Exchange</span>
              <span className="text-[10px] text-gray-400">Doorstep assistance</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: Description, Specs, Delivery, Reviews */}
      <div className="mt-16 bg-white rounded-2xl border border-[#ebe4d5] shadow-xs overflow-hidden">
        {/* Tab Headers */}
        <div className="flex border-b border-[#ebe4d5] bg-[#faf7f2] overflow-x-auto text-xs font-serif uppercase tracking-wider font-bold">
          <button
            onClick={() => setActiveTab("desc")}
            className={`px-6 py-4 transition-colors whitespace-nowrap ${
              activeTab === "desc"
                ? "bg-white text-[#800020] border-b-2 border-[#800020]"
                : "text-gray-600 hover:text-black"
            }`}
          >
            Weaver&apos;s Description
          </button>
          <button
            onClick={() => setActiveTab("specs")}
            className={`px-6 py-4 transition-colors whitespace-nowrap ${
              activeTab === "specs"
                ? "bg-white text-[#800020] border-b-2 border-[#800020]"
                : "text-gray-600 hover:text-black"
            }`}
          >
            Technical Specifications
          </button>
          <button
            onClick={() => setActiveTab("shipping")}
            className={`px-6 py-4 transition-colors whitespace-nowrap ${
              activeTab === "shipping"
                ? "bg-white text-[#800020] border-b-2 border-[#800020]"
                : "text-gray-600 hover:text-black"
            }`}
          >
            Delivery & Care
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`px-6 py-4 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === "reviews"
                ? "bg-white text-[#800020] border-b-2 border-[#800020]"
                : "text-gray-600 hover:text-black"
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Customer Reviews ({reviews.length})</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 sm:p-8 text-sm text-gray-700 leading-relaxed">
          {activeTab === "desc" && (
            <div className="space-y-4 max-w-4xl">
              <h3 className="text-lg font-serif font-bold text-[#800020]">
                About This Handloom Creation
              </h3>
              <p>{product.description}</p>
              <div className="p-4 bg-[#faf7f2] rounded-xl border border-[#ebe4d5] text-xs text-gray-600 space-y-1">
                <p className="font-bold text-[#800020] flex items-center gap-1">
                  <Award className="w-4 h-4" />
                  Handloom Artisan Guarantee
                </p>
                <p>
                  Slight irregularities in weaving and selvedge are natural hallmarks of authentic pit-loom work and signify human touch, distinguishing this from mass industrial machine fabrics.
                </p>
              </div>
            </div>
          )}

          {activeTab === "specs" && (
            <div className="max-w-2xl">
              <table className="w-full text-xs text-left">
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 font-semibold text-gray-500 w-1/3">Weave Technique</td>
                    <td className="py-3 font-medium text-gray-900">{product.specifications.weaveType}</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 font-semibold text-gray-500">Border Art</td>
                    <td className="py-3 font-medium text-gray-900">{product.specifications.border}</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 font-semibold text-gray-500">Pallu Work</td>
                    <td className="py-3 font-medium text-gray-900">{product.specifications.pallu}</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 font-semibold text-gray-500">Fabric Composition</td>
                    <td className="py-3 font-medium text-gray-900">{product.fabric}</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 font-semibold text-gray-500">Total Length</td>
                    <td className="py-3 font-medium text-gray-900">{product.length}</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 font-semibold text-gray-500">Blouse Piece</td>
                    <td className="py-3 font-medium text-gray-900">{product.blouseDetails}</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-semibold text-gray-500">Artisan Guild Location</td>
                    <td className="py-3 font-medium text-gray-900">{product.specifications.origin}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "shipping" && (
            <div className="space-y-4 max-w-3xl">
              <h3 className="text-base font-serif font-bold text-[#800020]">
                Complimentary Nationwide Delivery
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-xs text-gray-600">
                <li>
                  <span className="font-semibold text-gray-900">Inside Dhaka Metropolitan:</span> Delivered within 24 to 48 hours.
                </li>
                <li>
                  <span className="font-semibold text-gray-900">Outside Dhaka & Nationwide:</span> Delivered within 2 to 4 business days via verified express couriers (Steadfast / Sundarban / RedX).
                </li>
                <li>
                  <span className="font-semibold text-gray-900">Packaging:</span> Delivered in our signature Royal Burgundy & Gold presentation box with moisture-sealed acid-free inner wrapping.
                </li>
                <li>
                  <span className="font-semibold text-gray-900">Care Instructions:</span> {product.specifications.care}
                </li>
              </ul>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-8">
              {/* Existing Reviews */}
              <div className="space-y-4 max-w-3xl">
                {reviews.length === 0 ? (
                  <div className="p-8 bg-[#faf7f2] rounded-xl border border-[#ebe4d5] text-center space-y-1">
                    <p className="text-xs font-serif font-bold text-gray-800">No Reviews Yet</p>
                    <p className="text-[11px] text-gray-500">
                      Be the first to share your experience with this handcrafted saree.
                    </p>
                  </div>
                ) : (
                  reviews.map((rev) => (
                    <div key={rev.id} className="p-4 bg-[#faf7f2] rounded-xl border border-[#ebe4d5] space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-serif font-bold text-xs text-gray-900">{rev.name}</span>
                          {rev.verified && (
                            <span className="px-2 py-0.5 bg-green-100 text-green-800 text-[10px] font-semibold rounded-full flex items-center gap-1">
                              <Check className="w-2.5 h-2.5" /> Verified Purchase
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-gray-400">{rev.date}</span>
                      </div>
                      <div className="flex text-[#d4af37]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3.5 h-3.5 ${i < rev.rating ? "fill-current" : "text-gray-300"}`} />
                        ))}
                      </div>
                      <p className="text-xs text-gray-700 leading-relaxed">{rev.comment}</p>
                    </div>
                  ))
                )}
              </div>

              {/* Submit Review Form */}
              <div className="max-w-xl p-6 bg-[#faf7f2] rounded-xl border border-[#ebe4d5] space-y-4">
                <h4 className="text-sm font-serif font-bold text-[#800020]">
                  Share Your Experience With This Saree
                </h4>
                {reviewSubmitted ? (
                  <div className="p-3 bg-green-50 border border-green-200 text-green-800 text-xs rounded-lg font-semibold flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    Thank you! Your verified review has been published.
                  </div>
                ) : (
                  <form onSubmit={handleReviewSubmit} className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-semibold text-gray-700 block mb-1">
                          Your Full Name
                        </label>
                        <input
                          type="text"
                          required
                          value={newReviewAuthor}
                          onChange={(e) => setNewReviewAuthor(e.target.value)}
                          placeholder="e.g. Ayesha Siddiqa"
                          className="w-full text-xs p-2.5 rounded-lg border border-gray-200 bg-white"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold text-gray-700 block mb-1">
                          Rating Score
                        </label>
                        <select
                          value={newReviewRating}
                          onChange={(e) => setNewReviewRating(Number(e.target.value))}
                          className="w-full text-xs p-2.5 rounded-lg border border-gray-200 bg-white"
                        >
                          <option value={5}>⭐⭐⭐⭐⭐ (5/5 Exceptional)</option>
                          <option value={4}>⭐⭐⭐⭐ (4/5 Very Good)</option>
                          <option value={3}>⭐⭐⭐ (3/5 Average)</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-gray-700 block mb-1">
                        Detailed Review
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={newReviewComment}
                        onChange={(e) => setNewReviewComment(e.target.value)}
                        placeholder="Tell other saree lovers about the drape, weave quality, and festival compliments..."
                        className="w-full text-xs p-2.5 rounded-lg border border-gray-200 bg-white"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-[#800020] text-white text-xs font-semibold rounded-lg hover:bg-[#580c1f] transition-all"
                    >
                      Publish Review
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Handloom Sarees */}
      {relatedProducts.length > 0 && (
        <section className="mt-16">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#b38f2e]">
              Complete Your Wardrobe
            </span>
            <h2 className="text-2xl font-serif font-bold text-[#800020] mt-1">
              Similar Handloom Creations
            </h2>
            <div className="w-16 h-0.5 bg-[#d4af37] mx-auto mt-3" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
