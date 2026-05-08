"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import PageTransition from "@/components/PageTransition";
import { formatPrice } from "@/lib/formatPrice";

export default function AdminOrdersPage() {
  const { data: session, status } = useSession();

  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  // ✅ FETCH ORDERS
  useEffect(() => {
    if (status !== "authenticated") return;

    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoadingOrders(false);
      });
  }, [status]);

  // ✅ UPDATE STATUS
  const updateStatus = async (
    id: string,
    status: string
  ) => {
    await fetch("/api/orders/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, status }),
    });

    const res = await fetch("/api/orders");
    const data = await res.json();

    setOrders(data);
  };

  // ✅ LOADING
  if (status === "loading") {
    return (
      <p className="p-6 text-gray-400">
        Loading...
      </p>
    );
  }

  // ✅ UNAUTHORIZED
  if (!session || session.user.role !== "ADMIN") {
    return (
      <p className="p-6 text-red-400">
        Unauthorized
      </p>
    );
  }

  // ✅ LOADING ORDERS
  if (loadingOrders) {
    return (
      <p className="p-6 text-gray-400">
        Loading orders...
      </p>
    );
  }

  // ✅ EMPTY
  if (orders.length === 0) {
    return (
      <p className="p-6 text-gray-400">
        No orders yet
      </p>
    );
  }

  return (
    <PageTransition>
      <div className="p-6">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">
            Admin Orders
          </h1>

          <p className="text-gray-400 mt-2">
            Manage and track customer orders
          </p>
        </div>

        {/* ORDERS */}
        <div className="space-y-6">

          {orders.map((order) => (
            <div
              key={order.id}
              className="card p-6 hover:shadow-xl transition-all duration-300"
            >

              {/* TOP */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                <div>
                  <p className="font-semibold text-lg text-white">
                    Ref: {order.reference}
                  </p>

                  <p className="text-sm text-gray-400 mt-1">
                    {new Date(
                      order.createdAt
                    ).toLocaleString()}
                  </p>
                </div>

                {/* STATUS */}
                <span
                  className={`inline-flex w-fit items-center px-4 py-1.5 text-xs rounded-full font-medium ${
                    order.status === "paid"
                      ? "bg-green-500/20 text-green-400 border border-green-500/20"
                      : order.status === "shipped"
                      ? "bg-blue-500/20 text-blue-400 border border-blue-500/20"
                      : order.status === "delivered"
                      ? "bg-purple-500/20 text-purple-400 border border-purple-500/20"
                      : "bg-gray-500/20 text-gray-300 border border-white/10"
                  }`}
                >
                  {order.status}
                </span>

              </div>

              {/* ORDER ITEMS */}
              <div className="mt-5">
                <p className="text-sm font-medium text-gray-300 mb-2">
                  Order Items
                </p>

                <pre className="text-xs bg-white/5 border border-white/10 text-gray-200 p-4 rounded-2xl overflow-auto leading-6">
{JSON.stringify(
  JSON.parse(order.items),
  null,
  2
)}
                </pre>
              </div>

              {/* ACTIONS */}
              <div className="flex flex-wrap gap-3 mt-5">

                <button
                  onClick={() =>
                    updateStatus(order.id, "shipped")
                  }
                  className="btn bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl"
                >
                  Ship Order
                </button>

                <button
                  onClick={() =>
                    updateStatus(order.id, "delivered")
                  }
                  className="btn bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-xl"
                >
                  Mark Delivered
                </button>

              </div>

            </div>
          ))}

        </div>

      </div>
    </PageTransition>
  );
}