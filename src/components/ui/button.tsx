"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none text-sm",
  {
    variants: {
      variant: {
        primary:
          "bg-brand-600 text-white hover:bg-brand-500 active:bg-brand-700 shadow-lg shadow-brand-600/25",
        secondary:
          "bg-dark-card text-surface-200 border border-dark-border hover:bg-dark-hover hover:border-surface-500 active:bg-dark-surface",
        accent:
          "bg-accent-600 text-white hover:bg-accent-500 active:bg-accent-700 shadow-lg shadow-accent-600/25",
        danger:
          "bg-comic-red text-white hover:bg-red-500 active:bg-red-700",
        ghost:
          "text-surface-400 hover:text-surface-200 hover:bg-dark-card",
        outline:
          "border-2 border-brand-600 text-brand-400 hover:bg-brand-600 hover:text-white",
        comic:
          "bg-comic-yellow text-surface-900 font-bold border-3 border-surface-900 shadow-comic hover:shadow-comic-hover hover:translate-x-[-2px] hover:translate-y-[-2px] active:shadow-comic-sm active:translate-x-0 active:translate-y-0 rounded-xl font-comic tracking-wider",
        success:
          "bg-comic-green text-white hover:bg-green-500 active:bg-green-700",
        link: "text-brand-400 hover:text-brand-300 underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-base",
        xl: "h-14 px-8 text-lg",
        icon: "h-10 w-10",
        "icon-sm": "h-8 w-8",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      isLoading,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : leftIcon ? (
          leftIcon
        ) : null}
        {children}
        {rightIcon && !isLoading ? rightIcon : null}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
