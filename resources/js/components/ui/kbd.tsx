import * as React from "react"

import { cn } from "@/lib/utils"

function Kbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        "pointer-events-none inline-flex h-5 luma:h-5.5 sera:h-5.5 w-fit min-w-5 luma:min-w-5.5 sera:min-w-5.5 items-center justify-center gap-1 rounded-sm lyra:rounded-none mira:rounded-xs luma:rounded-lg sera:rounded-none rhea:rounded-lg bg-muted luma:in-data-[slot=input-group]:bg-input sera:in-data-[slot=input-group]:bg-input rhea:in-data-[slot=input-group]:bg-input px-1 luma:px-1.5 sera:px-1.5 font-sans text-xs mira:text-[0.625rem] font-medium text-muted-foreground select-none in-data-[slot=tooltip-content]:bg-background/20 in-data-[slot=tooltip-content]:text-background dark:in-data-[slot=tooltip-content]:bg-background/10 [&_svg:not([class*='size-'])]:size-3",
        className
      )}
      {...props}
    />
  )
}

function KbdGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <kbd
      data-slot="kbd-group"
      className={cn("inline-flex items-center gap-1", className)}
      {...props}
    />
  )
}

export { Kbd, KbdGroup }
