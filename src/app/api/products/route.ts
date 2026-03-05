import { NextResponse } from "next/server";
import { products } from "@/data/seed";

export async function GET() {
  return NextResponse.json(products);
}
