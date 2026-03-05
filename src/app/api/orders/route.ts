import { NextResponse } from "next/server";
import { orders } from "@/data/seed";

export async function GET() {
  return NextResponse.json(orders);
}
