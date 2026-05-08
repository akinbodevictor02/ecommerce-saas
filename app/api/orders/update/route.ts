import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminAPI } from "@/lib/serverAuth";

export async function POST(req: Request) {
  const session = await requireAdminAPI();

  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const body = await req.json();

  await prisma.order.update({
    where: { id: body.id },
    data: { status: body.status },
  });

  return NextResponse.json({ success: true });
}