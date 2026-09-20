"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  User,
  Package,
  MapPin,
  ExternalLink,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<"profile" | "orders" | "addresses">("orders");
  const [orders, setOrders] = useState<any[]>([]);
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phone: "",
  });
  const [savedAddresses, setSavedAddresses] = useState<any[]>([]);
  const [savedMessage, setSavedMessage] = useState("");

  useEffect(() => {
    try {
      const savedOrders = JSON.parse(localStorage.getItem("saree_store_orders") || "[]");
      setOrders(savedOrders);

      const savedProf = localStorage.getItem("saree_store_user_profile");
      if (savedProf) {
        setProfile(JSON.parse(savedProf));
      }

      const savedAddr = localStorage.getItem("saree_store_user_addresses");
      if (savedAddr) {
        setSavedAddresses(JSON.parse(savedAddr));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem("saree_store_user_profile", JSON.stringify(profile));
      setSavedMessage("Profile details updated successfully.");
      setTimeout(() => setSavedMessage(""), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  const getInitials = () => {
    if (!profile.fullName.trim()) return "RS";
    const parts = profile.fullName.trim().split(" ");
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return parts[0].slice(0, 2).toUpperCase();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="mb-8 border-b border-[#ebe4d5] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#b38f2e]">
            Atelier Patronage
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#800020] mt-1">
            Customer Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/order-tracking"
            className="px-4 py-2 bg-white border border-[#d4af37] text-[#800020] text-xs font-semibold rounded-lg hover:bg-[#faf7f2] transition-colors"
          >
            Track Consignment
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar Nav */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-[#ebe4d5] shadow-xs space-y-2">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
              <div className="w-12 h-12 rounded-full bg-[#fce7ea] text-[#800020] flex items-center justify-center font-serif font-bold text-lg">
                {getInitials()}
              </div>
              <div>
                <h3 className="text-sm font-serif font-bold text-gray-900">
                  {profile.fullName || "Royal Patron"}
                </h3>
                <p className="text-[11px] text-[#b38f2e] font-semibold">Registered Member</p>
              </div>
            </div>

            <nav className="space-y-1 text-xs pt-2">
              <button
                onClick={() => setActiveTab("orders")}
                className={`w-full text-left px-3.5 py-2.5 rounded-lg flex items-center gap-2.5 font-semibold transition-colors ${
                  activeTab === "orders"
                    ? "bg-[#800020] text-white"
                    : "text-gray-700 hover:bg-[#faf7f2]"
                }`}
              >
                <Package className="w-4 h-4" />
                <span>My Orders ({orders.length})</span>
              </button>

              <button
                onClick={() => setActiveTab("profile")}
                className={`w-full text-left px-3.5 py-2.5 rounded-lg flex items-center gap-2.5 font-semibold transition-colors ${
                  activeTab === "profile"
                    ? "bg-[#800020] text-white"
                    : "text-gray-700 hover:bg-[#faf7f2]"
                }`}
              >
                <User className="w-4 h-4" />
                <span>Personal Profile</span>
              </button>

              <button
                onClick={() => setActiveTab("addresses")}
                className={`w-full text-left px-3.5 py-2.5 rounded-lg flex items-center gap-2.5 font-semibold transition-colors ${
                  activeTab === "addresses"
                    ? "bg-[#800020] text-white"
                    : "text-gray-700 hover:bg-[#faf7f2]"
                }`}
              >
                <MapPin className="w-4 h-4" />
                <span>Saved Addresses</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-9">
          {activeTab === "orders" && (
            <div className="space-y-4">
              <h2 className="text-lg font-serif font-bold text-[#800020]">
                Order History & Consignment Archives
              </h2>

              {orders.length === 0 ? (
                <div className="bg-white p-12 rounded-2xl border border-[#ebe4d5] text-center space-y-3">
                  <Package className="w-12 h-12 text-[#d4af37] mx-auto opacity-50" />
                  <h4 className="text-base font-serif font-bold text-gray-800">
                    No Orders Placed Yet
                  </h4>
                  <p className="text-xs text-gray-500 max-w-sm mx-auto">
                    When you place an order, its real-time production and delivery timeline will appear here.
                  </p>
                  <Link
                    href="/shop"
                    className="inline-block mt-2 px-6 py-2 bg-[#800020] text-white text-xs font-semibold rounded-lg"
                  >
                    Explore Handloom Sarees
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((ord, idx) => (
                    <div
                      key={idx}
                      className="bg-white p-5 rounded-2xl border border-[#ebe4d5] shadow-xs space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-gray-100 gap-2">
                        <div>
                          <span className="text-[10px] text-gray-400 font-mono">
                            {new Date(ord.date || Date.now()).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                          <h4 className="text-sm font-mono font-bold text-[#800020]">
                            {ord.orderId}
                          </h4>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="px-2.5 py-1 bg-green-100 text-green-800 text-[11px] font-bold rounded-full">
                            {ord.status || "CONFIRMED"}
                          </span>
                          <Link
                            href={`/order-tracking?orderId=${ord.orderId}`}
                            className="text-xs text-[#800020] font-semibold hover:underline flex items-center gap-1"
                          >
                            <span>Live Timeline</span>
                            <ExternalLink className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {ord.items?.map((item: any, i: number) => (
                          <div key={i} className="flex justify-between text-xs text-gray-800">
                            <span>
                              {item.quantity}× {item.name}
                            </span>
                            <span className="font-semibold text-[#800020]">
                              {formatPrice(item.price * item.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-3 border-t border-gray-100 flex justify-between items-center text-xs font-bold text-gray-900">
                        <span>Total Paid</span>
                        <span className="text-[#800020] text-sm">
                          {formatPrice(ord.total || 0)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "profile" && (
            <div className="bg-white p-6 rounded-2xl border border-[#ebe4d5] shadow-xs space-y-4 max-w-xl">
              <h2 className="text-lg font-serif font-bold text-[#800020]">
                Personal Profile Details
              </h2>
              {savedMessage && (
                <div className="p-3 bg-green-50 text-green-800 text-xs rounded-lg border border-green-200">
                  {savedMessage}
                </div>
              )}
              <form onSubmit={handleSaveProfile} className="space-y-3 text-xs">
                <div>
                  <label className="text-gray-500 block mb-1 font-semibold">Full Name</label>
                  <input
                    type="text"
                    value={profile.fullName}
                    onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                    placeholder="e.g. Ayesha Rahman"
                    className="w-full p-2.5 rounded-lg border border-[#ebe4d5] bg-[#faf7f2] focus:outline-none focus:ring-1 focus:ring-[#800020]"
                  />
                </div>
                <div>
                  <label className="text-gray-500 block mb-1 font-semibold">Email Address</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    placeholder="e.g. ayesha.rahman@example.com"
                    className="w-full p-2.5 rounded-lg border border-[#ebe4d5] bg-[#faf7f2] focus:outline-none focus:ring-1 focus:ring-[#800020]"
                  />
                </div>
                <div>
                  <label className="text-gray-500 block mb-1 font-semibold">Contact Phone Number</label>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    placeholder="e.g. +880 17XXXXXXXX"
                    className="w-full p-2.5 rounded-lg border border-[#ebe4d5] bg-[#faf7f2] focus:outline-none focus:ring-1 focus:ring-[#800020]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#800020] text-white text-xs font-semibold rounded-lg hover:bg-[#580c1f] transition-colors"
                >
                  Save Changes
                </button>
              </form>
            </div>
          )}

          {activeTab === "addresses" && (
            <div className="space-y-4">
              <h2 className="text-lg font-serif font-bold text-[#800020]">
                Saved Delivery Addresses
              </h2>
              {savedAddresses.length === 0 ? (
                <div className="bg-white p-12 rounded-2xl border border-[#ebe4d5] text-center space-y-2">
                  <MapPin className="w-10 h-10 text-[#d4af37] mx-auto opacity-50" />
                  <p className="text-sm font-serif text-gray-800 font-semibold">No Saved Addresses</p>
                  <p className="text-xs text-gray-400">
                    Your shipping addresses from previous orders will be saved here automatically.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {savedAddresses.map((addr, i) => (
                    <div
                      key={i}
                      className="bg-white p-5 rounded-xl border border-[#ebe4d5] space-y-2 text-xs"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-gray-900">{addr.label || `Address ${i + 1}`}</span>
                      </div>
                      <p className="text-gray-700">{addr.address}</p>
                      <p className="text-gray-500">{addr.city}</p>
                      <p className="text-gray-500">Phone: {addr.phone}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
