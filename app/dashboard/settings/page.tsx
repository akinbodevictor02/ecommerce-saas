"use client";

import PageTransition from "@/components/PageTransition";

export default function SettingsPage() {
  return (
    <PageTransition>
      <div className="space-y-8">

        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold text-white">
            Settings
          </h1>

          <p className="text-gray-400 mt-2">
            Manage your store preferences
          </p>
        </div>

        {/* SETTINGS */}
        <div className="grid md:grid-cols-2 gap-6">

          <div className="card p-6">
            <h2 className="font-semibold text-lg mb-4">
              Store Settings
            </h2>

            <div className="space-y-4">

              <div>
                <p className="text-sm text-gray-400 mb-2">
                  Store Name
                </p>

                <input
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none"
                  defaultValue="EcomSaaS"
                />
              </div>

              <div>
                <p className="text-sm text-gray-400 mb-2">
                  Support Email
                </p>

                <input
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none"
                  defaultValue="support@store.com"
                />
              </div>

            </div>
          </div>

          <div className="card p-6">
            <h2 className="font-semibold text-lg mb-4">
              Preferences
            </h2>

            <div className="space-y-5">

              <div className="flex items-center justify-between">
                <p>Email Notifications</p>

                <div className="w-12 h-6 bg-purple-600 rounded-full relative">
                  <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <p>Dark Mode</p>

                <div className="w-12 h-6 bg-purple-600 rounded-full relative">
                  <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </PageTransition>
  );
}