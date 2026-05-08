import * as React from "react";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = React.forwardRef<
  HTMLButtonElement,
  ButtonProps
>(({ className = "", ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={`
        bg-black text-white px-4 py-2 rounded-lg
        hover:bg-gray-800
        active:scale-95
        transition-all duration-150
        cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      {...props}
    />
  );
});

Button.displayName = "Button";