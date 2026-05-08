"use client";

import { useState } from "react";

export default function ProductGallery({ images }: { images: string[] }) {
  const [selected, setSelected] = useState(images[0]);

  return (
    <div>
      {/* MAIN IMAGE */}
      <img
        src={selected}
        className="w-full h-80 object-cover rounded-lg mb-4"
      />

      {/* THUMBNAILS */}
      <div className="flex gap-2">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            onClick={() => setSelected(img)}
            className={`w-20 h-20 object-cover rounded border cursor-pointer ${
              selected === img
                ? "border-black"
                : "border-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}