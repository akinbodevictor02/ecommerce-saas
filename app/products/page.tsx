"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/ui/container";
import AnimatedWrapper from "@/components/AnimatedWrapper";
import PageTransition from "@/components/PageTransition";
import { formatPrice } from "@/lib/formatPrice";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  return (
  <PageTransition>
    <AnimatedWrapper>
  <Container>

    {/* HEADER */}
    <div className="mb-10">
      <h1 className="text-4xl font-bold tracking-tight">
        Discover Products
      </h1>
      <p className="text-gray-500 mt-2">
        Explore premium items curated for you
      </p>
    </div>

    {/* GRID */}
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">

      {/* LOADING */}
      {loading &&
        Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-64 rounded-2xl bg-gradient-to-br from-gray-200 to-gray-100 animate-pulse"
          />
        ))}

      {/* PRODUCTS */}
      {!loading &&
        products.map((p) => {
          console.log(p);

          let imgs: string[] = [];
          
          try {
            imgs = JSON.parse(p.images || "[]");
          } catch {}

          return (
            <div
              key={p.id}
              onClick={() => router.push(`/products/${p.id}`)}
              className="group relative overflow-hidden rounded-2xl bg-white border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              {/* IMAGE */}
              <div className="overflow-hidden bg-black/20">
                <img
  src={
  imgs?.[0]
    ? imgs[0]
    : "https://images.unsplash.com/photo-1523275335684-37898b6baf30"
}
  alt={p.name}
  className="w-full h-52 object-cover group-hover:scale-105 transition duration-300"
/>
              </div>

              {/* INFO */}
              <div className="p-4">
                <h2 className="font-semibold text-lg text-transition">
                  {p.name}
                </h2>

                <p className="text-white font-bold mt-2 text-lg">
                  Premium product
                </p>

                <p className="mt-3 text-xl font-bold">
                  {formatPrice(p.price)}
                </p>
              </div>

              {/* HOVER OVERLAY */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition" />
            </div>
          );
        })}
    </div>

    </Container>
  </AnimatedWrapper>
</PageTransition>
  );
}