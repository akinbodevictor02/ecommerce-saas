"use client";

import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import PayButton from "@/components/PayButton";
import { formatPrice } from "@/lib/formatPrice";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const {
    items,
    removeItem,
    increaseQty,
    decreaseQty,
    clearCart,
  } = useCart();

  const { data: session } = useSession();

  const router = useRouter();

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-glow px-4 py-10">
      <div className="max-w-3xl mx-auto">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white">
            Shopping Cart
          </h1>

          <p className="text-gray-400 mt-2">
            Review your products before checkout
          </p>
        </div>

        {/* EMPTY */}
        {items.length === 0 ? (
          <div className="card p-10 text-center">
            <p className="text-gray-300 text-lg">
              Your cart is empty
            </p>
          </div>
        ) : (
          <>
            {/* ITEMS */}
            <div className="space-y-5">

              {items.map((item) => (
                <div
                  key={item.id}
                  className="card p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-5"
                >

                  {/* LEFT */}
                  <div className="flex items-center gap-4">

                    <img
                      src={
                        item.images?.[0] ||
                        "/placeholder.png"
                      }
                      alt={item.name}
                      className="w-24 h-24 rounded-2xl object-cover border border-white/10"
                    />

                    <div>
                      <h2 className="font-semibold text-lg text-white">
                        {item.name}
                      </h2>

                      <p className="text-gray-400 mt-1">
                        {formatPrice(item.price)}
                      </p>
                    </div>

                  </div>

                  {/* RIGHT */}
                  <div className="flex items-center gap-6">

                    {/* QUANTITY */}
                    <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-3 py-2">

                      <button
                        onClick={() =>
                          decreaseQty(item.id)
                        }
                        className="text-lg text-white hover:opacity-70"
                      >
                        -
                      </button>

                      <span className="text-white font-medium">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          increaseQty(item.id)
                        }
                        className="text-lg text-white hover:opacity-70"
                      >
                        +
                      </button>

                    </div>

                    {/* REMOVE */}
                    <button
                      onClick={() =>
                        removeItem(item.id)
                      }
                      className="text-red-400 hover:text-red-300 text-sm"
                    >
                      Remove
                    </button>

                  </div>

                </div>
              ))}

            </div>

            {/* TOTAL */}
            <div className="card p-6 mt-8">

              <div className="flex items-center justify-between mb-6">
                <p className="text-gray-400 text-lg">
                  Total
                </p>

                <h2 className="text-3xl font-bold text-white">
                  {formatPrice(total)}
                </h2>
              </div>

              {/* ACTIONS */}
              <div className="flex flex-col md:flex-row gap-4">

                <button
                  onClick={clearCart}
                  className="bg-red-500 hover:bg-red-600 transition-all duration-200 text-white px-6 py-3 rounded-2xl"
                >
                  Clear Cart
                </button>

                {!session ? (
                  <Button
                    onClick={() =>
                      router.push("/login")
                    }
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 text-white rounded-2xl py-6 text-base"
                  >
                    Login to Checkout
                  </Button>
                ) : (
                  <div className="flex-1">
                    <PayButton />
                  </div>
                )}

              </div>

            </div>
          </>
        )}

      </div>
    </div>
  );
}