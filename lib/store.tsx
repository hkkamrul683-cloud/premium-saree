"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { SareeProduct, INITIAL_PRODUCTS } from "./seed-data";

export interface CartItem {
  product: SareeProduct;
  quantity: number;
  selectedColor?: string;
}

export interface AppliedCoupon {
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  discountAmount: number;
}

interface StoreContextType {
  products: SareeProduct[];
  setProducts: React.Dispatch<React.SetStateAction<SareeProduct[]>>;
  addProduct: (product: SareeProduct) => void;
  updateProduct: (product: SareeProduct) => void;
  deleteProduct: (productId: string) => void;
  cart: CartItem[];
  wishlist: SareeProduct[];
  isCartOpen: boolean;
  appliedCoupon: AppliedCoupon | null;
  addToCart: (product: SareeProduct, quantity?: number, selectedColor?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (product: SareeProduct) => void;
  isInWishlist: (productId: string) => boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  subtotal: number;
  discountAmount: number;
  deliveryCharge: number;
  total: number;
  cartCount: number;
  wishlistCount: number;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<SareeProduct[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<SareeProduct[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(null);
  const [mounted, setMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedProducts = localStorage.getItem("saree_store_products");
      if (savedProducts) {
        setProducts(JSON.parse(savedProducts));
      } else {
        setProducts(INITIAL_PRODUCTS);
      }

      const savedCart = localStorage.getItem("saree_store_cart");
      const savedWishlist = localStorage.getItem("saree_store_wishlist");
      if (savedCart) setCart(JSON.parse(savedCart));
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    } catch (e) {
      console.error("Failed to load local store", e);
    }
    setMounted(true);
  }, []);

  // Sync to localStorage
  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem("saree_store_cart", JSON.stringify(cart));
      localStorage.setItem("saree_store_wishlist", JSON.stringify(wishlist));
    } catch (e) {
      console.error("Failed to save local store", e);
    }
  }, [cart, wishlist, mounted]);

  const addProduct = (product: SareeProduct) => {
    setProducts((prev) => {
      const updated = [product, ...prev];
      try {
        localStorage.setItem("saree_store_products", JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const updateProduct = (product: SareeProduct) => {
    setProducts((prev) => {
      const updated = prev.map((p) => (p.id === product.id ? product : p));
      try {
        localStorage.setItem("saree_store_products", JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const deleteProduct = (productId: string) => {
    setProducts((prev) => {
      const updated = prev.filter((p) => p.id !== productId);
      try {
        localStorage.setItem("saree_store_products", JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const addToCart = (product: SareeProduct, quantity = 1, selectedColor?: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + quantity, product.stock || 99) }
            : item
        );
      }
      return [
        ...prev,
        {
          product,
          quantity: Math.min(quantity, product.stock || 99),
          selectedColor: selectedColor || (product.colors && product.colors[0]) || "Standard",
        },
      ];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: Math.min(quantity, item.product.stock || 99) }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const toggleWishlist = (product: SareeProduct) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((p) => p.id === productId);
  };

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const applyCoupon = (code: string) => {
    const upper = code.trim().toUpperCase();
    let availableCoupons: any[] = [];
    try {
      const saved = localStorage.getItem("saree_store_coupons");
      if (saved) availableCoupons = JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }

    const found = availableCoupons.find((c: any) => c.code?.toUpperCase() === upper);
    if (!found) {
      return { success: false, message: "Invalid or expired coupon code." };
    }

    if (found.minOrder && subtotal < found.minOrder) {
      return {
        success: false,
        message: `Minimum order of ৳${found.minOrder.toLocaleString()} required for ${upper}.`,
      };
    }

    let discount = 0;
    if (found.discountType === "percentage") {
      discount = Math.round((subtotal * (found.discountValue || 0)) / 100);
      if (found.maxDiscount) discount = Math.min(discount, found.maxDiscount);
    } else {
      discount = Math.min(found.discountValue || 0, subtotal);
    }

    setAppliedCoupon({
      code: upper,
      discountType: found.discountType,
      discountValue: found.discountValue,
      discountAmount: discount,
    });

    return {
      success: true,
      message: `${upper} applied! You saved ৳${discount.toLocaleString()}`,
    };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const discountAmount = appliedCoupon ? appliedCoupon.discountAmount : 0;
  const deliveryCharge = subtotal >= 5000 || subtotal === 0 ? 0 : 120;
  const total = Math.max(0, subtotal - discountAmount + deliveryCharge);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);
  const wishlistCount = wishlist.length;

  return (
    <StoreContext.Provider
      value={{
        products,
        setProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        cart,
        wishlist,
        isCartOpen,
        appliedCoupon,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        setIsCartOpen,
        applyCoupon,
        removeCoupon,
        subtotal,
        discountAmount,
        deliveryCharge,
        total,
        cartCount,
        wishlistCount,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}
