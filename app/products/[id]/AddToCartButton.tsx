"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart";
import toast from "react-hot-toast";

export default function AddToCartButton({
  product,
}: any) {
  const addItem = useCart(
    (state) => state.addItem
  );

  const [loading, setLoading] =
    useState(false);

  const handleClick = async () => {
    setLoading(true);

    // ✅ FIX IMAGES
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,

      images:
        typeof product.images === "string"
          ? JSON.parse(product.images)
          : product.images || [],
    });

    // ✅ TRACK EVENT
    fetch("/api/track", {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({
        type: "add_to_cart",
        productId: product.id,
      }),
    });

    toast.success("Added to cart 🛒");

    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return (
    <button
      onClick={handleClick}
      className="mt-4 flex items-center gap-2 bg-black text-white px-5 py-3 rounded-xl hover:bg-gray-800 active:scale-95 transition-all duration-150 cursor-pointer"
    >
      {loading ? (
        "Adding..."
      ) : (
        <>
          🛒 Add to Cart
        </>
      )}
    </button>
  );
}