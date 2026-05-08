"use client";

import { useCart } from "@/lib/cart";

export default function SuccessPage() {
  const clearCart = useCart((state) => state.clearCart);

  // clear cart after payment
  clearCart();

  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold text-green-600">
        Payment Successful ✓
      </h1>

      <p className="mt-2">
        Your order has been placed successfully.
      </p>

      <a
        href="/products"
        className="inline-block mt-4 bg-black text-white px-4 py-2 rounded-lg
        hover:bg-gray-800 active:scale-95 transition-all"
      >
        Continue Shopping
      </a>
    </div>
  );
}