import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import AddToCartButton from "./AddToCartButton";
import ProductGallery from "@/components/ProductGallery";
import TrackView from "./TrackView";
import { formatPrice } from "@/lib/formatPrice";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // ✅ FIX: await params
  const { id } = await params;

  if (!id) {
    return notFound();
  }

  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    return notFound();
  }

  let images: string[] = [];

try {
  if (Array.isArray(product.images)) {
    images = product.images;
  } else if (typeof product.images === "string") {
    images = JSON.parse(product.images || "[]");
  }
} catch (err) {
  console.log("IMAGE PARSE ERROR:", err);
  images = [];
}

  return (
    <div className="p-6 grid md:grid-cols-2 gap-8">

    {/* TRACK VIEW (SAFE) */}
    <TrackView productId={product.id} />
      
      {/* 🖼️ IMAGE SECTION */}
      <div>
        <ProductGallery images={images} />

        <div className="flex gap-2 mt-3">
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              className="w-20 h-20 object-cover rounded border"
            />
          ))}
        </div>
      </div>

      {/* 🛍️ DETAILS */}
      <div>
        <h1 className="text-2xl font-bold mb-2">
          {product.name}
        </h1>

        <p className="text-xl text-gray-700 mb-4">
          {formatPrice(product.price)}
        </p>

        <AddToCartButton product={product} />
      </div>
    </div>
  );
}