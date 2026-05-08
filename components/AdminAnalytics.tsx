"use client";

import { formatPrice } from "@/lib/formatPrice";

export default function AdminAnalytics({
  orders,
}: {
  orders: any[];
}) {
  // 🔥 Parse + compute
  let totalRevenue = 0;
  let totalItemsSold = 0;

  const productMap: Record<
    string,
    { name: string; quantity: number; revenue: number }
  > = {};

  orders.forEach((order) => {
    try {
      const items = JSON.parse(order.items);

      items.forEach((item: any) => {
        const revenue = item.price * item.quantity;

        totalRevenue += revenue;
        totalItemsSold += item.quantity;

        if (!productMap[item.name]) {
          productMap[item.name] = {
            name: item.name,
            quantity: 0,
            revenue: 0,
          };
        }

        productMap[item.name].quantity += item.quantity;
        productMap[item.name].revenue += revenue;
      });
    } catch {}
  });

  // 🔥 Top products
  const topProducts = Object.values(productMap)
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5);

  return (
    <div className="space-y-6">

      {/* 🔥 STATS */}
      <div className="grid md:grid-cols-3 gap-6">
        
        <div className="p-6 bg-white rounded-2xl shadow-sm">
          <p className="text-gray-500">Revenue</p>
          <h2 className="text-2xl font-bold">
            {formatPrice(totalRevenue)}
          </h2>
        </div>

        <div className="p-6 bg-white rounded-2xl shadow-sm">
          <p className="text-gray-500">Orders</p>
          <h2 className="text-2xl font-bold">
            {orders.length}
          </h2>
        </div>

        <div className="p-6 bg-white rounded-2xl shadow-sm">
          <p className="text-gray-500">Items Sold</p>
          <h2 className="text-2xl font-bold">
            {totalItemsSold}
          </h2>
        </div>

      </div>

      {/* 🔥 TOP PRODUCTS */}
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <h2 className="font-semibold mb-4">
          Top Products
        </h2>

        {topProducts.length === 0 && (
          <p className="text-gray-500">
            No data yet
          </p>
        )}

        <div className="space-y-3">
          {topProducts.map((p, i) => (
            <div
              key={i}
              className="flex justify-between border-b pb-2"
            >
              <span>{p.name}</span>

              <div className="text-right text-sm text-gray-600">
                <p>{p.quantity} sold</p>
                <p>{formatPrice(p.revenue)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}