import * as React from "react";
import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
  padded = true,
}: {
  children: React.ReactNode;
  className?: string;
  padded?: boolean;
}) {
  return (
    <div
      className={cn(
        "max-w-7xl mx-auto w-full",
        padded && "px-4 sm:px-6 lg:px-8 py-6",
        className
      )}
    >
      {children}
    </div>
  );
}