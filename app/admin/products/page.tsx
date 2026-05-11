"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import PageTransition from "@/components/PageTransition";
import { formatPrice } from "@/lib/formatPrice";

export default function AdminProductsPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [products, setProducts] = useState<any[]>([]);

  // =============================
  // FETCH PRODUCTS
  // =============================
  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");

      const data = await res.json();

      setProducts(data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch products");
    }
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
    if (!name || !price || !description) {
      toast.error("Fill all fields");

      return;
    }

    if (images.length === 0) {
      toast.error("Upload at least one image");

      return;
    }

    try {
      await fetch("/api/products", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name,
          description,
          price: parseFloat(price),
          images,
        }),
      });

      toast.success("Product created!");

      setName("");
      setDescription("");
      setPrice("");
      setImages([]);

      fetchProducts();
    } catch (err) {
      console.log(err);

      toast.error("Failed to create product");
    }
  };

  // =============================
  // DELETE PRODUCT
  // =============================
  const handleDelete = async (id: string) => {
    try {
      await fetch("/api/products/delete", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ id }),
      });

      toast.success("Product deleted");

      fetchProducts();
    } catch (err) {
      console.log(err);

      toast.error("Delete failed");
    }
  };

  return (
    <PageTransition>
      <div className="space-y-10">

        {/* CREATE PRODUCT */}
        <div className="card p-8 max-w-3xl">
          <h1 className="text-3xl font-bold mb-6 text-white">
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

          {/* DESCRIPTION */}
          <textarea
            className="w-full mb-4 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none min-h-[140px]"
            placeholder="Product description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
          />

          {/* PRICE */}
          <input
            type="number"
            className="w-full mb-4 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none"
            placeholder="Price in USD"
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
          <h2 className="text-3xl font-bold mb-6 text-white">
            Uploaded Products
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {products.map((product) => {
              let imgs: string[] = [];

              try {
                if (Array.isArray(product.images)) {
                  imgs = product.images;
                } else {
                  imgs = JSON.parse(
                    product.images || "[]"
                  );
                }
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
                      imgs?.[0] ||
                      "/placeholder.png"
                    }
                    alt={product.name}
                    className="w-full h-56 object-cover rounded-2xl mb-4"
                  />

                  {/* INFO */}
                  <div className="space-y-2">
                    <h3 className="font-semibold text-xl text-white">
                      {product.name}
                    </h3>

                    <p className="text-gray-400 text-sm line-clamp-3">
                      {product.description ||
                        "No description"}
                    </p>

                    <p className="text-lg font-bold text-white">
                      {formatPrice(product.price)}
                    </p>
                  </div>

                  {/* DELETE */}
                  <button
                    onClick={() =>
                      handleDelete(product.id)
                    }
                    className="mt-5 w-full bg-red-500 hover:bg-red-600 transition px-4 py-3 rounded-xl text-white text-sm"
                  >
                    Delete Product
                  </button>
                </div>
              );
            })}

          </div>
        </div>

      </div>
    </PageTransition>
  );
}