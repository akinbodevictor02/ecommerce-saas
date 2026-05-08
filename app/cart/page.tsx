"use client";

import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import PayButton from "@/components/PayButton";
import { formatPrice } from "@/lib/formatPrice";

export default function CartPage() {
  const {
    items,
    removeItem,
    increaseQty,
    decreaseQty,
    clearCart,
  } = useCart();

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">Cart</h1>

      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {items.map((item) => (
            <div
              key={item.id}
              className="border p-4 mb-3 flex justify-between items-center"
            >
              <div>
                <h2 className="font-bold">{item.name}</h2>
                <p>{formatPrice(item.price)}</p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => decreaseQty(item.id)}
                  className="px-2 bg-gray-200"
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() => increaseQty(item.id)}
                  className="px-2 bg-gray-200"
                >
                  +
                </button>
              </div>

              {/* Remove */}
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}

          {/* TOTAL */}
          <div className="mt-6 text-xl font-bold">
            Total: {formatPrice(total)}
          </div>

          {/* CLEAR + CHECKOUT */}
          <div className="flex gap-3 mt-4">
            <button
              onClick={clearCart}
              className="bg-red-500 text-white px-4 py-2 rounded-lg
              hover:bg-red-600 active:scale-95
              transition-all duration-150 cursor-pointer"
          >
              Clear Cart
            </button>

            <PayButton />
          </div>
        </>
      )}
    </div>
  );
}