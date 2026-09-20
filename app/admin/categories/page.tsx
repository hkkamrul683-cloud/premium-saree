"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Trash2, Layers, Sparkles } from "lucide-react";
import { INITIAL_CATEGORIES, SareeCategory } from "@/lib/seed-data";
import { useStore } from "@/lib/store";

export default function AdminCategoriesPage() {
  const { products } = useStore();
  const [categories, setCategories] = useState<SareeCategory[]>(INITIAL_CATEGORIES);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(
    "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80"
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("saree_store_categories");
      if (saved) {
        setCategories(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
    setMounted(true);
  }, []);

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const newCat: SareeCategory = {
      id: slug,
      name,
      slug,
      description: desc || "Authentic handwoven tradition.",
      image,
      itemCount: 0,
    };

    const updated = [...categories, newCat];
    setCategories(updated);
    try {
      localStorage.setItem("saree_store_categories", JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
    setName("");
    setDesc("");
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this category?")) {
      const updated = categories.filter((c) => c.id !== id);
      setCategories(updated);
      try {
        localStorage.setItem("saree_store_categories", JSON.stringify(updated));
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="pb-6 border-b border-[#ebe4d5]">
        <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#b38f2e]">
          Guilds & Collections
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#800020] mt-1">
          Manage Saree Categories ({categories.length})
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Categories Grid */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {categories.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-xl border border-[#ebe4d5] p-4 flex gap-4 items-center shadow-xs"
            >
              <div className="relative w-16 h-20 rounded-lg overflow-hidden bg-[#faf7f2] flex-shrink-0">
                <Image src={c.image} alt={c.name} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h4 className="font-serif font-bold text-sm text-gray-900 truncate">
                    {c.name}
                  </h4>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="text-gray-400 hover:text-red-600 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[11px] text-gray-500 line-clamp-2 mt-0.5 font-light">
                  {c.description}
                </p>
                <span className="text-[10px] text-[#b38f2e] font-semibold mt-1 block">
                  Slug: /{c.slug}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Add Category Form */}
        <div className="lg:col-span-4">
          <div className="bg-white p-6 rounded-2xl border border-[#ebe4d5] shadow-xs space-y-4 sticky top-24">
            <h3 className="font-serif font-bold text-sm text-[#800020] flex items-center gap-1.5">
              <Plus className="w-4 h-4 text-[#d4af37]" />
              <span>Create New Category</span>
            </h3>

            <form onSubmit={handleAddCategory} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-gray-700 block mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Designer Georgette"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-[#ebe4d5] bg-[#faf7f2]"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700 block mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-[#ebe4d5] bg-[#faf7f2]"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700 block mb-1">
                  Brief Description
                </label>
                <textarea
                  rows={2}
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Artisanal origin and significance..."
                  className="w-full p-2.5 rounded-lg border border-[#ebe4d5] bg-[#faf7f2]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#800020] text-white font-bold rounded-lg hover:bg-[#580c1f] transition-colors"
              >
                Add Category
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
