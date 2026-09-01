import * as React from "react"

import { Button, type buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { VariantProps } from "class-variance-authority"

type ArrowButtonVariant = NonNullable<VariantProps<typeof buttonVariants>["variant"]>

/** Tint of the circular badge, paired to the button variant it sits inside. */
const badgeTone: Partial<Record<ArrowButtonVariant, string>> = {
  brand: "bg-white/15 text-white group-hover/button:bg-white/25",
  onBlue: "bg-blue/10 text-blue group-hover/button:bg-blue/20",
  line: "bg-white/15 text-white group-hover/button:bg-white/25",
  quiet:
    "text-ink shadow-[inset_0_0_0_1px_rgb(26_29_46/0.35)] group-hover/button:bg-ink/5",
}

type ArrowButtonProps = React.ComponentProps<typeof Button> & {
  /** Renders as an anchor when set. */
  href?: string
  /** Swaps the arrow for a downward glyph. */
  direction?: "right" | "down"
}

/**
 * The site's signature call to action: a pill with a trailing circular badge
 * that rotates 45° on hover.
 */
export function ArrowButton({
  href,
  children,
  className,
  variant = "brand",
  size = "pill",
  direction = "right",
  ...props
}: ArrowButtonProps) {
  const tone = badgeTone[variant as ArrowButtonVariant] ?? badgeTone.brand

  return (
    <Button
      variant={variant}
      size={size}
      className={cn("group/button", className)}
      {...(href ? { render: <a href={href} /> } : {})}
      {...props}
    >
      {children}
      <span
        aria-hidden="true"
        className={cn(
          "grid size-[30px] shrink-0 place-items-center rounded-full transition-[transform,background-color] duration-250 ease-expo group-hover/button:rotate-45",
          size === "pill-sm" && "size-7",
          tone
        )}
      >
        <svg
          viewBox="0 0 24 24"
          className="size-[13px] fill-none stroke-current stroke-[1.6]"
        >
          {direction === "down" ? (
            <path d="M12 5v14M6 13l6 6 6-6" />
          ) : (
            <path d="M5 12h14M13 6l6 6-6 6" />
          )}
        </svg>
      </span>
    </Button>
  )
}

/** The interlocking-links glyph used between partner wordmarks. */
export function ChainGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn(
        "size-4 shrink-0 fill-none stroke-current stroke-[1.5] opacity-30",
        className
      )}
    >
      <path d="M9.5 14.5a3.5 3.5 0 0 1 0-5l2-2a3.5 3.5 0 0 1 5 5l-.8.8" />
      <path d="M14.5 9.5a3.5 3.5 0 0 1 0 5l-2 2a3.5 3.5 0 0 1-5-5l.8-.8" />
    </svg>
  )
}
