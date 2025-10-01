import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

// connect to Neon
const sql = neon(process.env.DATABASE_URL!);

export async function GET() {
  try {
    const products = await sql`
      SELECT id, name, price, slug, images, category, brand, description, stock, rating, banner
      FROM "Product"
      ORDER BY name;
    `;
    return NextResponse.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
