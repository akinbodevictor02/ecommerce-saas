"use client";

export default function ProductFunnel({
  data,
}: {
  data: any[];
}) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm mt-10">
      <h2 className="text-xl font-bold mb-6">
        Product Funnel
      </h2>

      <div className="space-y-4">
        {data.map((p) => (
          <div
            key={p.id}
            className="border rounded-xl p-4"
          >
            <h3 className="font-semibold">
              {p.name}
            </h3>

            <div className="flex justify-between text-sm mt-2 text-gray-600">
              <span>👀 {p.views}</span>
              <span>🛒 {p.carts}</span>
              <span>💳 {p.purchases}</span>
              <span className="font-bold text-black">
                {p.conversion}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}