"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Truck,
  CreditCard,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { useStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, subtotal, discountAmount, deliveryCharge, total, appliedCoupon, clearCart } =
    useStore();

  // Customer Details Form State
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "Dhaka",
    area: "",
    postalCode: "",
    instructions: "",
  });

  const [paymentMethod, setPaymentMethod] = useState<"COD" | "BKASH" | "NAGAD" | "CARD">("COD");
  const [trxId, setTrxId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.address) {
      alert("Please fill in your name, phone number, and delivery address.");
      return;
    }

    if ((paymentMethod === "BKASH" || paymentMethod === "NAGAD") && !trxId.trim()) {
      alert(`Please provide the ${paymentMethod} Transaction ID (TrxID) for payment confirmation.`);
      return;
    }

    setIsSubmitting(true);

    // Generate unique regal Order ID
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const generatedOrderId = `SAR-2026-${randomNum}`;

    const newOrder = {
      orderId: generatedOrderId,
      date: new Date().toISOString(),
      customer: { ...formData },
      items: cart.map((i) => ({
        productId: i.product.id,
        name: i.product.name,
        price: i.product.price,
        quantity: i.quantity,
        image: i.product.images[0],
        fabric: i.product.fabric,
      })),
      subtotal,
      discount: discountAmount,
      couponCode: appliedCoupon?.code,
      deliveryCharge,
      total,
      paymentMethod,
      trxId: trxId.trim() || undefined,
      status: "CONFIRMED",
      timeline: [
        {
          status: "Order Placed",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          done: true,
        },
        {
          status: "Order Confirmed",
          time: "Immediate Verification",
          done: true,
        },
        {
          status: "Processing & Loom QC",
          time: "Expected in 12 hours",
          done: false,
        },
        {
          status: "Handed to Courier",
          time: "Pending dispatch",
          done: false,
        },
        {
          status: "Out for Delivery",
          time: "Pending arrival",
          done: false,
        },
        {
          status: "Delivered",
          time: "Pending receipt",
          done: false,
        },
      ],
    };

    // Save order into client storage for Order Tracking & Account History
    try {
      const existingOrders = JSON.parse(localStorage.getItem("saree_store_orders") || "[]");
      existingOrders.unshift(newOrder);
      localStorage.setItem("saree_store_orders", JSON.stringify(existingOrders));
      // Save last placed order ID
      localStorage.setItem("saree_last_order_id", generatedOrderId);
    } catch (err) {
      console.error("Order save error", err);
    }

    setTimeout(() => {
      clearCart();
      setIsSubmitting(false);
      setOrderComplete(generatedOrderId);
    }, 1200);
  };

  // If order was just submitted, display regal confirmation screen
  if (orderComplete) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-[#fce7ea] flex items-center justify-center mx-auto text-[#800020] animate-bounce">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <span className="px-3 py-1 bg-[#faf8ed] text-[#b38f2e] text-xs font-bold uppercase tracking-widest rounded-full border border-[#d4af37]">
          Order Confirmed • Shukriya
        </span>
        <h1 className="text-3xl font-serif font-bold text-[#800020]">
          Thank You For Your Patronage
        </h1>
        <p className="text-sm text-gray-700 max-w-md mx-auto">
          Your handloom order has been received and registered in our atelier system.
        </p>

        <div className="p-6 bg-white rounded-2xl border border-[#ebe4d5] shadow-sm text-left max-w-md mx-auto space-y-3">
          <div className="flex justify-between text-xs pb-2 border-b border-gray-100">
            <span className="text-gray-500">Order Reference:</span>
            <span className="font-mono font-bold text-[#800020]">{orderComplete}</span>
          </div>
          <div className="flex justify-between text-xs pb-2 border-b border-gray-100">
            <span className="text-gray-500">Recipient:</span>
            <span className="font-semibold text-gray-900">{formData.fullName}</span>
          </div>
          <div className="flex justify-between text-xs pb-2 border-b border-gray-100">
            <span className="text-gray-500">Contact Phone:</span>
            <span className="font-semibold text-gray-900">{formData.phone}</span>
          </div>
          <div className="flex justify-between text-xs pb-2 border-b border-gray-100">
            <span className="text-gray-500">Payment:</span>
            <span className="font-semibold text-gray-900">{paymentMethod}</span>
          </div>
          <div className="flex justify-between text-sm font-bold pt-1">
            <span>Total Payable:</span>
            <span className="text-[#800020]">{formatPrice(total)}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link
            href={`/order-tracking?orderId=${orderComplete}`}
            className="w-full sm:w-auto px-6 py-3 bg-[#800020] text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#580c1f] transition-all flex items-center justify-center gap-2"
          >
            <Truck className="w-4 h-4 text-[#d4af37]" />
            <span>Track Order Pipeline</span>
          </Link>
          <Link
            href="/shop"
            className="w-full sm:w-auto px-6 py-3 bg-white border border-[#800020] text-[#800020] text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#faf7f2] transition-all"
          >
            Return to Store
          </Link>
        </div>
      </div>
    );
  }

  // Redirect if cart is empty and no order completed
  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <ShoppingBag className="w-12 h-12 text-[#d4af37] mx-auto opacity-50" />
        <h2 className="text-xl font-serif font-bold text-gray-800">Your bag is empty</h2>
        <p className="text-xs text-gray-500">Please add sarees to your bag before checking out.</p>
        <Link
          href="/shop"
          className="inline-block px-6 py-2.5 bg-[#800020] text-white text-xs font-bold rounded-lg"
        >
          Browse Sarees
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="mb-8 border-b border-[#ebe4d5] pb-4">
        <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#b38f2e]">
          Secure Atelier Checkout
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#800020] mt-1">
          Delivery & Payment Details
        </h1>
      </div>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left: Customer Information & Delivery Address */}
        <div className="lg:col-span-7 space-y-8">
          {/* Section 1: Customer Contact */}
          <div className="bg-white p-6 rounded-2xl border border-[#ebe4d5] shadow-xs space-y-4">
            <h3 className="text-base font-serif font-bold text-[#1a1a1a] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#fce7ea] text-[#800020] flex items-center justify-center text-xs font-bold">
                1
              </span>
              Customer Contact Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  placeholder="e.g. Mahbuba Islam"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full text-xs p-3 rounded-lg border border-[#ebe4d5] bg-[#faf7f2] focus:ring-1 focus:ring-[#800020] outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">
                  Phone Number (Active for Delivery Call) *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="017XXXXXXXX or 018XXXXXXXX"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full text-xs p-3 rounded-lg border border-[#ebe4d5] bg-[#faf7f2] focus:ring-1 focus:ring-[#800020] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">
                Email Address (Optional for Invoice)
              </label>
              <input
                type="email"
                name="email"
                placeholder="client@example.com"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full text-xs p-3 rounded-lg border border-[#ebe4d5] bg-[#faf7f2] focus:ring-1 focus:ring-[#800020] outline-none"
              />
            </div>
          </div>

          {/* Section 2: Delivery Address */}
          <div className="bg-white p-6 rounded-2xl border border-[#ebe4d5] shadow-xs space-y-4">
            <h3 className="text-base font-serif font-bold text-[#1a1a1a] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#fce7ea] text-[#800020] flex items-center justify-center text-xs font-bold">
                2
              </span>
              Shipping Address in Bangladesh
            </h3>

            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">
                Full Street Address / Apartment / House / Road *
              </label>
              <input
                type="text"
                name="address"
                required
                placeholder="House 12, Road 5, Block C, Banani"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full text-xs p-3 rounded-lg border border-[#ebe4d5] bg-[#faf7f2] focus:ring-1 focus:ring-[#800020] outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">
                  Division / City *
                </label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full text-xs p-3 rounded-lg border border-[#ebe4d5] bg-[#faf7f2] focus:ring-1 focus:ring-[#800020] outline-none font-medium"
                >
                  <option value="Dhaka">Dhaka Metropolitan</option>
                  <option value="Chittagong">Chittagong</option>
                  <option value="Sylhet">Sylhet</option>
                  <option value="Rajshahi">Rajshahi</option>
                  <option value="Khulna">Khulna</option>
                  <option value="Barisal">Barisal</option>
                  <option value="Rangpur">Rangpur</option>
                  <option value="Mymensingh">Mymensingh</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">
                  Area / Thana
                </label>
                <input
                  type="text"
                  name="area"
                  placeholder="e.g. Gulshan / Uttara"
                  value={formData.area}
                  onChange={handleInputChange}
                  className="w-full text-xs p-3 rounded-lg border border-[#ebe4d5] bg-[#faf7f2] focus:ring-1 focus:ring-[#800020] outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">
                  Postal Code
                </label>
                <input
                  type="text"
                  name="postalCode"
                  placeholder="e.g. 1213"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  className="w-full text-xs p-3 rounded-lg border border-[#ebe4d5] bg-[#faf7f2] focus:ring-1 focus:ring-[#800020] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">
                Special Delivery Notes (Optional)
              </label>
              <textarea
                name="instructions"
                rows={2}
                placeholder="e.g. Please wrap in bridal presentation gift box with personal greeting note..."
                value={formData.instructions}
                onChange={handleInputChange}
                className="w-full text-xs p-3 rounded-lg border border-[#ebe4d5] bg-[#faf7f2] focus:ring-1 focus:ring-[#800020] outline-none"
              />
            </div>
          </div>

          {/* Section 3: Payment Method Selection */}
          <div className="bg-white p-6 rounded-2xl border border-[#ebe4d5] shadow-xs space-y-4">
            <h3 className="text-base font-serif font-bold text-[#1a1a1a] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#fce7ea] text-[#800020] flex items-center justify-center text-xs font-bold">
                3
              </span>
              Select Payment Method
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Cash on Delivery */}
              <label
                className={`p-4 rounded-xl border-2 cursor-pointer flex flex-col justify-between transition-all ${
                  paymentMethod === "COD"
                    ? "border-[#800020] bg-[#fce7ea]/40 shadow-xs"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === "COD"}
                      onChange={() => setPaymentMethod("COD")}
                      className="accent-[#800020]"
                    />
                    <span className="text-xs font-bold text-gray-900">Cash on Delivery</span>
                  </div>
                  <Truck className="w-4 h-4 text-[#800020]" />
                </div>
                <p className="text-[11px] text-gray-500 pl-5">
                  Pay with cash when courier hands over your luxury saree box.
                </p>
              </label>

              {/* bKash */}
              <label
                className={`p-4 rounded-xl border-2 cursor-pointer flex flex-col justify-between transition-all ${
                  paymentMethod === "BKASH"
                    ? "border-[#df146e] bg-[#df146e]/5 shadow-xs"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === "BKASH"}
                      onChange={() => setPaymentMethod("BKASH")}
                      className="accent-[#df146e]"
                    />
                    <span className="text-xs font-bold text-[#df146e]">bKash Payment</span>
                  </div>
                  <span className="px-2 py-0.5 bg-[#df146e] text-white text-[10px] font-bold rounded">
                    bKash
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 pl-5">
                  Send payment directly to our bKash Merchant account.
                </p>
              </label>

              {/* Nagad */}
              <label
                className={`p-4 rounded-xl border-2 cursor-pointer flex flex-col justify-between transition-all ${
                  paymentMethod === "NAGAD"
                    ? "border-[#f7941d] bg-[#f7941d]/5 shadow-xs"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === "NAGAD"}
                      onChange={() => setPaymentMethod("NAGAD")}
                      className="accent-[#f7941d]"
                    />
                    <span className="text-xs font-bold text-[#f7941d]">Nagad Payment</span>
                  </div>
                  <span className="px-2 py-0.5 bg-[#f7941d] text-white text-[10px] font-bold rounded">
                    Nagad
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 pl-5">
                  Instant mobile wallet transfer via Nagad merchant wallet.
                </p>
              </label>

              {/* Online Card */}
              <label
                className={`p-4 rounded-xl border-2 cursor-pointer flex flex-col justify-between transition-all ${
                  paymentMethod === "CARD"
                    ? "border-[#1a1f71] bg-[#1a1f71]/5 shadow-xs"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === "CARD"}
                      onChange={() => setPaymentMethod("CARD")}
                      className="accent-[#1a1f71]"
                    />
                    <span className="text-xs font-bold text-[#1a1f71]">Visa / Mastercard</span>
                  </div>
                  <CreditCard className="w-4 h-4 text-[#1a1f71]" />
                </div>
                <p className="text-[11px] text-gray-500 pl-5">
                  Secure local and international credit/debit cards.
                </p>
              </label>
            </div>

            {/* Mobile Banking Instructions Box */}
            {(paymentMethod === "BKASH" || paymentMethod === "NAGAD") && (
              <div className="p-4 bg-[#faf8ed] rounded-xl border border-[#d4af37] space-y-3 animate-in fade-in">
                <div className="text-xs text-gray-800 space-y-1">
                  <p className="font-bold text-[#855f1c]">
                    How to pay via {paymentMethod === "BKASH" ? "bKash" : "Nagad"}:
                  </p>
                  <p>1. Open your {paymentMethod} App or dial USSD.</p>
                  <p>
                    2. Select &apos;Make Payment&apos; to Merchant Number:{" "}
                    <span className="font-mono font-bold text-gray-900 bg-white px-2 py-0.5 rounded border border-[#d4af37]">
                      01700-112233
                    </span>
                  </p>
                  <p>3. Enter Amount: <span className="font-bold">{formatPrice(total)}</span></p>
                  <p>4. Enter Reference: <span className="font-bold">SAREE</span></p>
                  <p>5. Copy the 10-character Transaction ID (TrxID) and paste below:</p>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-800 block mb-1">
                    {paymentMethod} Transaction ID (TrxID) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 9J87AKL12Z"
                    value={trxId}
                    onChange={(e) => setTrxId(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-[#d4af37] bg-white font-mono uppercase focus:ring-1 focus:ring-[#800020] outline-none"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Order Items & Price Summary Box */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-[#ebe4d5] shadow-sm space-y-6 sticky top-24">
            <h3 className="text-base font-serif font-bold text-[#800020] pb-3 border-b border-[#ebe4d5] flex items-center justify-between">
              <span>Order Summary</span>
              <span className="text-xs font-normal text-gray-500">
                {cart.reduce((c, i) => c + i.quantity, 0)} items
              </span>
            </h3>

            {/* Saree Items List */}
            <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
              {cart.map((item) => (
                <div key={item.product.id} className="flex items-center gap-3 text-xs">
                  <div className="relative w-12 h-16 rounded-md overflow-hidden bg-[#faf7f2] flex-shrink-0 border border-gray-100">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="font-medium text-gray-900 truncate">{item.product.name}</h5>
                    <p className="text-gray-400 text-[11px]">
                      Qty: {item.quantity} × {formatPrice(item.product.price)}
                    </p>
                  </div>
                  <span className="font-bold text-[#800020]">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="space-y-2 text-xs pt-4 border-t border-gray-100">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-900">{formatPrice(subtotal)}</span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between text-[#800020] font-semibold">
                  <span>Coupon Discount ({appliedCoupon.code})</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-600">
                <span>Delivery Charge</span>
                <span>{deliveryCharge === 0 ? "FREE" : formatPrice(deliveryCharge)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#1a1a1a] pt-3 border-t border-gray-200">
                <span>Grand Total</span>
                <span className="text-xl text-[#800020]">{formatPrice(total)}</span>
              </div>
            </div>

            {/* Submit Order Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-gradient-to-r from-[#800020] to-[#580c1f] text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:brightness-110 shadow-lg shadow-[#800020]/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Lock className="w-4 h-4 text-[#d4af37]" />
              <span>{isSubmitting ? "Securing Order..." : "Confirm & Place Order"}</span>
            </button>

            <div className="text-center text-[11px] text-gray-400 space-y-1">
              <p className="flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
                100% Secure Checkout Guarantee
              </p>
              <p>Authentic pit-loom sarees packaged with royal care.</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
