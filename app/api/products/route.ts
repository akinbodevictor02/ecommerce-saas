import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminAPI } from "@/lib/serverAuth";

// ==============================
// CREATE PRODUCT
// ==============================
export async function POST(req: Request) {
  // 🔐 ADMIN PROTECTION
  const session = await requireAdminAPI();

  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();

    const {
      name,
      description,
      price,
      images,
    } = body;

    // ✅ VALIDATION
    if (!name || !price) {
      return NextResponse.json(
        {
          error: "Name and price are required",
        },
        { status: 400 }
      );
    }

    // ✅ ENSURE IMAGES IS ARRAY
    if (!Array.isArray(images)) {
      return NextResponse.json(
        {
          error: "Images must be an array",
        },
        { status: 400 }
      );
    }

    // ✅ CREATE PRODUCT
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        images: JSON.stringify(images),
      },
    });

    return NextResponse.json(product);
  } catch (err) {
    console.log(err);

    return NextResponse.json(
      {
        error: "Failed to create product",
      },
      { status: 500 }
    );
  }
}

// ==============================
// GET PRODUCTS
// ==============================
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(products);
  } catch (err) {
    console.log(err);

    return NextResponse.json(
      {
        error: "Failed to fetch products",
      },
      { status: 500 }
    );
  }
}