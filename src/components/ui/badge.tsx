import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-dark-hover border border-dark-border text-surface-300",
        brand: "bg-brand-600/20 text-brand-400 border border-brand-600/30",
        accent: "bg-accent-600/20 text-accent-400 border border-accent-600/30",
        success: "bg-green-600/20 text-green-400 border border-green-600/30",
        warning: "bg-yellow-600/20 text-yellow-400 border border-yellow-600/30",
        danger: "bg-red-600/20 text-red-400 border border-red-600/30",
        outline: "border border-dark-border text-surface-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
