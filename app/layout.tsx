import type { Metadata } from "next";
import "./globals.css";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import LayoutShell from "@/components/layout/LayoutShell";
import { StoreProvider } from "@/lib/store";

export const metadata: Metadata = {
  title: "Royal Saree Atelier | Premium Handloom & Heritage Bridal Sarees",
  description:
    "Explore authentic Dhakai Jamdani, Mirpur Katan, Rajshahi Silk, Muslin, and Luxury Bridal Sarees handwoven by master artisans in Bangladesh.",
  keywords: [
    "Saree",
    "Jamdani",
    "Dhakai Jamdani",
    "Katan Saree",
    "Silk Saree",
    "Muslin",
    "Bridal Saree",
    "Bangladesh Handloom",
    "E-commerce",
  ],
  openGraph: {
    title: "Royal Saree Atelier | Premium Handloom Sarees",
    description: "Exclusive handwoven Jamdani, Katan, and Pure Silk sarees.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-[#fdfbf7] text-[#1a1a1a] antialiased selection:bg-[#800020] selection:text-[#f3e5ab]">
        <StoreProvider>
          <LayoutShell>{children}</LayoutShell>
        </StoreProvider>
      </body>
    </html>
  );
}
