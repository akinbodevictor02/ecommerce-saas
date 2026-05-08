import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Resend } from "resend";
import { formatPrice } from "@/lib/formatPrice";

// ✅ SAFE RESEND (WILL NOT CRASH SERVER)
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    const body = await req.json();
    const { reference, items } = body;

    console.log("SESSION:", session);
    console.log("REFERENCE:", reference);
    console.log("RAW ITEMS:", items);

    // 🔍 VERIFY PAYMENT WITH PAYSTACK
    const res = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const data = await res.json();
    console.log("PAYSTACK RESPONSE:", data);

    if (data?.data?.status !== "success") {
      return NextResponse.json({
        success: false,
        error: "Payment not successful",
      });
    }

    // ✅ SAFE ITEMS PARSE
    let parsedItems: any[] = [];

    try {
      parsedItems =
        typeof items === "string"
          ? JSON.parse(items)
          : items || [];
    } catch (err) {
      console.log("ITEM PARSE ERROR:", err);
      parsedItems = [];
    }

    console.log("PARSED ITEMS:", parsedItems);

    // ✅ SAFE USER HANDLING
    let userId: string | null = null;

    if (session?.user?.id) {
      let user = await prisma.user.findUnique({
        where: { id: session.user.id },
      });

      if (!user) {
        user = await prisma.user.create({
          data: {
            id: session.user.id,
            email: session.user.email ?? null,
            name: session.user.name ?? null,
          },
        });

        console.log("✅ USER CREATED:", user);
      }

      userId = user.id;
    }

    // ✅ SAVE ORDER (THIS WILL ALWAYS RUN)
    const order = await prisma.order.create({
      data: {
        reference,
        items: JSON.stringify(parsedItems),
        status: "paid",
        userId: userId,
      },
    });

    console.log("✅ ORDER SAVED:", order);

    await prisma.event.create({
      data: {
        type: "purchase",
      },
    });

    // ✅ SEND EMAIL (SAFE — WILL NEVER CRASH)
    try {
      if (resend && session?.user?.email) {
        const total = parsedItems.reduce(
          (sum: number, item: any) =>
            sum + (item.price || 0) * (item.quantity || 0),
          0
        );

        await resend.emails.send({
          from: "EcomSaaS <onboarding@resend.dev>",
          to: session.user.email,
          subject: "🧾 Your Order Receipt",
          html: `
            <div style="font-family: Arial; max-width: 600px; margin: auto;">
              <h2>Thanks for your order</h2>

              <p><strong>Reference:</strong> ${reference}</p>

              ${parsedItems
                .map(
                  (item: any) => `
                  <p>${item.name} × ${item.quantity} — ${formatPrice(item.price)}</p>
                `
                )
                .join("")}

              <h3>Total: ${formatPrice(total)}</h3>
            </div>
          `,
        });

        console.log("📧 EMAIL SENT");
      } else {
        console.log("⚠️ EMAIL SKIPPED (no API key)");
      }
    } catch (emailError) {
      console.log("❌ EMAIL ERROR:", emailError);
    }

    return NextResponse.json({
      success: true,
      order,
    });

  } catch (error: any) {
    console.log("🔥 SERVER ERROR:", error);

    return NextResponse.json({
      success: false,
      error: error.message || "Server error",
    });
  }
}