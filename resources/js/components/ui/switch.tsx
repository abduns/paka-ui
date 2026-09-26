import { Switch as SwitchPrimitive } from "@base-ui/react/switch"

import { cn } from "@/lib/utils"

function Switch({
  className,
  size = "default",
  ...props
}: SwitchPrimitive.Root.Props & {
  size?: "sm" | "default"
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        "peer group/switch relative inline-flex shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none group-has-[:focus-visible]/field-label:border-transparent group-has-[:focus-visible]/field-label:ring-0 after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-[size=default]:h-[18.4px] data-[size=default]:w-[32px] data-[size=sm]:h-[14px] data-[size=sm]:w-[24px] dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:bg-primary data-unchecked:bg-input dark:data-unchecked:bg-input/80 data-disabled:cursor-not-allowed data-disabled:opacity-50 nova:shadow-none maia:shadow-none lyra:shadow-none lyra:focus-visible:ring-1 lyra:aria-invalid:ring-1 mira:shadow-none mira:focus-visible:ring-2 mira:focus-visible:ring-ring/30 mira:aria-invalid:ring-2 mira:data-[size=default]:h-[16.6px] mira:data-[size=default]:w-[28px] luma:border-2 luma:shadow-none luma:focus-visible:ring-ring/30 luma:data-[size=default]:h-5 luma:data-[size=default]:w-11 luma:data-[size=sm]:h-4 luma:data-[size=sm]:w-7 luma:data-checked:border-primary luma:data-unchecked:bg-input/90 luma:dark:data-unchecked:bg-input/90 luma:group-has-[:focus-visible]/field-label:data-checked:border-primary sera:rounded-none sera:shadow-none sera:focus-visible:ring-2 sera:focus-visible:ring-ring/30 sera:aria-invalid:ring-2 sera:data-[size=default]:h-4.5 sera:data-[size=default]:w-8.25 sera:data-[size=sm]:h-3.5 sera:data-[size=sm]:w-6.25 sera:data-checked:border-primary sera:data-unchecked:border-input/50 sera:dark:data-unchecked:bg-input sera:group-has-[:focus-visible]/field-label:data-checked:border-primary sera:group-has-[:focus-visible]/field-label:data-unchecked:border-input/50 rhea:rounded-2xl rhea:border-2 rhea:shadow-none rhea:focus-visible:ring-ring/30 rhea:data-[size=default]:h-5 rhea:data-[size=default]:w-8 rhea:data-[size=sm]:h-4 rhea:data-[size=sm]:w-6 rhea:data-checked:border-primary rhea:data-unchecked:bg-input/90 rhea:dark:data-unchecked:bg-input/90 rhea:group-has-[:focus-visible]/field-label:data-checked:border-primary",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="pointer-events-none block rounded-full bg-background ring-0 transition-transform group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3 group-data-[size=default]/switch:data-checked:translate-x-[calc(100%-2px)] group-data-[size=sm]/switch:data-checked:translate-x-[calc(100%-2px)] dark:data-checked:bg-primary-foreground group-data-[size=default]/switch:data-unchecked:translate-x-0 group-data-[size=sm]/switch:data-unchecked:translate-x-0 dark:data-unchecked:bg-foreground mira:group-data-[size=default]/switch:size-3.5 luma:shadow-sm luma:not-dark:bg-clip-padding luma:group-data-[size=default]/switch:h-4 luma:group-data-[size=default]/switch:w-6 luma:group-data-[size=sm]/switch:h-3 luma:group-data-[size=sm]/switch:w-4 luma:group-data-[size=default]/switch:data-checked:translate-x-[calc(100%-8px)] luma:group-data-[size=sm]/switch:data-checked:translate-x-[calc(100%-8px)] sera:rounded-none sera:group-data-[size=default]/switch:size-3.5 sera:group-data-[size=sm]/switch:size-2.5 sera:group-data-[size=default]/switch:data-checked:translate-x-[calc(100%+2px)] sera:group-data-[size=sm]/switch:data-checked:translate-x-[calc(100%+2px)] sera:group-data-[size=default]/switch:data-unchecked:translate-x-0.25 sera:group-data-[size=sm]/switch:data-unchecked:translate-x-0.25 rhea:rounded-2xl rhea:shadow-sm rhea:not-dark:bg-clip-padding rhea:group-data-[size=default]/switch:data-checked:translate-x-[calc(100%-4px)] rhea:group-data-[size=sm]/switch:data-checked:translate-x-[calc(100%-4px)]"
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
