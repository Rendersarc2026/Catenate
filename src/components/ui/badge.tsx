import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center text-xs transition-colors",
  {
    variants: {
      variant: {
        default:
          "bg-[#1B2A7A]/[0.07] text-[#1B2A7A] uppercase tracking-wider font-semibold rounded-full px-3 py-1 text-[11px]",
        eyebrow:
          "text-[11px] font-medium uppercase tracking-[0.18em] opacity-70 mb-4 block",
        eyebrowLight:
          "text-[11px] font-medium uppercase tracking-[0.18em] text-white/75 mb-4 block",
        numberBadge:
          "w-8 h-8 rounded-full border border-white/25 flex items-center justify-center text-xs font-medium font-mono text-white flex-none",
        numberBadgeDark:
          "w-8 h-8 rounded-full border border-[#1A1D2E]/15 flex items-center justify-center text-xs font-medium font-mono text-[#767C93] flex-none",
        tag:
          "text-[11px] uppercase tracking-wider font-medium text-[#1B2A7A] bg-[#1B2A7A]/[0.08] px-3 py-1 rounded-full whitespace-nowrap",
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
