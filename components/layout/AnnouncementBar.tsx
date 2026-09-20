import React from "react";
import { Sparkles, Truck, ShieldCheck } from "lucide-react";

export default function AnnouncementBar() {
  return (
    <div className="bg-[#580c1f] text-[#f3e5ab] text-xs font-medium py-2 px-4 border-b border-[#800020]">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2 text-center sm:text-left">
        <div className="flex items-center justify-center gap-2 mx-auto sm:mx-0">
          <Truck className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>Complimentary Express Shipping Nationwide on Orders Over ৳5,000</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-[11px] tracking-wider uppercase">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#d4af37]" />
            100% Authentic Handloom Guarantee
          </span>
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
            Cash on Delivery Available
          </span>
          <span className="text-[#ffffff]/80">Helpline: +880 1800-SAREE</span>
        </div>
      </div>
    </div>
  );
}
