import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2A7A] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-[#1B2A7A] text-white hover:bg-[#243494] shadow-sm",
        ghost:
          "bg-white text-[#1A1D2E] shadow-[inset_0_0_0_1px_rgba(26,29,46,0.12)] hover:bg-[#F7F8FB]",
        onBlue:
          "bg-white text-[#1B2A7A] hover:bg-[#EEF0FA] shadow-md",
        line:
          "bg-transparent text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.3)] hover:bg-white/10 hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.5)]",
        subtle:
          "bg-[#1B2A7A]/10 text-[#1B2A7A] hover:bg-[#1B2A7A]/15",
      },
      size: {
        default: "py-2.5 pl-6 pr-3 text-[15px]",
        sm: "py-2 pl-4 pr-2 text-xs",
        lg: "py-3.5 pl-7 pr-4 text-base",
        icon: "h-10 w-10 p-0 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  withArrowBadge?: boolean;
  badgeBg?: string;
  badgeStroke?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      children,
      withArrowBadge = true,
      badgeBg,
      badgeStroke,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
        {withArrowBadge && (
          <span
            className={cn(
              "w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 group-hover:rotate-45",
              variant === "default" && "bg-white/15 group-hover:bg-white/25 text-white",
              variant === "ghost" && "bg-[#1A1D2E]/[0.07] text-[#1A1D2E]",
              variant === "onBlue" && "bg-[#1B2A7A]/10 text-[#1B2A7A]",
              variant === "line" && "bg-white/15 text-white",
              variant === "subtle" && "bg-[#1B2A7A]/20 text-[#1B2A7A]",
              badgeBg
            )}
          >
            <ArrowRight className={cn("w-3.5 h-3.5", badgeStroke)} strokeWidth={2} />
          </span>
        )}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
