import React from "react";
import ProductCard from "./ProductCard";
import { SareeProduct } from "@/lib/seed-data";
import { Sparkles } from "lucide-react";

interface ProductGridProps {
  products: SareeProduct[];
  title?: string;
  subtitle?: string;
}

export default function ProductGrid({ products, title, subtitle }: ProductGridProps) {
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-16 px-4 bg-white rounded-xl border border-[#ebe4d5] my-6">
        <Sparkles className="w-8 h-8 text-[#d4af37] mx-auto mb-3" />
        <h3 className="text-lg font-serif font-semibold text-[#1a1a1a]">
          No Sarees Found Matching Your Criteria
        </h3>
        <p className="text-sm text-gray-500 mt-1 max-w-md mx-auto">
          Try adjusting your search terms, removing filters, or explore our full artisanal handloom collections.
        </p>
      </div>
    );
  }

  return (
    <section className="py-6">
      {(title || subtitle) && (
        <div className="text-center max-w-3xl mx-auto mb-8">
          {title && (
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#800020] tracking-wide">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-sm text-gray-600 mt-2 font-light">
              {subtitle}
            </p>
          )}
          <div className="w-16 h-0.5 bg-[#d4af37] mx-auto mt-3" />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
