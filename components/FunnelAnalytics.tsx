"use client";

export default function FunnelAnalytics({
  views,
  carts,
  purchases,
}: {
  views: number;
  carts: number;
  purchases: number;
  viewToCart: string;
  cartToPurchase: string;
}) {
  const viewToCart =
    views > 0 ? ((carts / views) * 100).toFixed(1) : "0";

  const cartToPurchase =
    carts > 0 ? ((purchases / carts) * 100).toFixed(1) : "0";

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <h2 className="font-semibold mb-4">
        Conversion Funnel
      </h2>

      <div className="space-y-4">

        <div>
          <p> Views: {views}</p>
        </div>

        <div>
          <p> Add to Cart: {carts}</p>
          <p className="text-sm text-gray-500">
            {viewToCart}% from views
          </p>
        </div>

        <div>
          <p> Purchases: {purchases}</p>
          <p className="text-sm text-gray-500">
            {cartToPurchase}% from cart
          </p>
        </div>

      </div>
    </div>
  );
}