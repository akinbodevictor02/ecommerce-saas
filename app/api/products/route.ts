import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminAPI } from "@/lib/serverAuth";

export async function POST(req: Request) {
  // 🔐 Admin protection
  const session = await requireAdminAPI();

  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const body = await req.json();
  const { name, price, images } = body;

  // ⚠️ Ensure images is an array
  if (!Array.isArray(images)) {
    return NextResponse.json(
      { error: "Images must be an array" },
      { status: 400 }
    );
  }

  const product = await prisma.product.create({
    data: {
      name,
      price,
      images: JSON.stringify(images), // ✅ store as JSON string
    },
  });

  return NextResponse.json(product);
}

export async function GET() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(products);
}