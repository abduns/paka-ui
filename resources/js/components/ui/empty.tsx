import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

function Empty({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty"
      className={cn(
        "flex w-full min-w-0 flex-1 flex-col items-center justify-center gap-4 rounded-lg nova:rounded-xl lyra:rounded-none mira:rounded-xl luma:rounded-2xl sera:rounded-none rhea:rounded-3xl border-dashed p-12 nova:p-6 lyra:p-6 mira:p-6 text-center text-balance",
        className
      )}
      {...props}
    />
  )
}

function EmptyHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-header"
      className={cn("flex max-w-sm flex-col items-center gap-2 mira:gap-1", className)}
      {...props}
    />
  )
}

const emptyMediaVariants = cva(
  "mb-2 flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "flex size-10 nova:size-8 lyra:size-8 mira:size-8 shrink-0 items-center justify-center rounded-lg lyra:rounded-none mira:rounded-md luma:rounded-xl sera:rounded-none rhea:rounded-xl bg-muted text-foreground [&_svg:not([class*='size-'])]:size-6 nova:[&_svg:not([class*='size-'])]:size-4 lyra:[&_svg:not([class*='size-'])]:size-4 mira:[&_svg:not([class*='size-'])]:size-4 luma:[&_svg:not([class*='size-'])]:size-5 sera:[&_svg:not([class*='size-'])]:size-5 rhea:[&_svg:not([class*='size-'])]:size-5",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function EmptyMedia({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof emptyMediaVariants>) {
  return (
    <div
      data-slot="empty-icon"
      data-variant={variant}
      className={cn(emptyMediaVariants({ variant, className }))}
      {...props}
    />
  )
}

function EmptyTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-title"
      className={cn(
        "font-heading text-lg nova:text-sm lyra:text-sm mira:text-sm font-medium sera:font-semibold tracking-tight lyra:tracking-normal sera:tracking-wider sera:uppercase",
        className
      )}
      {...props}
    />
  )
}

function EmptyDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <div
      data-slot="empty-description"
      className={cn(
        "text-sm/relaxed lyra:text-xs/relaxed mira:text-xs/relaxed sera:mt-0.5 text-muted-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
        className
      )}
      {...props}
    />
  )
}

function EmptyContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-content"
      className={cn(
        "flex w-full max-w-sm min-w-0 flex-col items-center gap-4 nova:gap-2.5 lyra:gap-2.5 mira:gap-2 text-sm lyra:text-xs mira:text-xs/relaxed text-balance",
        className
      )}
      {...props}
    />
  )
}

export {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  EmptyMedia,
}
