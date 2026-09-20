export interface SareeProduct {
  id: string;
  name: string;
  slug: string;
  category: string;
  fabric: string;
  price: number;
  compareAtPrice?: number;
  discount?: number;
  stock: number;
  rating: number;
  reviewCount: number;
  featured?: boolean;
  bestSeller?: boolean;
  newArrival?: boolean;
  colors: string[];
  length: string;
  blouseDetails: string;
  images: string[];
  description: string;
  specifications: {
    weaveType: string;
    border: string;
    pallu: string;
    origin: string;
    care: string;
  };
}

export interface SareeCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  itemCount: number;
}

export const INITIAL_CATEGORIES: SareeCategory[] = [
  {
    id: "jamdani",
    name: "Dhakai Jamdani",
    slug: "jamdani",
    description: "UNESCO intangible cultural heritage handloom masterpieces with intricate floral motifs.",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80",
    itemCount: 0,
  },
  {
    id: "katan",
    name: "Katan Saree",
    slug: "katan",
    description: "Opulent silk warp and weft handwoven with gleaming gold zari borders for regal brides.",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&auto=format&fit=crop&q=80",
    itemCount: 0,
  },
  {
    id: "silk",
    name: "Pure Silk",
    slug: "silk",
    description: "Ultra-fine natural silk sourced from historic silkworm artisans with a subtle lustrous sheen.",
    image: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=800&auto=format&fit=crop&q=80",
    itemCount: 0,
  },
  {
    id: "muslin",
    name: "Heritage Muslin",
    slug: "muslin",
    description: "Feather-light gossamer weave revived from legendary royal court Bengal traditions.",
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&auto=format&fit=crop&q=80",
    itemCount: 0,
  },
  {
    id: "banarasi",
    name: "Banarasi Weaves",
    slug: "banarasi",
    description: "Rich metallic brocades featuring traditional floral jaal, kalga, and bel motifs.",
    image: "https://images.unsplash.com/photo-1610030469854-a6ecb0c16922?w=800&auto=format&fit=crop&q=80",
    itemCount: 0,
  },
  {
    id: "wedding",
    name: "Bridal Sarees",
    slug: "wedding",
    description: "Showstopping heavy craftsmanship, real zari embroidery, and lavish bridal tones.",
    image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800&auto=format&fit=crop&q=80",
    itemCount: 0,
  },
  {
    id: "tangail",
    name: "Tangail Cotton",
    slug: "tangail",
    description: "Comfort meets heritage in breathable crisp cotton with delicate border work.",
    image: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=800&auto=format&fit=crop&q=80",
    itemCount: 0,
  },
  {
    id: "party",
    name: "Party Wear",
    slug: "party",
    description: "Modern silhouettes, contemporary color palettes, and shimmering thread accents.",
    image: "https://images.unsplash.com/photo-1610030469668-936d55d4e2d3?w=800&auto=format&fit=crop&q=80",
    itemCount: 0,
  }
];

export const INITIAL_PRODUCTS: SareeProduct[] = [];

export const INITIAL_COUPONS = [];
