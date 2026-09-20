"use client";

import React, { useState, useEffect } from "react";
import { Plus, Trash2, Tag, Check, Sparkles } from "lucide-react";
import { INITIAL_COUPONS } from "@/lib/seed-data";
import { formatPrice } from "@/lib/utils";

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<any[]>(INITIAL_COUPONS);
  const [code, setCode] = useState("");
  const [type, setType] = useState<"percentage" | "fixed">("percentage");
  const [value, setValue] = useState(15);
  const [minOrder, setMinOrder] = useState(5000);
  const [desc, setDesc] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("saree_store_coupons");
      if (saved) {
        setCoupons(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
    setMounted(true);
  }, []);

  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    const newC = {
      code: code.trim().toUpperCase(),
      discountType: type,
      discountValue: Number(value),
      minOrder: Number(minOrder),
      description: desc || `${value}${type === "percentage" ? "%" : "৳"} discount`,
    };

    const updated = [...coupons, newC];
    setCoupons(updated);
    try {
      localStorage.setItem("saree_store_coupons", JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
    setCode("");
    setDesc("");
  };

  const handleDelete = (codeToDelete: string) => {
    const updated = coupons.filter((c) => c.code !== codeToDelete);
    setCoupons(updated);
    try {
      localStorage.setItem("saree_store_coupons", JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8">
      <div className="pb-6 border-b border-[#ebe4d5]">
        <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#b38f2e]">
          Promotions & Privileges
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#800020] mt-1">
          Discount Coupons & Vouchers ({coupons.length})
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Coupons List */}
        <div className="lg:col-span-8 space-y-4">
          {coupons.map((c) => (
            <div
              key={c.code}
              className="bg-white rounded-xl border border-[#ebe4d5] p-5 shadow-xs flex justify-between items-center"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-sm text-[#800020] bg-[#fce7ea] px-2.5 py-1 rounded border border-[#800020]/20">
                    {c.code}
                  </span>
                  <span className="px-2 py-0.5 bg-green-100 text-green-800 text-[10px] font-bold rounded-full">
                    Active
                  </span>
                </div>
                <p className="text-xs text-gray-700 font-medium mt-1">{c.description}</p>
                <p className="text-[11px] text-gray-400">
                  Minimum Order: {formatPrice(c.minOrder)} | Discount:{" "}
                  {c.discountType === "percentage" ? `${c.discountValue}%` : formatPrice(c.discountValue)}
                </p>
              </div>

              <button
                onClick={() => handleDelete(c.code)}
                className="text-gray-400 hover:text-red-600 p-2"
                title="Delete Coupon"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Create Coupon Form */}
        <div className="lg:col-span-4">
          <div className="bg-white p-6 rounded-2xl border border-[#ebe4d5] shadow-xs space-y-4 sticky top-24">
            <h3 className="font-serif font-bold text-sm text-[#800020] flex items-center gap-1.5">
              <Plus className="w-4 h-4 text-[#d4af37]" />
              <span>Create Promo Coupon</span>
            </h3>

            <form onSubmit={handleAddCoupon} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-gray-700 block mb-1">
                  Coupon Code *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. BRIDAL20"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-[#ebe4d5] bg-[#faf7f2] font-mono uppercase"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-gray-700 block mb-1">
                    Discount Type
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="w-full p-2.5 rounded-lg border border-[#ebe4d5] bg-[#faf7f2]"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Amount (৳)</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-gray-700 block mb-1">
                    Value
                  </label>
                  <input
                    type="number"
                    required
                    value={value}
                    onChange={(e) => setValue(Number(e.target.value))}
                    className="w-full p-2.5 rounded-lg border border-[#ebe4d5] bg-[#faf7f2]"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-gray-700 block mb-1">
                  Minimum Order (৳)
                </label>
                <input
                  type="number"
                  value={minOrder}
                  onChange={(e) => setMinOrder(Number(e.target.value))}
                  className="w-full p-2.5 rounded-lg border border-[#ebe4d5] bg-[#faf7f2]"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700 block mb-1">
                  Description
                </label>
                <input
                  type="text"
                  placeholder="e.g. 20% OFF for bridal orders"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-[#ebe4d5] bg-[#faf7f2]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#800020] text-white font-bold rounded-lg hover:bg-[#580c1f] transition-colors"
              >
                Publish Coupon
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
