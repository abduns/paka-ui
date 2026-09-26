import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox"

import { cn } from "@/lib/utils"
import { HugeiconsIcon } from "@hugeicons/react"
import { MinusSignIcon, Tick02Icon } from "@hugeicons/core-free-icons"

function Checkbox({
  className,
  indeterminate,
  ...props
}: CheckboxPrimitive.Root.Props) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      indeterminate={indeterminate}
      className={cn(
        "peer relative flex size-4 shrink-0 items-center justify-center rounded-[4px] border border-input shadow-xs transition-shadow outline-none group-has-disabled/field:opacity-50 group-has-[:focus-visible]/field-label:ring-0 group-has-[:focus-visible]/field-label:not-data-checked:border-input after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground data-indeterminate:border-primary data-indeterminate:bg-primary data-indeterminate:text-primary-foreground group-has-[:focus-visible]/field-label:data-checked:border-primary dark:data-checked:bg-primary nova:shadow-none maia:rounded-[6px] maia:shadow-none lyra:rounded-none lyra:shadow-none lyra:focus-visible:ring-1 lyra:aria-invalid:ring-1 mira:shadow-none mira:focus-visible:ring-2 mira:focus-visible:ring-ring/30 mira:aria-invalid:ring-2 luma:rounded-[5px] luma:border-transparent luma:bg-input/90 luma:shadow-none luma:focus-visible:border-ring luma:focus-visible:ring-ring/30 luma:aria-invalid:border-destructive luma:aria-invalid:aria-checked:border-primary luma:data-checked:border-primary luma:data-checked:bg-primary luma:data-indeterminate:border-primary luma:data-indeterminate:bg-primary luma:dark:aria-invalid:border-destructive/50 luma:group-has-[:focus-visible]/field-label:not-data-checked:border-transparent sera:size-4.5 sera:rounded-none sera:shadow-none sera:focus-visible:ring-2 sera:focus-visible:ring-ring/30 sera:aria-invalid:ring-2 sera:dark:bg-transparent sera:dark:data-checked:bg-primary sera:dark:data-indeterminate:bg-primary rhea:rounded-[5px] rhea:border-transparent rhea:bg-input/90 rhea:shadow-none rhea:focus-visible:border-ring rhea:focus-visible:ring-ring/30 rhea:aria-invalid:border-destructive rhea:aria-invalid:aria-checked:border-primary rhea:data-checked:border-primary rhea:data-checked:bg-primary rhea:data-indeterminate:border-primary rhea:data-indeterminate:bg-primary rhea:dark:aria-invalid:border-destructive/50 rhea:group-has-[:focus-visible]/field-label:not-data-checked:border-transparent",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none [&>svg]:size-3.5"
      >
        <HugeiconsIcon
          icon={indeterminate ? MinusSignIcon : Tick02Icon}
          strokeWidth={2}
        />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
