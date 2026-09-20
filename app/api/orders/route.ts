import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Order } from "@/models/Order";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = await connectToDatabase();
    if (db) {
      const order = await Order.create(body);
      return NextResponse.json({ success: true, order });
    }
    return NextResponse.json({ success: true, order: body, note: "Local fallback mode" });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}
