"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, ShieldCheck } from "lucide-react";
import { useStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";

export default function CartDrawer() {
  const router = useRouter();
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    deliveryCharge,
    total,
    appliedCoupon,
  } = useStore();

  if (!isCartOpen) return null;

  const freeShippingThreshold = 5000;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#fdfbf7] shadow-2xl flex flex-col justify-between">
          
          {/* Drawer Header */}
          <div className="p-5 border-b border-[#ebe4d5] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#800020]" />
              <h2 className="text-lg font-serif font-bold text-[#1a1a1a]">
                Shopping Bag ({cart.reduce((c, i) => c + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500 hover:text-black transition-colors"
              aria-label="Close Bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-5 py-3 bg-[#faf7f2] border-b border-[#ebe4d5] text-xs">
            {remainingForFreeShipping > 0 ? (
              <p className="text-gray-700">
                Add <span className="font-bold text-[#800020]">{formatPrice(remainingForFreeShipping)}</span> more for <span className="font-semibold text-[#b38f2e]">Free Express Delivery</span> nationwide!
              </p>
            ) : (
              <p className="text-[#800020] font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
                Congratulations! You have unlocked Free Express Shipping!
              </p>
            )}
            <div className="w-full bg-[#ebe4d5] h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#d4af37] to-[#800020] h-full transition-all duration-500 rounded-full"
                style={{ width: `${shippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items Scroll Area */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <ShoppingBag className="w-12 h-12 text-[#d4af37] mx-auto opacity-50" />
                <p className="text-base font-serif text-gray-700 font-medium">
                  Your luxury shopping bag is currently empty.
                </p>
                <p className="text-xs text-gray-500 max-w-xs mx-auto">
                  Discover our timeless Jamdani, Katan, and Pure Silk handwoven sarees.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    router.push("/shop");
                  }}
                  className="mt-2 px-6 py-2.5 bg-[#800020] text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-[#580c1f] transition-all"
                >
                  Explore Catalog
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-3 bg-white rounded-xl border border-[#ebe4d5] shadow-xs"
                >
                  {/* Thumbnail */}
                  <div className="relative w-20 h-24 rounded-lg overflow-hidden bg-[#faf7f2] flex-shrink-0">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="text-xs font-medium text-[#1a1a1a] line-clamp-2 pr-2">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-gray-400 hover:text-[#800020] transition-colors p-1"
                          aria-label="Remove Item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-gray-400 mt-0.5">
                        Fabric: {item.product.fabric}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-gray-200 rounded-md bg-gray-50">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 text-gray-600 hover:text-black"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-semibold text-gray-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 text-gray-600 hover:text-black"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Line Price */}
                      <span className="text-xs font-bold text-[#800020]">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer */}
          {cart.length > 0 && (
            <div className="p-5 bg-white border-t border-[#ebe4d5] space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">{formatPrice(subtotal)}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-[#800020] font-medium">
                    <span>Discount ({appliedCoupon.code})</span>
                    <span>-{formatPrice(appliedCoupon.discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Nationwide Delivery</span>
                  <span>{deliveryCharge === 0 ? "FREE" : formatPrice(deliveryCharge)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#1a1a1a] pt-2 border-t border-gray-100">
                  <span>Grand Total</span>
                  <span className="text-base text-[#800020]">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    router.push("/checkout");
                  }}
                  className="w-full py-3 bg-gradient-to-r from-[#800020] to-[#580c1f] text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 text-[#d4af37]" />
                </button>

                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    router.push("/cart");
                  }}
                  className="w-full py-2.5 bg-white border border-[#800020] text-[#800020] text-xs font-semibold rounded-lg hover:bg-[#faf7f2] transition-colors text-center"
                >
                  View Full Cart & Apply Coupon
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
