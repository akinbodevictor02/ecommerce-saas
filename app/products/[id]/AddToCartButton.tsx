"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart";
import toast from "react-hot-toast";

export default function AddToCartButton({ product }: any) {
  const addItem = useCart((state) => state.addItem);
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    addItem(product);

    fetch("/api/track", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
      className="mt-4 flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg
      hover:bg-gray-800 active:scale-95
      transition-all duration-150 cursor-pointer"
    >
      {loading ? "Adding..." : (
        <>
          🛒 Add to Cart
        </>
      )}
    </button>
  );
}