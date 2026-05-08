import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    const body = await req.json();
    const { type, productId } = body;

    await prisma.event.create({
      data: {
        type,
        productId: productId || null,
        userId: session?.user?.id || null, // ✅ IMPORTANT FOR RETENTION
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.log("TRACK ERROR:", err);
    return NextResponse.json({ success: false });
  }
}