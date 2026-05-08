"use client";

import PageTransition from "@/components/PageTransition";

export default function MarketingPage() {
  return (
    <PageTransition>
      <div className="space-y-8">

        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold text-white">
            Marketing
          </h1>

          <p className="text-gray-400 mt-2">
            Track campaigns and growth performance
          </p>
        </div>

        {/* METRICS */}
        <div className="grid md:grid-cols-4 gap-6">

          <div className="card p-6">
            <p className="text-gray-400 text-sm">
              Ad Spend
            </p>

            <h2 className="text-3xl font-bold mt-2">
              $12,400
            </h2>
          </div>

          <div className="card p-6">
            <p className="text-gray-400 text-sm">
              ROAS
            </p>

            <h2 className="text-3xl font-bold mt-2">
              4.2x
            </h2>
          </div>

          <div className="card p-6">
            <p className="text-gray-400 text-sm">
              CTR
            </p>

            <h2 className="text-3xl font-bold mt-2">
              6.8%
            </h2>
          </div>

          <div className="card p-6">
            <p className="text-gray-400 text-sm">
              Conversions
            </p>

            <h2 className="text-3xl font-bold mt-2">
              284
            </h2>
          </div>

        </div>

        {/* CAMPAIGNS */}
        <div className="card p-6">

          <h2 className="text-xl font-semibold mb-6">
            Active Campaigns
          </h2>

          <div className="space-y-4">

            <div className="flex items-center justify-between border border-white/10 rounded-2xl p-4">
              <div>
                <p className="font-medium">
                  Summer Sale Campaign
                </p>

                <p className="text-sm text-gray-400 mt-1">
                  Facebook & Instagram Ads
                </p>
              </div>

              <span className="text-green-400 text-sm">
                Active
              </span>
            </div>

            <div className="flex items-center justify-between border border-white/10 rounded-2xl p-4">
              <div>
                <p className="font-medium">
                  Email Retargeting
                </p>

                <p className="text-sm text-gray-400 mt-1">
                  Klaviyo Automation
                </p>
              </div>

              <span className="text-green-400 text-sm">
                Running
              </span>
            </div>

          </div>

        </div>

      </div>
    </PageTransition>
  );
}