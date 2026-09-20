"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  ExternalLink,
  Search,
  CheckCircle,
  Truck,
  Phone,
  MapPin,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("saree_store_orders") || "[]");
      setOrders(saved);
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleStatusChange = (orderId: string, newStatus: string) => {
    const updated = orders.map((o) =>
      o.orderId === orderId ? { ...o, status: newStatus } : o
    );
    setOrders(updated);
    localStorage.setItem("saree_store_orders", JSON.stringify(updated));
  };

  const filteredOrders = orders.filter((o) => {
    if (statusFilter !== "all" && o.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchId = o.orderId?.toLowerCase().includes(q);
      const matchName = o.customer?.fullName?.toLowerCase().includes(q);
      const matchPhone = o.customer?.phone?.includes(q);
      if (!matchId && !matchName && !matchPhone) return false;
    }
    return true;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#ebe4d5] gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#b38f2e]">
            Consignment Pipeline
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#800020] mt-1">
            Customer Orders ({orders.length})
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/order-tracking"
            target="_blank"
            className="px-4 py-2 bg-white border border-[#ebe4d5] text-[#800020] text-xs font-semibold rounded-xl hover:bg-[#faf7f2] flex items-center gap-1.5"
          >
            <span>Live Customer Tracker</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search by Order ID, customer, phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-[#ebe4d5] bg-white outline-none focus:ring-1 focus:ring-[#800020]"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-2.5" />
        </div>

        <div className="flex items-center gap-2 text-xs w-full sm:w-auto">
          <span className="text-gray-500 font-medium">Filter:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="p-2 rounded-lg border border-[#ebe4d5] bg-white text-xs font-semibold"
          >
            <option value="all">All Statuses</option>
            <option value="CONFIRMED">CONFIRMED</option>
            <option value="PROCESSING">PROCESSING</option>
            <option value="SHIPPED">SHIPPED</option>
            <option value="DELIVERED">DELIVERED</option>
            <option value="CANCELLED">CANCELLED</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-[#ebe4d5] shadow-xs overflow-hidden">
        {filteredOrders.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <ShoppingBag className="w-10 h-10 text-gray-300 mx-auto" />
            <h4 className="font-serif font-bold text-gray-700">No Orders Found</h4>
            <p className="text-xs text-gray-400">
              Orders placed by customers through checkout will appear here instantly.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#faf7f2] text-gray-600 font-serif uppercase tracking-wider text-[10px] border-b border-[#ebe4d5]">
                <tr>
                  <th className="py-3.5 px-4">Order ID & Date</th>
                  <th className="py-3.5 px-4">Customer & Address</th>
                  <th className="py-3.5 px-4">Consignment Items</th>
                  <th className="py-3.5 px-4">Total Amount</th>
                  <th className="py-3.5 px-4">Payment</th>
                  <th className="py-3.5 px-4">Update Pipeline Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {filteredOrders.map((ord, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3.5 px-4">
                      <span className="font-mono font-bold text-[#800020] block">
                        {ord.orderId}
                      </span>
                      <span className="text-[10px] text-gray-400">
                        {new Date(ord.date || Date.now()).toLocaleDateString()}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 space-y-0.5">
                      <span className="font-semibold text-gray-900 block">
                        {ord.customer?.fullName}
                      </span>
                      <span className="text-[11px] text-gray-500 flex items-center gap-1">
                        <Phone className="w-3 h-3 text-[#d4af37]" />
                        {ord.customer?.phone}
                      </span>
                      <span className="text-[10px] text-gray-400 block truncate max-w-[180px]">
                        {ord.customer?.address}, {ord.customer?.city}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 space-y-1">
                      {ord.items?.map((it: any, i: number) => (
                        <div key={i} className="truncate max-w-[180px] text-gray-800">
                          {it.quantity}× {it.name}
                        </div>
                      ))}
                    </td>

                    <td className="py-3.5 px-4 font-bold text-gray-900">
                      {formatPrice(ord.total)}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-800 font-semibold rounded text-[10px]">
                        {ord.paymentMethod}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <select
                        value={ord.status || "CONFIRMED"}
                        onChange={(e) => handleStatusChange(ord.orderId, e.target.value)}
                        className={`text-xs font-bold p-1.5 rounded-lg border outline-none cursor-pointer ${
                          ord.status === "DELIVERED"
                            ? "bg-green-50 text-green-800 border-green-200"
                            : ord.status === "SHIPPED"
                            ? "bg-blue-50 text-blue-800 border-blue-200"
                            : "bg-amber-50 text-amber-800 border-amber-200"
                        }`}
                      >
                        <option value="CONFIRMED">CONFIRMED</option>
                        <option value="PROCESSING">PROCESSING</option>
                        <option value="SHIPPED">SHIPPED</option>
                        <option value="OUT_FOR_DELIVERY">OUT_FOR_DELIVERY</option>
                        <option value="DELIVERED">DELIVERED</option>
                        <option value="CANCELLED">CANCELLED</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
