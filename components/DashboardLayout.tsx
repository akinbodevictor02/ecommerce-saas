"use client";

import Sidebar from "@/app/dashboard/Sidebar";

export default function DashboardLayout({ children }: any) {
  return (
    <div className="flex min-h-screen bg-glow text-white">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col">

        {/* TOPBAR */}
        <header className="h-16 border-b border-white/10 flex items-center justify-between px-6">
          
          <h1 className="font-semibold text-lg">
            Dashboard
          </h1>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">
              Live Analytics
            </span>

            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-sm">
              A
            </div>
          </div>

        </header>

        {/* PAGE CONTENT */}
        <main className="p-6 md:p-10">
          {children}
        </main>

      </div>
    </div>
  );
}