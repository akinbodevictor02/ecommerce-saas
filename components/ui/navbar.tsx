"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import { useCart } from "@/lib/cart";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const items = useCart((state) => state.items);

  // 🔥 Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogin = () => {
    signIn("credentials", {
      email: "admin@test.com",
      password: "password",
      callbackUrl: "/dashboard",
    });
  };

  const navLink = (href: string, label: string) => {
    const active = pathname === href;

    return (
      <button
        onClick={() => router.push(href)}
        className={`relative text-sm transition ${
          active
            ? "text-white font-semibold"
            : "text-gray-400 hover:text-white"
        }`}
      >
        {label}
        {active && (
          <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-purple-500 rounded" />
        )}
      </button>
    );
  };

  return (
    <nav className="fixed top-0 w-full z-50 px-6 py-4">
      <div
        className={`max-w-7xl mx-auto flex items-center justify-between rounded-2xl px-6 py-3 transition ${
          scrolled ? "glass shadow-lg" : "bg-transparent"
        }`}
      >
        {/* LOGO */}
        <h1
          onClick={() => router.push("/")}
          className="font-bold text-lg cursor-pointer gradient-text"
        >
          EcomSaaS
        </h1>

        {/* DESKTOP */}
        <div className="hidden md:flex items-center gap-6">

          {navLink("/products", "Products")}
          {navLink("/dashboard", "Dashboard")}
          {navLink("/admin", "Admin")}
          {navLink("/orders", "Orders")}

          {/* CART */}
          <button
            onClick={() => router.push("/cart")}
            className="relative text-lg"
          >
            🛒
            {items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs px-2 py-0.5 rounded-full">
                {items.length}
              </span>
            )}
          </button>

          {/* AUTH */}
          {!session ? (
            <button
              onClick={handleLogin}
              className="btn-secondary"
            >
              Login
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-semibold">
                {session.user?.name?.[0] || "U"}
              </div>

              <div className="relative group">
                <button className="text-sm text-gray-400 hover:text-white">
                  {session.user?.name}
                </button>

                <div className="absolute right-0 mt-2 w-44 glass rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition pointer-events-none group-hover:pointer-events-auto">
                  <button
                    onClick={() => router.push("/dashboard")}
                    className="block w-full text-left px-4 py-2 hover:bg-white/10"
                  >
                    Dashboard
                  </button>

                  <button
                    onClick={() => signOut()}
                    className="block w-full text-left px-4 py-2 hover:bg-white/10"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* CTA */}
          <button
            onClick={() => router.push("/products")}
            className="btn-primary"
          >
            Get Started
          </button>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-2xl text-white"
          onClick={() => setOpen(true)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE DRAWER */}
      {open && (
        <div className="fixed inset-0 bg-black/60 z-50">
          <div className="absolute right-0 top-0 h-full w-72 glass p-6 flex flex-col gap-5 shadow-2xl">

            <button
              onClick={() => setOpen(false)}
              className="text-right text-xl"
            >
              ✕
            </button>

            {["/products", "/dashboard", "/admin", "/orders"].map(
              (link) => (
                <button
                  key={link}
                  onClick={() => {
                    router.push(link);
                    setOpen(false);
                  }}
                  className="text-left text-lg hover:text-purple-400 transition"
                >
                  {link.replace("/", "") || "home"}
                </button>
              )
            )}

            <button
              onClick={() => {
                router.push("/cart");
                setOpen(false);
              }}
            >
              Cart ({items.length})
            </button>

            {!session ? (
              <button
                onClick={handleLogin}
                className="btn-secondary"
              >
                Login
              </button>
            ) : (
              <button
                onClick={() => signOut()}
                className="btn-secondary"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}