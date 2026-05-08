"use client";

export default function DashboardSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-12">
      <h2 className="text-xl font-semibold mb-4">
        {title}
      </h2>

      <div className="bg-white p-6 rounded-2xl shadow-sm">
        {children}
      </div>
    </div>
  );
}