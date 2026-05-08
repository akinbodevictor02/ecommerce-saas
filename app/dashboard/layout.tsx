"use client";


export default function DashboardLayout({ children }: any) {
  return (
    <div className="flex min-h-screen bg-glow text-white">

      {/* SIDEBAR */}
      

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col">

        {/* TOPBAR */}
        <header className="h-16 border-b border-white/10 flex items-center justify-between px-6">
          <h1 className="font-semibold text-lg">
            Dashboard
          </h1>
        </header>

        {/* 🚨 THIS IS THE MOST IMPORTANT LINE */}
        <main className="p-6 md:p-10">
          {children}
        </main>

      </div>
    </div>
  );
}