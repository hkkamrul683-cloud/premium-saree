"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Tag,
  Truck,
  ArrowLeft,
} from "lucide-react";
import { useStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const router = useRouter();
  const {
    cart,
    removeFromCart,
    updateQuantity,
    subtotal,
    deliveryCharge,
    total,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
  } = useStore();

  const [couponInput, setCouponInput] = useState("");
  const [couponFeedback, setCouponFeedback] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput.trim());
    setCouponFeedback(res);
  };

  const freeShippingThreshold = 5000;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-[#fce7ea] flex items-center justify-center mx-auto text-[#800020]">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#1a1a1a]">
          Your Shopping Bag is Empty
        </h1>
        <p className="text-sm text-gray-500 max-w-md mx-auto">
          You haven&apos;t added any handloom sarees to your bag yet. Explore our royal Jamdani, Katan, and Pure Silk collections.
        </p>
        <div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#800020] text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#580c1f] shadow-md transition-all"
          >
            <span>Explore Handloom Catalog</span>
            <ArrowRight className="w-4 h-4 text-[#d4af37]" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="mb-8 border-b border-[#ebe4d5] pb-4 flex items-center justify-between">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#b38f2e]">
            Review Selections
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#800020] mt-1">
            Your Shopping Bag ({cart.reduce((c, i) => c + i.quantity, 0)} Items)
          </h1>
        </div>
        <Link
          href="/shop"
          className="text-xs font-semibold text-[#800020] hover:underline flex items-center gap-1 hidden sm:flex"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Continue Shopping
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Cart Items Table */}
        <div className="lg:col-span-8 space-y-4">
          {/* Free Shipping Alert Bar */}
          <div className="p-4 bg-[#faf7f2] rounded-xl border border-[#ebe4d5] space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-gray-800 flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#800020]" />
                {remainingForFreeShipping > 0
                  ? `Add ${formatPrice(remainingForFreeShipping)} more to qualify for Free Nationwide Shipping!`
                  : "You have unlocked Free Express Nationwide Shipping!"}
              </span>
              <span className="font-bold text-[#800020]">{Math.round(shippingProgress)}%</span>
            </div>
            <div className="w-full bg-[#ebe4d5] h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#d4af37] to-[#800020] h-full transition-all duration-500 rounded-full"
                style={{ width: `${shippingProgress}%` }}
              />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-[#ebe4d5] overflow-hidden shadow-xs divide-y divide-gray-100">
            {cart.map((item) => (
              <div
                key={item.product.id}
                className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:items-center justify-between"
              >
                {/* Product Info */}
                <div className="flex gap-4 items-center">
                  <div className="relative w-20 h-28 rounded-lg overflow-hidden bg-[#faf7f2] flex-shrink-0 border border-gray-100">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#800020] bg-[#fce7ea] px-2 py-0.5 rounded">
                      {item.product.category}
                    </span>
                    <Link
                      href={`/product/${item.product.slug}`}
                      className="block text-sm font-serif font-bold text-gray-900 hover:text-[#800020] transition-colors"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-xs text-gray-500">Fabric: {item.product.fabric}</p>
                    <p className="text-xs font-bold text-[#800020]">
                      {formatPrice(item.product.price)} each
                    </p>
                  </div>
                </div>

                {/* Quantity & Actions */}
                <div className="flex items-center justify-between sm:justify-end gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                  <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="p-1.5 text-gray-600 hover:text-black"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-bold text-gray-900">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="p-1.5 text-gray-600 hover:text-black"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <span className="text-sm font-bold text-[#800020] min-w-[90px] text-right">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>

                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-gray-400 hover:text-[#800020] transition-colors p-1"
                    title="Remove Saree"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary & Coupon Checkout Box */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-[#ebe4d5] shadow-sm space-y-6 sticky top-24">
            <h3 className="text-base font-serif font-bold text-[#800020] pb-3 border-b border-[#ebe4d5]">
              Order Summary
            </h3>

            {/* Coupon Code Form */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-700 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5 text-[#d4af37]" />
                Have a Festive Coupon Code?
              </label>

              {appliedCoupon ? (
                <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg text-xs">
                  <div>
                    <span className="font-bold text-green-800 uppercase">{appliedCoupon.code}</span>
                    <p className="text-green-700 text-[11px]">
                      Saved {formatPrice(appliedCoupon.discountAmount)}
                    </p>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs text-red-600 hover:underline font-semibold"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. ROYALSAREE"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-1 text-xs px-3 py-2 border border-[#ebe4d5] rounded-lg bg-[#faf7f2] uppercase font-mono focus:outline-none focus:ring-1 focus:ring-[#800020]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#800020] text-white text-xs font-semibold rounded-lg hover:bg-[#580c1f] transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}

              {couponFeedback && (
                <p
                  className={`text-[11px] font-medium mt-1 ${
                    couponFeedback.success ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {couponFeedback.message}
                </p>
              )}
            </div>

            {/* Cost Breakdown */}
            <div className="space-y-2.5 text-xs pt-4 border-t border-gray-100">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-900">{formatPrice(subtotal)}</span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between text-[#800020] font-semibold">
                  <span>Discount ({appliedCoupon.code})</span>
                  <span>-{formatPrice(appliedCoupon.discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-600">
                <span>Estimated Nationwide Delivery</span>
                <span>{deliveryCharge === 0 ? "FREE" : formatPrice(deliveryCharge)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#1a1a1a] pt-3 border-t border-gray-200">
                <span>Grand Total</span>
                <span className="text-xl text-[#800020]">{formatPrice(total)}</span>
              </div>
              <p className="text-[10px] text-gray-400 text-right">Inclusive of all VAT and luxury packaging</p>
            </div>

            {/* Checkout Button */}
            <div className="space-y-3 pt-2">
              <button
                onClick={() => router.push("/checkout")}
                className="w-full py-4 bg-gradient-to-r from-[#800020] to-[#580c1f] text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-md shadow-[#800020]/20"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 text-[#d4af37]" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-gray-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Encrypted 256-Bit SSL Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
