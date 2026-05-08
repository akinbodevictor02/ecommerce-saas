"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
} from "recharts";

export default function AnalyticsChart({
  data,
}: {
  data: { date: string; orders: number; revenue: number }[];
}) {
  return (
    <div className="grid md:grid-cols-2 gap-6">

      {/* 📊 ORDERS CHART */}
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <h2 className="font-semibold mb-4">
          Orders Trend
        </h2>

        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="orders" fill="#111" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 📈 REVENUE CHART */}
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <h2 className="font-semibold mb-4">
          Revenue Trend
        </h2>

        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#111"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}