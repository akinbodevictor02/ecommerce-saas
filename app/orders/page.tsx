"use client";

import { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/my-orders")
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="border p-4 mb-3 rounded-lg"
          >
            <p className="font-bold">
              Ref: {order.reference}
            </p>

            <p className="text-sm text-gray-500">
              {new Date(order.createdAt).toLocaleString()}
            </p>

            {/* 🔥 STATUS BADGE */}
            <span className="inline-block mt-2 px-3 py-1 text-sm rounded-full bg-gray-200">
              {order.status}
            </span>

            <pre className="mt-2 text-xs bg-gray-100 p-2 overflow-auto">
              {order.items}
            </pre>
          </div>
        ))
      )}
    </div>
  );
}