import * as React from "react"

import { cn } from "@/lib/utils"

function Card({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"div"> & { size?: "default" | "sm" }) {
  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn(
        "group/card flex flex-col gap-(--card-spacing) overflow-hidden rounded-xl bg-card py-(--card-spacing) text-sm text-card-foreground ring-1 ring-foreground/10 [--card-spacing:--spacing(4)] has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(3)] data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl vega:shadow-xs vega:[--card-spacing:--spacing(6)] vega:has-data-[slot=card-footer]:pb-(--card-spacing) vega:data-[size=sm]:[--card-spacing:--spacing(4)] vega:data-[size=sm]:has-data-[slot=card-footer]:pb-(--card-spacing) maia:rounded-2xl maia:[--card-spacing:--spacing(6)] maia:has-data-[slot=card-footer]:pb-(--card-spacing) maia:data-[size=sm]:[--card-spacing:--spacing(4)] maia:data-[size=sm]:has-data-[slot=card-footer]:pb-(--card-spacing) lyra:rounded-none lyra:text-xs/relaxed lyra:*:[img:first-child]:rounded-none lyra:*:[img:last-child]:rounded-none mira:rounded-lg mira:text-xs/relaxed mira:has-data-[slot=card-footer]:pb-(--card-spacing) mira:data-[size=sm]:has-data-[slot=card-footer]:pb-(--card-spacing) mira:*:[img:first-child]:rounded-t-lg mira:*:[img:last-child]:rounded-b-lg luma:rounded-4xl luma:shadow-md luma:ring-foreground/5 luma:[--card-spacing:--spacing(6)] luma:has-data-[slot=card-footer]:pb-(--card-spacing) luma:data-[size=sm]:[--card-spacing:--spacing(4)] luma:data-[size=sm]:has-data-[slot=card-footer]:pb-(--card-spacing) luma:dark:ring-foreground/10 luma:*:[img:first-child]:rounded-t-4xl luma:*:[img:last-child]:rounded-b-4xl sera:rounded-none sera:shadow-sm sera:ring-foreground/5 sera:[--card-spacing:--spacing(8)] sera:has-data-[slot=card-footer]:pb-(--card-spacing) sera:data-[size=sm]:[--card-spacing:--spacing(5)] sera:data-[size=sm]:has-data-[slot=card-footer]:pb-(--card-spacing) sera:*:[img:first-child]:rounded-none sera:*:[img:last-child]:rounded-none rhea:rounded-[min(var(--radius-4xl),24px)] rhea:shadow-sm rhea:ring-foreground/5 rhea:[--card-spacing:--spacing(5)] rhea:has-data-[slot=card-footer]:pb-(--card-spacing) rhea:data-[size=sm]:[--card-spacing:--spacing(4)] rhea:data-[size=sm]:has-data-[slot=card-footer]:pb-(--card-spacing) rhea:dark:ring-foreground/10 rhea:*:[img:first-child]:rounded-t-[min(var(--radius-4xl),24px)] rhea:*:[img:last-child]:rounded-b-[min(var(--radius-4xl),24px)]",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing) maia:gap-2 lyra:rounded-none mira:rounded-t-lg luma:gap-1.5 luma:rounded-t-4xl sera:gap-1.5 sera:rounded-none rhea:gap-1.5 rhea:rounded-t-[min(var(--radius-4xl),24px)]",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "font-heading text-base leading-snug font-medium group-data-[size=sm]/card:text-sm vega:leading-normal maia:leading-normal maia:group-data-[size=sm]/card:text-base lyra:text-sm lyra:leading-5 mira:text-sm mira:leading-5 luma:leading-normal luma:group-data-[size=sm]/card:text-base sera:text-lg sera:leading-7 sera:font-semibold sera:tracking-wider sera:uppercase rhea:leading-normal rhea:group-data-[size=sm]/card:text-base",
        className
      )}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm text-muted-foreground lyra:text-xs/relaxed mira:text-xs/relaxed sera:leading-relaxed", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-(--card-spacing)", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center rounded-b-xl border-t bg-muted/50 p-(--card-spacing) vega:border-t-0 vega:bg-transparent vega:py-0 maia:border-t-0 maia:bg-transparent maia:py-0 lyra:rounded-none lyra:bg-transparent mira:rounded-b-lg mira:border-t-0 mira:bg-transparent mira:py-0 luma:rounded-b-4xl luma:border-t-0 luma:bg-transparent luma:py-0 sera:rounded-none sera:border-t-0 sera:bg-transparent sera:py-0 rhea:rounded-b-[min(var(--radius-4xl),24px)] rhea:border-t-0 rhea:bg-transparent rhea:py-0",
        className
      )}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
