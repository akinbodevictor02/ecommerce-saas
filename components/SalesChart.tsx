"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function SalesChart({
  data,
}: {
  data: { date: string; total: number }[];
}) {
  return (
    <div className="h-80 w-full bg-white p-4 rounded-2xl shadow-sm">
      <h2 className="font-semibold mb-4">
        Sales Overview
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="total"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}