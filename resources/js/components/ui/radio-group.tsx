import { Radio as RadioPrimitive } from "@base-ui/react/radio"
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group"
import { cn } from "@/lib/utils"

function RadioGroup({ className, ...props }: RadioGroupPrimitive.Props) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      className={cn("grid w-full gap-3 nova:gap-2 lyra:gap-2", className)}
      {...props}
    />
  )
}

function RadioGroupItem({ className, ...props }: RadioPrimitive.Root.Props) {
  return (
    <RadioPrimitive.Root
      data-slot="radio-group-item"
      className={cn(
        "group/radio-group-item peer relative flex aspect-square size-4 shrink-0 rounded-full border border-input outline-none group-has-[:focus-visible]/field-label:ring-0 group-has-[:focus-visible]/field-label:not-data-checked:border-input after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground group-has-[:focus-visible]/field-label:data-checked:border-primary dark:data-checked:bg-primary lyra:focus-visible:ring-1 lyra:aria-invalid:ring-1 mira:focus-visible:ring-2 mira:focus-visible:ring-ring/30 mira:aria-invalid:ring-2 luma:border-transparent luma:bg-input/90 luma:focus-visible:border-ring luma:focus-visible:ring-ring/30 luma:aria-invalid:border-destructive luma:data-checked:bg-primary luma:dark:aria-invalid:border-destructive/50 luma:group-has-[:focus-visible]/field-label:border-transparent sera:size-4.5 sera:bg-transparent sera:focus-visible:ring-2 sera:focus-visible:ring-ring/30 sera:aria-invalid:ring-2 sera:aria-invalid:aria-checked:border-foreground sera:data-checked:border-foreground sera:group-has-[:focus-visible]/field-label:data-checked:border-foreground rhea:rounded-2xl rhea:border-transparent rhea:bg-input/90 rhea:focus-visible:border-ring rhea:focus-visible:ring-ring/30 rhea:aria-invalid:border-destructive rhea:data-checked:bg-primary rhea:dark:aria-invalid:border-destructive/50 rhea:group-has-[:focus-visible]/field-label:border-transparent",
        className
      )}
      {...props}
    >
      <RadioPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="flex size-4 items-center justify-center sera:size-4.5"
      >
        <span className="absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-foreground luma:dark:size-2.5 sera:bg-foreground rhea:dark:size-2.5" />
      </RadioPrimitive.Indicator>
    </RadioPrimitive.Root>
  )
}

export { RadioGroup, RadioGroupItem }
