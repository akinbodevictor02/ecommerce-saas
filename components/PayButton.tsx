"use client";

import { useCart } from "@/lib/cart";
import { toast } from "sonner";
export default function PayButton() {
  const { items } = useCart();

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const verifyPayment = async (reference: string) => {
    try {
      const res = await fetch("/api/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reference,
          items,
        }),
      });

      let data;

      try {
        data = await res.json();
      } catch {
        toast.error("Server crashed — check terminal");
        return;
      }

      console.log("VERIFY RESPONSE:", data);

      if (data.success) {
        localStorage.removeItem("cart"); // ✅ clear cart
        window.location.href = "/success";
      } else {
        toast.error(data.error || "Order not saved");
      }
    } catch (err) {
      console.log("VERIFY ERROR:", err);
      toast.error("Network error");
    }
  };

  const handlePayment = () => {
    const PaystackPop = (window as any).PaystackPop;

    if (!PaystackPop) {
      toast.error("Paystack not loaded");
      return;
    }

    const handler = PaystackPop.setup({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
      email: "testuser123@gmail.com",
      amount: total * 100,
      currency: "NGN",

      callback: function (response: any) {
        verifyPayment(response.reference);
      },

      onClose: function () {
        console.log("Payment closed");
      },
    });

    handler.openIframe();
  };

  return (
    <button
      onClick={handlePayment}
      className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 active:scale-95 transition-all duration-150 cursor-pointer"
    >
      Pay Now
    </button>
  );
}