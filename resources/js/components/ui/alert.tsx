import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "group/alert relative grid w-full gap-0.5 sera:gap-1 rounded-lg lyra:rounded-none luma:rounded-2xl sera:rounded-none rhea:rounded-2xl border px-4 nova:px-2.5 lyra:px-2.5 mira:px-2 py-3 nova:py-2 lyra:py-2 mira:py-1.5 text-left text-sm lyra:text-xs mira:text-xs/relaxed sera:after:absolute sera:after:-inset-y-px sera:after:-left-px sera:after:w-0.5 has-data-[slot=alert-action]:relative has-data-[slot=alert-action]:pr-18 has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2.5 nova:has-[>svg]:gap-x-2 lyra:has-[>svg]:gap-x-2 mira:has-[>svg]:gap-x-1.5 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 lyra:*:[svg]:translate-y-0 *:[svg]:text-current *:[svg:not([class*='size-'])]:size-4 mira:*:[svg:not([class*='size-'])]:size-3.5",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground sera:after:bg-foreground",
        destructive:
          "bg-card text-destructive sera:after:bg-destructive *:data-[slot=alert-description]:text-destructive/90 *:[svg]:text-current",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "font-medium sera:text-sm sera:font-semibold group-has-[>svg]/alert:col-start-2 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground",
        className
      )}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-sm lyra:text-xs/relaxed mira:text-xs/relaxed text-balance text-muted-foreground md:text-pretty [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4 lyra:[&_p:not(:last-child)]:mb-2",
        className
      )}
      {...props}
    />
  )
}

function AlertAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-action"
      className={cn("absolute top-2.5 nova:top-2 lyra:top-[calc(--spacing(1.25))] mira:top-1.5 right-3 nova:right-2 lyra:right-[calc(--spacing(1.25))] mira:right-2", className)}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription, AlertAction }
