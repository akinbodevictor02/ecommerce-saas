"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import PageTransition from "@/components/PageTransition";
import { formatPrice } from "@/lib/formatPrice";

export default function HomePage() {
  return (
    <div className="bg-[#05060a] text-white overflow-hidden">
      <PageTransition>
      {/* ================= HERO ================= */}
      <section className="relative min-h-screen flex items-center justify-center px-6">

        {/* 🔥 BACKGROUND GLOW */}
        <div className="absolute inset-0">
          <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-purple-600 opacity-20 blur-[200px] rounded-full" />
          <div className="absolute bottom-[-100px] right-1/3 w-[600px] h-[600px] bg-blue-500 opacity-20 blur-[200px] rounded-full" />
        </div>

        <div className="relative max-w-7xl w-full grid md:grid-cols-2 gap-12 items-center">

          {/* ================= LEFT TEXT ================= */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* BADGE */}
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full text-sm mb-6 backdrop-blur">
                ⭐ All-in-one Ecommerce Platform
              </div>

              {/* HEADLINE */}
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Build. Sell. Scale.
                <br />
                <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
                  Your Ecommerce SaaS
                </span>
              </h1>

              {/* DESCRIPTION */}
              <p className="mt-6 text-gray-400 text-lg max-w-lg">
                Launch your store, accept payments, track analytics,
                and scale your business — all in one powerful platform.
              </p>

              {/* CTA */}
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="/products"
                  className="bg-gradient-to-r from-purple-500 to-blue-500 px-6 py-3 rounded-xl font-medium hover:opacity-90 transition"
                >
                  Start Free Trial →
                </a>

                <a
                  href="/dashboard"
                  className="border border-white/20 px-6 py-3 rounded-xl hover:bg-white/10 transition"
                >
                  View Dashboard
                </a>
              </div>

              {/* FEATURES */}
              <div className="mt-10 flex flex-wrap gap-6 text-sm text-gray-400">
                <span>🔒 Secure Payments</span>
                <span>📊 Analytics</span>
                <span>📦 Order Management</span>
              </div>
            </motion.div>
          </div>

          {/* ================= RIGHT MOCKUP ================= */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl shadow-2xl p-6">

              {/* TOP BAR */}
              <div className="flex justify-between items-center mb-6">
                <div className="font-semibold">EcomSaaS</div>
                <div className="text-sm text-gray-400">Admin</div>
              </div>

              {/* CARDS */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/10 p-4 rounded-xl">
                  <p className="text-gray-400 text-sm">Revenue</p>
                  <h3 className="text-xl font-bold">$2.4M</h3>
                </div>

                <div className="bg-white/10 p-4 rounded-xl">
                  <p className="text-gray-400 text-sm">Orders</p>
                  <h3 className="text-xl font-bold">1,245</h3>
                </div>
              </div>

              {/* CHART PLACEHOLDER */}
              <div className="h-32 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-xl" />

              {/* TABLE */}
              <div className="mt-6 space-y-2 text-sm">
                <div className="flex justify-between text-gray-400">
                  <span>$ORD-001</span>
                  <span>$36,500</span>
                </div>

                <div className="flex justify-between text-gray-400">
                  <span>$ORD-002</span>
                  <span>$15,000</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="py-20 bg-gray-50 text-black">
        <Container>
          <div className="grid md:grid-cols-3 gap-8">
            {["Payments", "Orders", "Analytics"].map((f, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -6 }}
                className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-lg transition"
              >
                <h3 className="font-bold text-lg">{f}</h3>
                <p className="text-gray-600 mt-2">
                  Premium experience for {f.toLowerCase()}.
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ================= IMAGE SHOWCASE ================= */}
      <section className="py-24">
        <Container>
          <motion.img
            src="/images/dashboard.png"
            className="rounded-2xl shadow-2xl"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
          />
        </Container>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="py-20 bg-white text-black">
        <div className="max-w-6xl mx-auto px-6 text-center">

          <h2 className="text-3xl font-bold mb-12">
            Loved by Store Owners
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "David",
                text: "This platform helped me launch my store in days. Payments and analytics are seamless.",
              },
              {
                name: "Sarah",
                text: "The dashboard feels like Shopify. Everything just works beautifully.",
              },
              {
                name: "Michael",
                text: "Tracking orders and revenue has never been this easy. Highly recommended.",
              },
            ].map((t, i) => (
              <div
                key={i}
                className="p-6 bg-gray-50 rounded-2xl shadow-sm hover:shadow-md transition"
              >
                <p className="text-gray-600 mb-4">
                  “{t.text}”
                </p>

                <h4 className="font-semibold">
                  {t.name}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-24 text-center">
        <Container>
          <h2 className="text-3xl font-bold">
            Ready to scale your store?
          </h2>

          <a
            href="/products"
            className="inline-block mt-6 bg-white text-black px-8 py-3 rounded-xl hover:bg-gray-200 transition"
          >
            Browse Products
          </a>
        </Container>
      </section>
      </PageTransition>
    </div>
  );
}