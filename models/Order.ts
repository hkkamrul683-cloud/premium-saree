import mongoose, { Schema, Document, Model } from "mongoose";

export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PROCESSING"
  | "SHIPPED"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "CANCELLED";

export interface IOrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  fabric?: string;
  color?: string;
}

export interface IOrder extends Document {
  orderId: string;
  customer: {
    name: string;
    phone: string;
    email?: string;
    address: string;
    city: string;
    area?: string;
    postalCode?: string;
    notes?: string;
  };
  items: IOrderItem[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  deliveryCharge: number;
  total: number;
  paymentMethod: "COD" | "BKASH" | "NAGAD" | "CARD";
  paymentStatus: "PENDING" | "PAID" | "FAILED";
  orderStatus: OrderStatus;
  timeline: Array<{
    status: OrderStatus;
    title: string;
    description: string;
    timestamp: Date;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema: Schema = new Schema(
  {
    orderId: { type: String, required: true, unique: true, index: true },
    customer: {
      name: { type: String, required: true },
      phone: { type: String, required: true, index: true },
      email: { type: String },
      address: { type: String, required: true },
      city: { type: String, required: true },
      area: { type: String },
      postalCode: { type: String },
      notes: { type: String },
    },
    items: [
      {
        productId: { type: String, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true, min: 1 },
        image: { type: String, required: true },
        fabric: { type: String },
        color: { type: String },
      },
    ],
    subtotal: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    couponCode: { type: String },
    deliveryCharge: { type: Number, default: 120 },
    total: { type: Number, required: true },
    paymentMethod: {
      type: String,
      enum: ["COD", "BKASH", "NAGAD", "CARD"],
      default: "COD",
    },
    paymentStatus: {
      type: String,
      enum: ["PENDING", "PAID", "FAILED"],
      default: "PENDING",
    },
    orderStatus: {
      type: String,
      enum: [
        "PENDING",
        "CONFIRMED",
        "PROCESSING",
        "SHIPPED",
        "OUT_FOR_DELIVERY",
        "DELIVERED",
        "CANCELLED",
      ],
      default: "PENDING",
      index: true,
    },
    timeline: [
      {
        status: { type: String },
        title: { type: String },
        description: { type: String },
        timestamp: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export const Order: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);
export default Order;
