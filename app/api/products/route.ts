import { NextResponse } from "next/server";
import { INITIAL_PRODUCTS } from "@/lib/seed-data";
import { connectToDatabase } from "@/lib/db";
import { Product } from "@/models/Product";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const search = searchParams.get("search");

  try {
    const db = await connectToDatabase();
    if (db) {
      let query: any = {};
      if (category && category !== "all") query.category = category;
      if (search) query.$text = { $search: search };
      const products = await Product.find(query).lean();
      if (products && products.length > 0) {
        return NextResponse.json({ success: true, products });
      }
    }
  } catch (e) {
    console.error("DB query fallback to seed data", e);
  }

  // Fallback to static seed data
  let results = [...INITIAL_PRODUCTS];
  if (category && category !== "all") {
    results = results.filter((p) => p.category === category);
  }
  if (search) {
    const q = search.toLowerCase();
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.fabric.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }

  return NextResponse.json({ success: true, products: results });
}
