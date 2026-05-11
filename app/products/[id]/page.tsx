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

  // ✅ SAFE IMAGE PARSE
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

  // ✅ PRODUCT WITH PARSED IMAGES
  const parsedProduct = {
    ...product,
    images,
  };

  return (
    <div className="min-h-screen bg-glow px-4 py-10">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10">

        {/* TRACK VIEW */}
        <TrackView productId={product.id} />

        {/* IMAGE SECTION */}
        <div className="card p-5">

          <ProductGallery images={images} />

          {/* THUMBNAILS */}
          <div className="flex gap-3 mt-4 flex-wrap">
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt=""
                className="w-20 h-20 object-cover rounded-xl border border-white/10"
              />
            ))}
          </div>

        </div>

        {/* DETAILS */}
        <div className="card p-8 flex flex-col justify-center">

          <p className="text-sm uppercase tracking-widest text-purple-400 mb-3">
            Premium Collection
          </p>

          <h1 className="text-4xl font-bold text-white leading-tight">
            {product.name}
          </h1>

          <p className="text-3xl font-bold mt-6 text-white">
            {formatPrice(product.price)}
          </p>

          {/* DESCRIPTION */}
          <p className="text-gray-400 mt-6 leading-8 text-base">
            {product.description ||
              "Experience premium quality and modern design crafted for performance, comfort, and everyday lifestyle use."}
          </p>

          {/* BUTTON */}
          <div className="mt-8">
            <AddToCartButton
              product={parsedProduct}
            />
          </div>

          {/* FEATURES */}
          <div className="grid grid-cols-2 gap-4 mt-10">

            <div className="glass p-4 rounded-2xl">
              <p className="text-sm text-gray-400">
                Shipping
              </p>

              <h3 className="font-semibold text-white mt-1">
                Worldwide Delivery
              </h3>
            </div>

            <div className="glass p-4 rounded-2xl">
              <p className="text-sm text-gray-400">
                Warranty
              </p>

              <h3 className="font-semibold text-white mt-1">
                1 Year Coverage
              </h3>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}