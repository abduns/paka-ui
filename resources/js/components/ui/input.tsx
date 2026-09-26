import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-2.5 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-zinc-200 dark:focus-visible:ring-zinc-800 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 nova:h-8 nova:rounded-lg nova:shadow-none nova:file:h-6 nova:disabled:bg-input/50 nova:dark:disabled:bg-input/80 maia:rounded-4xl maia:bg-input/30 maia:px-3 maia:shadow-none lyra:h-8 lyra:rounded-none lyra:text-xs lyra:shadow-none lyra:file:h-6 lyra:file:text-xs lyra:focus-visible:ring-1 lyra:disabled:bg-input/50 lyra:aria-invalid:ring-1 lyra:md:text-xs lyra:dark:disabled:bg-input/80 mira:h-7 mira:bg-input/20 mira:px-2 mira:py-0.5 mira:text-sm mira:shadow-none mira:file:h-6 mira:file:text-xs/relaxed mira:focus-visible:ring-2 mira:aria-invalid:ring-2 mira:md:text-xs/relaxed luma:rounded-3xl luma:border-transparent luma:bg-input/50 luma:px-3 luma:shadow-none luma:focus-visible:border-ring luma:aria-invalid:border-destructive luma:dark:aria-invalid:border-destructive/50 sera:h-10 sera:rounded-none sera:border-transparent sera:border-b-input sera:px-0 sera:shadow-none sera:transition-[color,border-color] sera:focus-visible:border-transparent sera:focus-visible:border-b-ring sera:focus-visible:ring-0 sera:aria-invalid:border-transparent sera:aria-invalid:border-b-destructive sera:aria-invalid:ring-0 sera:dark:bg-transparent sera:dark:aria-invalid:border-transparent sera:dark:aria-invalid:border-b-destructive/50 rhea:h-8 rhea:rounded-2xl rhea:border-transparent rhea:bg-input/50 rhea:shadow-none rhea:duration-200 rhea:file:h-6 rhea:focus-visible:border-ring rhea:aria-invalid:border-destructive rhea:dark:aria-invalid:border-destructive/50",
        className
      )}
      {...props}
    />
  )
}

export { Input }
