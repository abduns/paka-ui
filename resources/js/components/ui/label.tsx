import * as React from "react"

import { cn } from "@/lib/utils"

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 lyra:text-xs lyra:font-normal mira:text-xs sera:text-xs sera:leading-4 sera:font-semibold sera:tracking-wide sera:uppercase sera:peer-data-[slot=checkbox]:text-sm sera:peer-data-[slot=checkbox]:leading-5 sera:peer-data-[slot=checkbox]:font-normal sera:peer-data-[slot=checkbox]:tracking-normal sera:peer-data-[slot=checkbox]:normal-case sera:peer-data-[slot=radio-group-item]:text-sm sera:peer-data-[slot=radio-group-item]:leading-5 sera:peer-data-[slot=radio-group-item]:font-normal sera:peer-data-[slot=radio-group-item]:tracking-normal sera:peer-data-[slot=radio-group-item]:normal-case sera:peer-data-[slot=switch]:text-sm sera:peer-data-[slot=switch]:leading-5 sera:peer-data-[slot=switch]:font-normal sera:peer-data-[slot=switch]:tracking-normal sera:peer-data-[slot=switch]:normal-case",
        className
      )}
      {...props}
    />
  )
}

export { Label }
