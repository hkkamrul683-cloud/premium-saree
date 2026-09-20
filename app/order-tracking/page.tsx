"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Package,
  CheckCircle,
  Truck,
  Clock,
  ShieldCheck,
  MapPin,
  Sparkles,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";

function OrderTrackingContent() {
  const searchParams = useSearchParams();
  const initialOrderId = searchParams.get("orderId") || "";

  const [orderQuery, setOrderQuery] = useState(initialOrderId);
  const [matchedOrder, setMatchedOrder] = useState<any>(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (initialOrderId) {
      searchForOrder(initialOrderId);
    } else {
      // Check last saved order ID if any
      const lastId = localStorage.getItem("saree_last_order_id");
      if (lastId) {
        setOrderQuery(lastId);
        searchForOrder(lastId);
      }
    }
  }, [initialOrderId]);

  const searchForOrder = (query: string) => {
    setHasSearched(true);
    const cleaned = query.trim().toUpperCase();

    try {
      const orders = JSON.parse(localStorage.getItem("saree_store_orders") || "[]");
      const found = orders.find(
        (o: any) =>
          o.orderId.toUpperCase() === cleaned ||
          (o.customer?.phone && o.customer.phone.includes(query.trim()))
      );

      if (found) {
        setMatchedOrder(found);
        return;
      }
    } catch (e) {
      console.error(e);
    }

    // No demo fallback - show not found if no match in storage
    setMatchedOrder(null);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderQuery.trim()) {
      searchForOrder(orderQuery);
    }
  };

  const steps = [
    { label: "Order Placed", desc: "Received at Royal Atelier", done: true },
    { label: "Order Confirmed", desc: "Artisan Loom Slot Assigned", done: true },
    { label: "Processing & QC", desc: "Careful Inspection & Acid-free Pack", done: true },
    { label: "Shipped", desc: "Handed to Express Courier", done: false },
    { label: "Out for Delivery", desc: "Courier Agent Assigned to Area", done: false },
    { label: "Delivered", desc: "Delivered in Royal Signature Box", done: false },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#b38f2e]">
          Atelier Logistics
        </span>
        <h1 className="text-3xl font-serif font-bold text-[#800020] mt-1">
          Track Your Saree Consignment
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 mt-2">
          Enter your Order ID (e.g. <span className="font-mono font-bold text-[#800020]">SAR-2026-XXXX</span>) or customer phone number to see live loom & shipping milestones.
        </p>

        {/* Search Input */}
        <form onSubmit={handleSearchSubmit} className="mt-6 flex gap-2 max-w-md mx-auto">
          <input
            type="text"
            required
            placeholder="Enter Order ID or Phone"
            value={orderQuery}
            onChange={(e) => setOrderQuery(e.target.value)}
            className="flex-1 text-xs px-4 py-3 rounded-xl border border-[#d4af37] bg-white font-mono uppercase focus:ring-2 focus:ring-[#800020] outline-none shadow-xs"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-[#800020] text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#580c1f] transition-all flex items-center gap-1.5 shadow-sm"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Track</span>
          </button>
        </form>
      </div>

      {/* Matched Order Display */}
      {matchedOrder ? (
        <div className="bg-white rounded-2xl border border-[#ebe4d5] shadow-lg p-6 sm:p-8 space-y-8 animate-in fade-in">
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-gray-100 gap-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#b38f2e] bg-[#faf8ed] px-2.5 py-1 rounded-full border border-[#d4af37]/40">
                Loom Reference
              </span>
              <h2 className="text-xl font-mono font-bold text-[#800020] mt-2">
                {matchedOrder.orderId}
              </h2>
              <p className="text-xs text-gray-500">
                Registered on: {new Date(matchedOrder.date || Date.now()).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </p>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-xs text-gray-500 block">Current Status:</span>
              <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full mt-1">
                {matchedOrder.status || "CONFIRMED"}
              </span>
            </div>
          </div>

          {/* Visual 6-Step Timeline */}
          <div>
            <h3 className="text-sm font-serif font-bold text-gray-900 mb-6">
              Consignment Progress Timeline
            </h3>

            <div className="relative">
              {/* Progress Line */}
              <div className="hidden md:block absolute top-5 left-8 right-8 h-1 bg-gray-200">
                <div className="h-full bg-gradient-to-r from-[#d4af37] to-[#800020] w-1/2" />
              </div>

              {/* Steps Grid */}
              <div className="grid grid-cols-1 md:grid-cols-6 gap-6 relative z-10">
                {steps.map((step, idx) => (
                  <div key={idx} className="flex md:flex-col items-center gap-3 md:text-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                        step.done
                          ? "bg-[#800020] text-white shadow-md shadow-[#800020]/20"
                          : "bg-white border-2 border-gray-300 text-gray-400"
                      }`}
                    >
                      {step.done ? (
                        <CheckCircle className="w-5 h-5 text-[#d4af37]" />
                      ) : (
                        <Clock className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <h4
                        className={`text-xs font-bold ${
                          step.done ? "text-[#800020]" : "text-gray-500"
                        }`}
                      >
                        {step.label}
                      </h4>
                      <p className="text-[10px] text-gray-400 mt-0.5 leading-snug">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Consignment & Recipient Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-100 text-xs">
            {/* Delivery Recipient */}
            <div className="bg-[#faf7f2] p-5 rounded-xl border border-[#ebe4d5] space-y-2">
              <h4 className="font-serif font-bold text-sm text-[#800020] flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#d4af37]" />
                Delivery Destination
              </h4>
              <p className="font-semibold text-gray-900">{matchedOrder.customer?.fullName}</p>
              <p className="text-gray-600">{matchedOrder.customer?.address}</p>
              <p className="text-gray-600 font-medium">
                City: {matchedOrder.customer?.city || "Dhaka"}
              </p>
              <p className="text-gray-600">Phone: {matchedOrder.customer?.phone}</p>
            </div>

            {/* Saree Items in Box */}
            <div className="bg-[#faf7f2] p-5 rounded-xl border border-[#ebe4d5] space-y-3">
              <h4 className="font-serif font-bold text-sm text-[#800020] flex items-center gap-1.5">
                <Package className="w-4 h-4 text-[#d4af37]" />
                Package Contents
              </h4>
              <div className="space-y-2">
                {matchedOrder.items?.map((it: any, i: number) => (
                  <div key={i} className="flex justify-between items-center text-xs">
                    <span className="truncate max-w-[200px] text-gray-800 font-medium">
                      {it.quantity}× {it.name}
                    </span>
                    <span className="font-bold text-[#800020]">
                      {formatPrice(it.price * it.quantity)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="pt-2 border-t border-[#ebe4d5] flex justify-between font-bold text-gray-900">
                <span>Total Consignment Value:</span>
                <span className="text-[#800020]">{formatPrice(matchedOrder.total)}</span>
              </div>
            </div>
          </div>
        </div>
      ) : hasSearched ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-[#ebe4d5] p-6 space-y-3">
          <Package className="w-10 h-10 text-gray-400 mx-auto" />
          <h3 className="text-base font-serif font-bold text-gray-800">
            No Consignment Found with &ldquo;{orderQuery}&rdquo;
          </h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            Please check the spelling of your Order ID or the phone number used during checkout. You can also contact our concierge helpline for instant lookup.
          </p>
        </div>
      ) : null}
    </div>
  );
}

export default function OrderTrackingPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm">Loading tracker...</div>}>
      <OrderTrackingContent />
    </Suspense>
  );
}
