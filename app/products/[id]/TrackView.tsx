"use client";

import { useEffect } from "react";

export default function TrackView({ productId }: { productId: string }) {
  useEffect(() => {
    fetch("/api/track", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "view",
        productId,
      }),
    });
  }, [productId]);

  return null;
}