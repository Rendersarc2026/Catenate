"use client"

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { XIcon } from "lucide-react"
import * as React from "react"

import { cn } from "@/lib/utils"

function Dialog({ ...props }: DialogPrimitive.Root.Props) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger({ ...props }: DialogPrimitive.Trigger.Props) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogClose({ ...props }: DialogPrimitive.Close.Props) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogPortal({ ...props }: DialogPrimitive.Portal.Props) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogOverlay({ className, ...props }: DialogPrimitive.Backdrop.Props) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-overlay"
      className={cn(
        "fixed inset-0 z-[290] bg-[rgb(10_16_46/0.58)] backdrop-blur-[6px] transition-opacity duration-500 ease-expo data-ending-style:opacity-0 data-starting-style:opacity-0",
        className
      )}
      {...props}
    />
  )
}

/**
 * A centred panel that pops and expands into place — it starts small and low,
 * then swells past its size for a beat before settling.
 *
 * Centring is done by the grid wrapper rather than a transform, which leaves
 * `scale` and `translate` free for the animation to own.
 */
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: DialogPrimitive.Popup.Props & { showCloseButton?: boolean }) {
  /* Opens with the panel itself focused, so no control wears a stray ring. */
  const panelRef = React.useRef<HTMLDivElement>(null)

  return (
    <DialogPortal>
      <DialogOverlay />
      <div className="pointer-events-none fixed inset-0 z-[300] grid place-items-center p-4">
        <DialogPrimitive.Popup
          ref={panelRef}
          tabIndex={-1}
          initialFocus={panelRef}
          data-slot="dialog-content"
          className={cn(
            "pointer-events-auto outline-none bg-clip-padding text-sm text-popover-foreground shadow-[0_50px_140px_-20px_rgb(8_14_44/0.5),0_0_0_1px_rgb(255_255_255/0.6)] transition-[opacity,scale,translate] duration-[620ms] ease-[cubic-bezier(0.22,1.24,0.36,1)] will-change-transform",
            "data-starting-style:translate-y-7 data-starting-style:scale-[0.84] data-starting-style:opacity-0",
            "data-ending-style:translate-y-3 data-ending-style:scale-[0.94] data-ending-style:opacity-0",
            className
          )}
          {...props}
        >
          {children}
          {showCloseButton && (
            <DialogPrimitive.Close
              data-slot="dialog-close"
              className="absolute top-5 right-5 z-2 grid size-9.5 place-items-center rounded-full bg-white/85 text-ink shadow-[0_2px_12px_rgb(12_20_60/0.18)] backdrop-blur-md transition-[background-color,transform] duration-300 ease-expo hover:scale-105 hover:bg-white"
            >
              <XIcon className="size-4" />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          )}
        </DialogPrimitive.Popup>
      </div>
    </DialogPortal>
  )
}

function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("font-heading text-base font-medium text-foreground", className)}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: DialogPrimitive.Description.Props) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
