"use client";

import PageTransition from "@/components/PageTransition";

export default function AnalyticsPage() {
  return (
    <PageTransition>
      <div className="space-y-8">

        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold text-white">
            Analytics
          </h1>

          <p className="text-gray-400 mt-2">
            Deep insights into your store performance
          </p>
        </div>

        {/* KPI */}
        <div className="grid md:grid-cols-4 gap-6">

          <div className="card p-6">
            <p className="text-gray-400 text-sm">
              Revenue
            </p>

            <h2 className="text-3xl font-bold mt-2">
              $42,890
            </h2>
          </div>

          <div className="card p-6">
            <p className="text-gray-400 text-sm">
              Orders
            </p>

            <h2 className="text-3xl font-bold mt-2">
              1,284
            </h2>
          </div>

          <div className="card p-6">
            <p className="text-gray-400 text-sm">
              Conversion
            </p>

            <h2 className="text-3xl font-bold mt-2">
              4.8%
            </h2>
          </div>

          <div className="card p-6">
            <p className="text-gray-400 text-sm">
              Bounce Rate
            </p>

            <h2 className="text-3xl font-bold mt-2">
              28%
            </h2>
          </div>

        </div>

        {/* CHART PLACEHOLDER */}
        <div className="card p-6 h-[400px] flex items-center justify-center">
          <p className="text-gray-400">
            Advanced analytics charts coming soon
          </p>
        </div>

      </div>
    </PageTransition>
  );
}