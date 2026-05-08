"use client";

import { formatPrice } from "@/lib/formatPrice";

export default function OrdersTable({ orders }: any) {
  return (
    <div className="glass rounded-2xl overflow-hidden">

      <table className="w-full text-sm">
        <thead className="text-gray-400 border-b border-white/10">
          <tr>
            <th className="text-left p-4">Order</th>
            <th className="text-left p-4">Date</th>
            <th className="text-left p-4">Status</th>
            <th className="text-right p-4">Amount</th>
          </tr>
        </thead>

        <tbody>
          {orders.slice(0, 5).map((order: any) => (
            <tr
              key={order.id}
              className="border-b border-white/5 hover:bg-white/5 transition"
            >
              <td className="p-4 font-medium">
                {order.reference}
              </td>

              <td className="p-4 text-gray-400">
                {new Date(order.createdAt).toLocaleDateString()}
              </td>

              <td className="p-4">
                <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs">
                  {order.status}
                </span>
              </td>

              <td className="p-4 text-right font-semibold">
                {formatPrice(order.amount)}
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}