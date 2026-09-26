import * as React from "react"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { Cancel01Icon } from "@hugeicons/core-free-icons"

function Dialog({ ...props }: DialogPrimitive.Root.Props) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger({ ...props }: DialogPrimitive.Trigger.Props) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({ ...props }: DialogPrimitive.Portal.Props) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({ ...props }: DialogPrimitive.Close.Props) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogOverlay({
  className,
  ...props
}: DialogPrimitive.Backdrop.Props) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-overlay"
      className={cn(
        "fixed inset-0 isolate z-50 bg-black/10 maia:bg-black/80 mira:bg-black/80 luma:bg-black/30 sera:bg-black/20 rhea:bg-black/30 duration-100 supports-backdrop-filter:backdrop-blur-xs luma:supports-backdrop-filter:backdrop-blur-sm sera:supports-backdrop-filter:backdrop-blur-sm rhea:supports-backdrop-filter:backdrop-blur-sm data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
        className
      )}
      {...props}
    />
  )
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: DialogPrimitive.Popup.Props & {
  showCloseButton?: boolean
}) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Popup
        data-slot="dialog-content"
        className={cn(
          "fixed top-1/2 left-1/2 z-50 grid w-96 max-w-[calc(100%-2rem)] vega:w-md maia:w-md luma:w-md sera:w-md rhea:w-md -translate-x-1/2 -translate-y-1/2 gap-6 nova:gap-4 lyra:gap-4 mira:gap-4 rounded-xl maia:rounded-4xl lyra:rounded-none luma:rounded-4xl sera:rounded-none rhea:rounded-[min(var(--radius-4xl),24px)] bg-popover p-6 nova:p-4 lyra:p-4 mira:p-4 text-sm lyra:text-xs/relaxed mira:text-xs/relaxed text-popover-foreground luma:shadow-xl sera:shadow-md rhea:shadow-xl ring-1 ring-foreground/10 maia:ring-foreground/5 luma:ring-foreground/5 luma:dark:ring-foreground/10 rhea:ring-foreground/5 rhea:dark:ring-foreground/10 duration-100 outline-none data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            render={
              <Button
                variant="ghost"
                className="absolute top-4 right-4 nova:top-2 nova:right-2 lyra:top-2 lyra:right-2 mira:top-2 mira:right-2 sera:top-5 sera:right-5 luma:bg-secondary sera:bg-secondary rhea:bg-secondary"
                size="icon-sm"
              />
            }
          >
            <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Popup>
    </DialogPortal>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2 lyra:gap-1 lyra:text-left mira:gap-1 luma:gap-1.5 rhea:gap-1.5", className)}
      {...props}
    />
  )
}

function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  showCloseButton?: boolean
}) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end nova:-mx-4 nova:-mb-4 nova:rounded-b-xl nova:border-t nova:bg-muted/50 nova:p-4",
        className
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close render={<Button variant="outline" />}>
          Close
        </DialogPrimitive.Close>
      )}
    </div>
  )
}

function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("font-heading nova:text-base maia:text-base lyra:text-sm mira:text-sm luma:text-base sera:text-lg rhea:text-base leading-none font-medium sera:font-semibold sera:tracking-wider sera:uppercase", className)}
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
      className={cn(
        "text-sm lyra:text-xs/relaxed mira:text-xs/relaxed sera:mt-0.5 sera:leading-relaxed text-muted-foreground *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
        className
      )}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
