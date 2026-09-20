"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Filter, SlidersHorizontal, X, RefreshCw, Sparkles } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import { INITIAL_CATEGORIES } from "@/lib/seed-data";
import { useStore } from "@/lib/store";

function ShopContent() {
  const { products } = useStore();
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const initialSearch = searchParams.get("search") || "";
  const initialSort = searchParams.get("sort") || "newest";

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [selectedFabric, setSelectedFabric] = useState<string>("all");
  const [selectedColor, setSelectedColor] = useState<string>("all");
  const [maxPrice, setMaxPrice] = useState<number>(50000);
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>(initialSort);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  // Fabrics & Colors list derived from catalog
  const fabrics = ["Cotton-Silk", "Pure Silk", "Muslin", "Brocade Silk", "Cotton", "Georgette", "Velvet"];
  const colors = ["Crimson", "Gold", "White", "Wine", "Green", "Blue", "Pink", "Black", "Yellow"];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (selectedCategory !== "all" && product.category !== selectedCategory) {
        return false;
      }
      // Fabric filter
      if (
        selectedFabric !== "all" &&
        !product.fabric.toLowerCase().includes(selectedFabric.toLowerCase())
      ) {
        return false;
      }
      // Color filter
      if (
        selectedColor !== "all" &&
        !product.colors.some((c) => c.toLowerCase().includes(selectedColor.toLowerCase()))
      ) {
        return false;
      }
      // Price filter
      if (product.price > maxPrice) {
        return false;
      }
      // In-stock filter
      if (onlyInStock && product.stock <= 0) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesFabric = product.fabric.toLowerCase().includes(query);
        const matchesCat = product.category.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        if (!matchesName && !matchesFabric && !matchesCat && !matchesDesc) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "popular") return b.reviewCount - a.reviewCount;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "discount") return (b.discount || 0) - (a.discount || 0);
      // default: newest
      return (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0);
    });
  }, [
    selectedCategory,
    selectedFabric,
    selectedColor,
    maxPrice,
    onlyInStock,
    searchQuery,
    sortBy,
  ]);

  const handleResetFilters = () => {
    setSelectedCategory("all");
    setSelectedFabric("all");
    setSelectedColor("all");
    setMaxPrice(50000);
    setOnlyInStock(false);
    setSearchQuery("");
    setSortBy("newest");
  };

  const hasActiveFilters =
    selectedCategory !== "all" ||
    selectedFabric !== "all" ||
    selectedColor !== "all" ||
    maxPrice < 50000 ||
    onlyInStock ||
    searchQuery !== "";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Page Header */}
      <div className="mb-8 text-center sm:text-left border-b border-[#ebe4d5] pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#b38f2e]">
            Handloom Masterpieces
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#800020] mt-1">
            Exclusive Saree Collections
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Displaying {filteredProducts.length} authentic handwoven creations
          </p>
        </div>

        {/* Mobile Filter Toggle Button */}
        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="lg:hidden inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-[#ebe4d5] rounded-lg text-sm font-semibold text-[#800020] shadow-xs"
        >
          <Filter className="w-4 h-4" />
          <span>Filters & Refinements</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block lg:col-span-3 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-[#ebe4d5] shadow-xs space-y-6 sticky top-24">
            <div className="flex items-center justify-between pb-3 border-b border-[#ebe4d5]">
              <div className="flex items-center gap-2 text-sm font-serif font-bold text-[#1a1a1a]">
                <SlidersHorizontal className="w-4 h-4 text-[#800020]" />
                <span>Refine Selection</span>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={handleResetFilters}
                  className="text-[11px] font-semibold text-[#800020] hover:underline flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  Reset
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="space-y-2.5">
              <label className="text-xs font-serif uppercase tracking-wider font-bold text-gray-900 block">
                Heritage Weaves
              </label>
              <div className="space-y-1.5 text-xs">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`w-full text-left px-3 py-1.5 rounded-md transition-colors ${
                    selectedCategory === "all"
                      ? "bg-[#800020] text-white font-bold"
                      : "text-gray-700 hover:bg-[#faf7f2]"
                  }`}
                >
                  All Categories ({products.length})
                </button>
                {INITIAL_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`w-full text-left px-3 py-1.5 rounded-md transition-colors flex items-center justify-between ${
                      selectedCategory === cat.slug
                        ? "bg-[#800020] text-white font-bold"
                        : "text-gray-700 hover:bg-[#faf7f2]"
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] opacity-70">
                      ({products.filter((p) => p.category === cat.slug).length})
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="space-y-2.5 pt-4 border-t border-gray-100">
              <div className="flex justify-between items-center text-xs">
                <label className="font-serif uppercase tracking-wider font-bold text-gray-900">
                  Max Budget
                </label>
                <span className="font-bold text-[#800020]">
                  ৳{maxPrice.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="4000"
                max="50000"
                step="1000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#800020] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400">
                <span>৳4,000</span>
                <span>৳50,000</span>
              </div>
            </div>

            {/* Fabric Filter */}
            <div className="space-y-2.5 pt-4 border-t border-gray-100">
              <label className="text-xs font-serif uppercase tracking-wider font-bold text-gray-900 block">
                Fabric & Loom
              </label>
              <select
                value={selectedFabric}
                onChange={(e) => setSelectedFabric(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-[#ebe4d5] bg-white text-gray-800 focus:ring-1 focus:ring-[#800020] outline-none"
              >
                <option value="all">All Fabrics</option>
                {fabrics.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>

            {/* Color Filter */}
            <div className="space-y-2.5 pt-4 border-t border-gray-100">
              <label className="text-xs font-serif uppercase tracking-wider font-bold text-gray-900 block">
                Dominant Shade
              </label>
              <select
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-[#ebe4d5] bg-white text-gray-800 focus:ring-1 focus:ring-[#800020] outline-none"
              >
                <option value="all">All Colors</option>
                {colors.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* In-Stock Toggle */}
            <div className="pt-4 border-t border-gray-100 flex items-center gap-2">
              <input
                type="checkbox"
                id="inStockCheck"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="w-4 h-4 rounded text-[#800020] focus:ring-[#800020] accent-[#800020]"
              />
              <label htmlFor="inStockCheck" className="text-xs font-medium text-gray-700 cursor-pointer">
                In Stock Sarees Only
              </label>
            </div>
          </div>
        </aside>

        {/* Products Column */}
        <main className="lg:col-span-9 space-y-6">
          {/* Top Controls: Search Bar & Sort Dropdown */}
          <div className="bg-white p-4 rounded-xl border border-[#ebe4d5] shadow-xs flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Live Search Input */}
            <div className="w-full sm:w-72">
              <input
                type="text"
                placeholder="Filter by title, fabric..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#ebe4d5] bg-[#faf7f2] focus:outline-none focus:ring-1 focus:ring-[#800020]"
              />
            </div>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <span className="text-xs text-gray-500 font-medium whitespace-nowrap">
                Sort by:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-xs p-2 rounded-lg border border-[#ebe4d5] bg-white text-gray-800 focus:ring-1 focus:ring-[#800020] outline-none font-medium cursor-pointer"
              >
                <option value="newest">Newest Arrivals</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="popular">Most Popular</option>
                <option value="rating">Top Rated</option>
                <option value="discount">Highest Discount</option>
              </select>
            </div>
          </div>

          {/* Active Filter Chips */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-gray-500 font-medium">Active Filters:</span>
              {selectedCategory !== "all" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#fce7ea] text-[#800020] font-semibold">
                  Category: {selectedCategory}
                  <button onClick={() => setSelectedCategory("all")}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedFabric !== "all" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#fce7ea] text-[#800020] font-semibold">
                  Fabric: {selectedFabric}
                  <button onClick={() => setSelectedFabric("all")}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedColor !== "all" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#fce7ea] text-[#800020] font-semibold">
                  Color: {selectedColor}
                  <button onClick={() => setSelectedColor("all")}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#faf8ed] text-[#855f1c] font-semibold">
                  Query: &ldquo;{searchQuery}&rdquo;
                  <button onClick={() => setSearchQuery("")}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          )}

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl border border-[#ebe4d5] p-6 space-y-4">
              <Sparkles className="w-10 h-10 text-[#d4af37] mx-auto" />
              <h3 className="text-lg font-serif font-bold text-gray-800">
                No Sarees Found
              </h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                No handloom sarees match your active criteria. Try clearing your filters or search query.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-6 py-2 bg-[#800020] text-white text-xs font-semibold rounded-lg hover:bg-[#580c1f] transition-all"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filter Slide-out Modal */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          <div
            onClick={() => setIsMobileFilterOpen(false)}
            className="absolute inset-0 bg-black/50 backdrop-blur-xs"
          />
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-2xl p-6 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h3 className="text-base font-serif font-bold text-[#800020]">
                Filter Sarees
              </h3>
              <button onClick={() => setIsMobileFilterOpen(false)}>
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Mobile Category Select */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-gray-800">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full text-xs p-2 rounded-md border border-gray-200"
              >
                <option value="all">All Categories</option>
                {INITIAL_CATEGORIES.map((c) => (
                  <option key={c.id} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Mobile Fabric Select */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-gray-800">
                Fabric
              </label>
              <select
                value={selectedFabric}
                onChange={(e) => setSelectedFabric(e.target.value)}
                className="w-full text-xs p-2 rounded-md border border-gray-200"
              >
                <option value="all">All Fabrics</option>
                {fabrics.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>

            {/* Mobile Max Price */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span>Budget</span>
                <span className="text-[#800020]">৳{maxPrice.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="4000"
                max="50000"
                step="1000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#800020]"
              />
            </div>

            <button
              onClick={() => setIsMobileFilterOpen(false)}
              className="w-full py-3 bg-[#800020] text-white text-xs font-bold uppercase tracking-wider rounded-lg"
            >
              Apply Filters ({filteredProducts.length})
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm">Loading catalog...</div>}>
      <ShopContent />
    </Suspense>
  );
}
