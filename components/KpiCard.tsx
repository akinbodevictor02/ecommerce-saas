"use client";

export default function KpiCard({
  title,
  value,
  subtitle,
  color = "text-black",
}: {
  title: string;
  value: string | number;
  subtitle?: string;
  color?: string;
}) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
      <p className="text-gray-500 text-sm">{title}</p>

      <h2 className={`text-2xl font-bold mt-1 ${color}`}>
        {value}
      </h2>

      {subtitle && (
        <p className="text-xs text-gray-400 mt-2">
          {subtitle}
        </p>
      )}
    </div>
  );
}