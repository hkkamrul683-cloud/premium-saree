import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProduct extends Document {
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
  featured: boolean;
  bestSeller: boolean;
  newArrival: boolean;
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
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    category: { type: String, required: true, index: true },
    fabric: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    compareAtPrice: { type: Number },
    discount: { type: Number, default: 0 },
    stock: { type: Number, required: true, default: 1, min: 0 },
    rating: { type: Number, default: 5.0, min: 1, max: 5 },
    reviewCount: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
    bestSeller: { type: Boolean, default: false },
    newArrival: { type: Boolean, default: true },
    colors: [{ type: String }],
    length: { type: String, default: "5.5 meters" },
    blouseDetails: { type: String, default: "Included" },
    images: [{ type: String, required: true }],
    description: { type: String, required: true },
    specifications: {
      weaveType: { type: String },
      border: { type: String },
      pallu: { type: String },
      origin: { type: String },
      care: { type: String },
    },
  },
  { timestamps: true }
);

ProductSchema.index({ name: "text", description: "text", fabric: "text" });

export const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);
export default Product;
