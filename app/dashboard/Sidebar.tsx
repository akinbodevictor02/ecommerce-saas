"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  BarChart3,
  Megaphone,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    {
      name: "Overview",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Orders",
      href: "/admin/orders",
      icon: ShoppingCart,
    },
    {
      name: "Products",
      href: "/admin/products",
      icon: Package,
    },
    {
      name: "Customers",
      href: "/dashboard/customers",
      icon: Users,
    },
    {
      name: "Analytics",
      href: "/dashboard/analytics",
      icon: BarChart3,
    },
    {
      name: "Marketing",
      href: "/dashboard/marketing",
      icon: Megaphone,
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ];

  return (
    <aside
      className={`${
        collapsed ? "w-20" : "w-[260px]"
      } transition-all duration-300 flex flex-col border-r border-white/10 bg-black/20 backdrop-blur-xl`}
    >
      {/* LOGO */}
      <div className="p-6 font-bold text-lg border-b border-white/10 flex items-center justify-between">
        {!collapsed && (
          <span className="gradient-text">
            EcomSaaS
          </span>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-400 hover:text-white transition"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* NAV */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item, i) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <button
              key={i}
              onClick={() => (window.location.href = item.href)}
              className={`group relative w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                active
                  ? "bg-white/10 text-white shadow-inner"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              {/* ACTIVE INDICATOR */}
              {active && (
                <span className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-purple-500 to-blue-500 rounded-r" />
              )}

              {/* ICON */}
              <Icon
                size={18}
                className={`transition ${
                  active
                    ? "text-white"
                    : "text-gray-400 group-hover:text-white"
                }`}
              />

              {/* TEXT */}
              {!collapsed && (
                <span className="text-sm font-medium">
                  {item.name}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* FOOTER */}
      <div className="p-4 border-t border-white/10 text-xs text-gray-500">
        {!collapsed && "© 2026 EcomSaaS"}
      </div>
    </aside>
  );
}