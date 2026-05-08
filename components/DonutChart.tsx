"use client";

import { PieChart, Pie, Cell } from "recharts";

const data = [
  { name: "Website", value: 52 },
  { name: "Social", value: 23 },
  { name: "Direct", value: 15 },
  { name: "Referral", value: 10 },
];

export default function DonutChart() {
  return (
    <PieChart width={200} height={200}>
      <Pie
        data={data}
        dataKey="value"
        innerRadius={50}
        outerRadius={80}
      >
        {data.map((_, i) => (
          <Cell key={i} />
        ))}
      </Pie>
    </PieChart>
  );
}