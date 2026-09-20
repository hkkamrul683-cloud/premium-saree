"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Plus,
  Trash2,
  Edit,
  Search,
  Check,
  X,
  Package,
  Sparkles,
} from "lucide-react";
import { SareeProduct, INITIAL_CATEGORIES } from "@/lib/seed-data";
import { formatPrice } from "@/lib/utils";
import { useStore } from "@/lib/store";

export default function AdminProductsPage() {
  const { products, addProduct, updateProduct, deleteProduct } = useStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Saree Form State
  const [newSaree, setNewSaree] = useState({
    name: "",
    category: "jamdani",
    fabric: "Cotton-Silk",
    price: 15000,
    compareAtPrice: 18000,
    stock: 5,
    imageUrl:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80",
    description: "Handwoven luxury saree crafted with fine count threads and traditional motifs.",
  });

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to remove this saree from the catalog?")) {
      deleteProduct(id);
    }
  };

  const handleStockChange = (id: string, delta: number) => {
    const target = products.find((p) => p.id === id);
    if (target) {
      updateProduct({ ...target, stock: Math.max(0, target.stock + delta) });
    }
  };

  const handleAddSaree = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSaree.name.trim()) return;

    const slug = newSaree.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    const created: SareeProduct = {
      id: `sar-${Date.now()}`,
      name: newSaree.name,
      slug,
      category: newSaree.category,
      fabric: newSaree.fabric,
      price: Number(newSaree.price),
      compareAtPrice: Number(newSaree.compareAtPrice),
      discount: Math.round(
        ((newSaree.compareAtPrice - newSaree.price) / newSaree.compareAtPrice) * 100
      ),
      stock: Number(newSaree.stock),
      rating: 5.0,
      reviewCount: 0,
      newArrival: true,
      colors: ["Standard"],
      length: "5.5 meters",
      blouseDetails: "Included",
      images: [newSaree.imageUrl],
      description: newSaree.description,
      specifications: {
        weaveType: "Handloom Traditional Pit-Loom",
        border: "Gold Tested Zari Border",
        pallu: "Authentic Medallion Motif",
        origin: "Bengal Handloom Atelier",
        care: "Dry Clean Only",
      },
    };

    addProduct(created);
    setIsModalOpen(false);
    setNewSaree({
      name: "",
      category: "jamdani",
      fabric: "Cotton-Silk",
      price: 15000,
      compareAtPrice: 18000,
      stock: 5,
      imageUrl:
        "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80",
      description: "Handwoven luxury saree crafted with fine count threads and traditional motifs.",
    });
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.fabric.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#ebe4d5] gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#b38f2e]">
            Inventory & Catalog Management
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#800020] mt-1">
            Manage Saree Products ({products.length})
          </h1>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 bg-[#800020] text-white text-xs font-bold rounded-xl hover:bg-[#580c1f] transition-all flex items-center gap-2 shadow-sm"
        >
          <Plus className="w-4 h-4 text-[#d4af37]" />
          <span>Add New Saree Weave</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="flex gap-4 max-w-md">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search by title, fabric, category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-[#ebe4d5] bg-white outline-none focus:ring-1 focus:ring-[#800020]"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-2.5" />
        </div>
      </div>

      {/* Saree Products Table */}
      <div className="bg-white rounded-2xl border border-[#ebe4d5] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#faf7f2] text-gray-600 font-serif uppercase tracking-wider text-[10px] border-b border-[#ebe4d5]">
              <tr>
                <th className="py-3.5 px-4">Saree</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Fabric</th>
                <th className="py-3.5 px-4">Price</th>
                <th className="py-3.5 px-4">Stock</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-16 rounded-md overflow-hidden bg-[#faf7f2] flex-shrink-0 border border-gray-100">
                        <Image
                          src={p.images[0]}
                          alt={p.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <span className="font-serif font-bold text-gray-900 line-clamp-1">
                          {p.name}
                        </span>
                        <span className="text-[10px] text-gray-400 font-mono">
                          ID: {p.id}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 uppercase font-semibold text-[#800020]">
                    {p.category}
                  </td>

                  <td className="py-3.5 px-4 text-gray-500">{p.fabric}</td>

                  <td className="py-3.5 px-4 font-bold text-gray-900">
                    {formatPrice(p.price)}
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleStockChange(p.id, -1)}
                        className="w-5 h-5 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold flex items-center justify-center"
                      >
                        -
                      </button>
                      <span className="font-bold min-w-[24px] text-center">{p.stock}</span>
                      <button
                        onClick={() => handleStockChange(p.id, 1)}
                        className="w-5 h-5 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        p.stock > 0
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {p.stock > 0 ? "Available" : "Sold Out"}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/product/${p.slug}`}
                        target="_blank"
                        className="p-1 text-gray-400 hover:text-gray-700"
                        title="Preview on site"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="p-1 text-red-400 hover:text-red-700"
                        title="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add New Saree Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 space-y-4 shadow-2xl border border-[#ebe4d5]">
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <h3 className="text-base font-serif font-bold text-[#800020]">
                Add Saree to Handloom Catalog
              </h3>
              <button onClick={() => setIsModalOpen(false)}>
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleAddSaree} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-gray-700 block mb-1">
                  Saree Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Jamdani Peacock Motif in Navy & Gold"
                  value={newSaree.name}
                  onChange={(e) => setNewSaree({ ...newSaree, name: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-[#ebe4d5] bg-[#faf7f2]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-gray-700 block mb-1">
                    Category
                  </label>
                  <select
                    value={newSaree.category}
                    onChange={(e) => setNewSaree({ ...newSaree, category: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-[#ebe4d5] bg-[#faf7f2]"
                  >
                    {INITIAL_CATEGORIES.map((c) => (
                      <option key={c.id} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-gray-700 block mb-1">
                    Fabric Composition
                  </label>
                  <input
                    type="text"
                    value={newSaree.fabric}
                    onChange={(e) => setNewSaree({ ...newSaree, fabric: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-[#ebe4d5] bg-[#faf7f2]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-gray-700 block mb-1">
                    Price (৳ BDT) *
                  </label>
                  <input
                    type="number"
                    required
                    value={newSaree.price}
                    onChange={(e) =>
                      setNewSaree({ ...newSaree, price: Number(e.target.value) })
                    }
                    className="w-full p-2.5 rounded-lg border border-[#ebe4d5] bg-[#faf7f2]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-gray-700 block mb-1">
                    Compare Price (৳)
                  </label>
                  <input
                    type="number"
                    value={newSaree.compareAtPrice}
                    onChange={(e) =>
                      setNewSaree({ ...newSaree, compareAtPrice: Number(e.target.value) })
                    }
                    className="w-full p-2.5 rounded-lg border border-[#ebe4d5] bg-[#faf7f2]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-gray-700 block mb-1">
                    Initial Stock
                  </label>
                  <input
                    type="number"
                    required
                    value={newSaree.stock}
                    onChange={(e) =>
                      setNewSaree({ ...newSaree, stock: Number(e.target.value) })
                    }
                    className="w-full p-2.5 rounded-lg border border-[#ebe4d5] bg-[#faf7f2]"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-gray-700 block mb-1">
                  Cloudinary / Image URL *
                </label>
                <input
                  type="url"
                  required
                  value={newSaree.imageUrl}
                  onChange={(e) => setNewSaree({ ...newSaree, imageUrl: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-[#ebe4d5] bg-[#faf7f2]"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700 block mb-1">
                  Artisan Weaver&apos;s Description
                </label>
                <textarea
                  rows={3}
                  value={newSaree.description}
                  onChange={(e) =>
                    setNewSaree({ ...newSaree, description: e.target.value })
                  }
                  className="w-full p-2.5 rounded-lg border border-[#ebe4d5] bg-[#faf7f2]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#800020] text-white rounded-lg font-bold"
                >
                  Save & Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
