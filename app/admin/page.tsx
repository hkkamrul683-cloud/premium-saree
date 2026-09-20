"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  TrendingUp,
  ShoppingBag,
  Package,
  Users,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useStore } from "@/lib/store";

export default function AdminDashboardPage() {
  const { products } = useStore();
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("saree_store_orders") || "[]");
      setOrders(saved);
    } catch (e) {
      console.error(e);
    }
  }, []);

  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const totalOrdersCount = orders.length;
  // Calculate unique patrons based on customer phone or email
  const uniquePatrons = new Set(
    orders.map((o) => o.customer?.phone || o.customer?.email).filter(Boolean)
  ).size;
  const lowStockProducts = products.filter((p) => p.stock <= 4);

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#ebe4d5] gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#b38f2e]">
            Executive Overview
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#800020] mt-1">
            Atelier Management Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="px-4 py-2.5 bg-[#800020] text-white text-xs font-bold rounded-xl hover:bg-[#580c1f] transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <span>Manage Products</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#d4af37]" />
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-[#ebe4d5] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span className="font-semibold uppercase tracking-wider">Gross Sales</span>
            <div className="w-8 h-8 rounded-full bg-[#fce7ea] text-[#800020] flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{formatPrice(totalRevenue)}</p>
          <p className="text-[11px] text-gray-500 font-medium">Real-time revenue from placed orders</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#ebe4d5] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span className="font-semibold uppercase tracking-wider">Total Orders</span>
            <div className="w-8 h-8 rounded-full bg-[#faf8ed] text-[#b38f2e] flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{totalOrdersCount}</p>
          <p className="text-[11px] text-gray-500 font-medium">Consignment pipeline count</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#ebe4d5] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span className="font-semibold uppercase tracking-wider">Saree Catalog</span>
            <div className="w-8 h-8 rounded-full bg-[#fce7ea] text-[#800020] flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{products.length} Weaves</p>
          <p className="text-[11px] text-gray-500">Active sarees in catalog</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#ebe4d5] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span className="font-semibold uppercase tracking-wider">VIP Patrons</span>
            <div className="w-8 h-8 rounded-full bg-[#faf8ed] text-[#b38f2e] flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{uniquePatrons}</p>
          <p className="text-[11px] text-gray-500 font-medium">Registered customer patrons</p>
        </div>
      </div>

      {/* Low Stock Warning Section */}
      {lowStockProducts.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-2 text-amber-900 font-serif font-bold text-sm">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>Low Stock Inventory Alert ({lowStockProducts.length} Saree Designs)</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {lowStockProducts.map((p) => (
              <div
                key={p.id}
                className="bg-white p-3 rounded-xl border border-amber-200 flex justify-between items-center text-xs"
              >
                <div>
                  <span className="font-bold text-gray-900 line-clamp-1">{p.name}</span>
                  <span className="text-[10px] text-gray-400 font-medium">Fabric: {p.fabric}</span>
                </div>
                <span className="px-2 py-0.5 bg-red-100 text-red-800 text-[10px] font-bold rounded-full ml-2">
                  {p.stock} left
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Orders Table */}
      <div className="bg-white rounded-2xl border border-[#ebe4d5] shadow-xs overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-serif font-bold text-base text-[#800020]">
            Recent Customer Consignments
          </h3>
          <Link
            href="/admin/orders"
            className="text-xs text-[#800020] font-semibold hover:underline flex items-center gap-1"
          >
            <span>View All Orders</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#faf7f2] text-gray-600 font-serif uppercase tracking-wider text-[10px] border-b border-[#ebe4d5]">
              <tr>
                <th className="py-3.5 px-4">Order ID</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">City</th>
                <th className="py-3.5 px-4">Total Amount</th>
                <th className="py-3.5 px-4">Payment</th>
                <th className="py-3.5 px-4">Pipeline Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {orders.length > 0 ? (
                orders.slice(0, 5).map((o, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#800020]">
                      {o.orderId}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-gray-900">
                      {o.customer?.fullName || "Valued Customer"}
                    </td>
                    <td className="py-3.5 px-4 text-gray-500">
                      {o.customer?.city || "Dhaka"}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-gray-900">
                      {formatPrice(o.total || 0)}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-800 text-[10px] font-bold rounded">
                        {o.paymentMethod || "COD"}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 bg-green-100 text-green-800 text-[10px] font-bold rounded-full">
                        {o.status || "CONFIRMED"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 px-4 text-center text-gray-400">
                    <p className="font-serif text-sm text-gray-600 font-semibold">No Consignments Placed Yet</p>
                    <p className="text-xs text-gray-400 mt-1">Orders from the storefront will appear here in real-time.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
