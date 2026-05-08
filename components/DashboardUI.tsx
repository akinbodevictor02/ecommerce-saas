"use client";

import DashboardLayout from "./DashboardLayout";
import SalesChart from "@/components/SalesChart";
import DonutChart from "./DonutChart";
import OrdersTable from "./OrdersTable";
import { formatPrice } from "@/lib/formatPrice";

export default function DashboardUI({
  totalRevenue,
  orders,
  views,
  conversionRate,
  salesChartData,
  totalAdSpend,
  cac,
  avgLTV,
  ltvToCac,
  session,
}: any) {
  return (
    <DashboardLayout>

      {/* TOP BAR */}
      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-2xl font-semibold">
            Overview
          </h1>
        </div>

        <div className="flex items-center gap-4">

          <input
            placeholder="Search..."
            className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-sm outline-none"
          />

          <div className="w-9 h-9 rounded-full bg-white/20" />

          <div>
            <p className="text-sm font-medium">
              {session.user?.name}
            </p>
            <p className="text-xs text-gray-400">
              Admin
            </p>
          </div>

        </div>

      </div>

      {/* KPI ROW */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">

        <Card title="Total Revenue" value={formatPrice(totalRevenue)} />
        <Card title="Orders" value={orders.length} />
        <Card title="Customers" value="3,456" />
        <Card title="Conversion Rate" value={`${conversionRate}%`} />

      </div>

      {/* MAIN GRID */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">

        {/* CHART */}
        <div className="glass p-6 rounded-2xl md:col-span-2">
          <h2 className="mb-4 text-sm text-gray-400">
            Revenue Overview
          </h2>

          <SalesChart data={salesChartData} />
        </div>

        {/* DONUT STYLE BLOCK */}
        <DonutChart />

      </div>

      {/* LOWER GRID */}
      <div className="grid md:grid-cols-3 gap-6">

        {/* ORDERS TABLE */}
        <OrdersTable orders={orders} />

        {/* PRODUCTS */}
        <div className="glass p-6 rounded-2xl">

          <h2 className="mb-4 text-sm text-gray-400">
            Top Products
          </h2>

          <div className="space-y-3 text-sm text-gray-300">
            <p>Wireless Headphones</p>
            <p>Smart Watch Series 8</p>
            <p>Gaming Sneakers</p>
          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}

/* SMALL COMPONENTS */

function Card({ title, value }: any) {
  return (
    <div className="glass p-5 rounded-2xl">
      <p className="text-gray-400 text-sm">{title}</p>
      <h2 className="text-xl font-bold mt-2">{value}</h2>
    </div>
  );
}

function Row({ label, value }: any) {
  return (
    <div className="flex justify-between">
      <span>{label}</span>
      <span className="text-gray-400">{value}</span>
    </div>
  );
}