"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import PageTransition from "@/components/PageTransition";
import { formatPrice } from "@/lib/formatPrice";

export default function AdminProductsPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [products, setProducts] = useState<any[]>([]);

  // =============================


  // FETCH PRODUCTS
  // =============================
  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();

    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // =============================
  // IMAGE UPLOAD
  // =============================
  const handleImageUpload = async (e: any) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setUploading(true);

    try {
      const formData = new FormData();

      formData.append("file", file);

      // ✅ CLOUDINARY PRESET
      formData.append(
        "upload_preset",
        "unsigned_upload"
      );

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dvjedgoqv/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      console.log(data);

      if (data.secure_url) {
        setImages((prev) => [
          ...prev,
          data.secure_url,
        ]);

        toast.success("Image uploaded!");
      } else {
        toast.error("Upload failed");
      }
    } catch (err) {
      console.log(err);

      toast.error("Something went wrong");
    } finally {
      setUploading(false);
    }
  };

  // =============================
  // CREATE PRODUCT
  // =============================
  const handleCreate = async () => {
    if (!name || !price) {
      toast.error("Fill all fields");

      return;
    }

    if (images.length === 0) {
      toast.error("Upload at least one image");

      return;
    }

    await fetch("/api/products", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name,
        price: parseFloat(price),
        images,
      }),
    });

    toast.success("Product created!");

    setName("");
    setPrice("");
    setImages([]);

    fetchProducts();
  };

  // =============================
  // DELETE PRODUCT
  // =============================
  const handleDelete = async (id: string) => {
    await fetch("/api/products/delete", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ id }),
    });

    toast.success("Product deleted");

    fetchProducts();
  };

  return (
    <PageTransition>
      <div className="space-y-10">

        {/* CREATE PRODUCT */}
        <div className="card p-8 max-w-2xl">
          <h1 className="text-2xl font-bold mb-6">
            Create Product
          </h1>

          {/* NAME */}
          <input
            className="w-full mb-4 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none"
            placeholder="Product name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

          {/* PRICE */}
          <input
            className="w-full mb-4 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none"
            placeholder="Price"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value)
            }
          />

          {/* IMAGE */}
          <div className="mb-5">
            <input
              type="file"
              onChange={handleImageUpload}
              className="text-sm text-gray-300"
            />

            {uploading && (
              <p className="text-sm text-purple-400 mt-2">
                Uploading image...
              </p>
            )}
          </div>

          {/* PREVIEW */}
          <div className="flex gap-3 flex-wrap mb-6">
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt=""
                className="w-24 h-24 object-cover rounded-xl border border-white/10"
              />
            ))}
          </div>

          {/* BUTTON */}
          <button
            onClick={handleCreate}
            className="btn-primary"
          >
            Create Product
          </button>
        </div>

        {/* PRODUCTS LIST */}
        <div>
          <h2 className="text-2xl font-bold mb-6">
            Uploaded Products
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            {products.map((product) => {
              let imgs: string[] = [];

              try {
                imgs = JSON.parse(product.images || "[]");
              } catch {
                imgs = [];
              }

              return (
                <div
                  key={product.id}
                  className="card p-5"
                >
                  {/* IMAGE */}
                  <img
                    src={
                      imgs[0] || "/placeholder.png"
                    }
                    alt=""
                    className="w-full h-52 object-cover rounded-2xl mb-4"
                  />

                  {/* INFO */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">
                        {product.name}
                      </h3>

                      <p className="text-gray-400 text-sm">
                        {formatPrice(product.price)}
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        handleDelete(product.id)
                      }
                      className="bg-red-500 hover:bg-red-600 transition px-4 py-2 rounded-xl text-white text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}

          </div>
        </div>

      </div>
    </PageTransition>
  );
}