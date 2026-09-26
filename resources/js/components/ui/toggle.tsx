import { Toggle as TogglePrimitive } from "@base-ui/react/toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const toggleVariants = cva(
  "group/toggle inline-flex items-center justify-center gap-1 rounded-md text-sm font-medium whitespace-nowrap transition-[color,box-shadow] outline-none hover:bg-muted hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 aria-pressed:bg-muted dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 nova:rounded-lg maia:rounded-4xl lyra:rounded-none lyra:text-xs mira:text-xs luma:rounded-3xl luma:focus-visible:ring-ring/30 sera:gap-1.5 sera:rounded-none sera:text-xs sera:font-semibold sera:tracking-widest sera:uppercase sera:focus-visible:ring-ring/30 sera:[&_svg:not([class*='size-'])]:size-3.5 rhea:rounded-2xl rhea:focus-visible:ring-ring/30",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border border-input bg-transparent shadow-xs hover:bg-muted nova:shadow-none maia:shadow-none lyra:shadow-none mira:shadow-none luma:shadow-none sera:shadow-none rhea:shadow-none",
      },
      size: {
        default:
          "h-9 min-w-9 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 nova:h-8 nova:min-w-8 maia:px-3 maia:has-data-[icon=inline-end]:pr-2.5 maia:has-data-[icon=inline-start]:pl-2.5 lyra:h-8 lyra:min-w-8 mira:h-7 mira:min-w-7 mira:px-2 mira:has-data-[icon=inline-end]:pr-1.5 mira:has-data-[icon=inline-start]:pl-1.5 luma:px-3 luma:has-data-[icon=inline-end]:pr-2.5 luma:has-data-[icon=inline-start]:pl-2.5 sera:h-10 sera:min-w-10 sera:px-6 sera:has-data-[icon=inline-end]:pr-4 sera:has-data-[icon=inline-start]:pl-4 rhea:h-8 rhea:min-w-8",
        sm: "h-8 min-w-8 px-2.5 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 nova:h-7 nova:min-w-7 nova:rounded-[min(var(--radius-md),12px)] nova:text-[0.8rem] nova:[&_svg:not([class*='size-'])]:size-3.5 maia:px-3 maia:has-data-[icon=inline-end]:pr-2 maia:has-data-[icon=inline-start]:pl-2 lyra:h-7 lyra:min-w-7 lyra:rounded-none mira:h-6 mira:min-w-6 mira:rounded-[min(var(--radius-md),8px)] mira:px-2 mira:text-[0.625rem] mira:[&_svg:not([class*='size-'])]:size-3 luma:px-3 luma:has-data-[icon=inline-end]:pr-2 luma:has-data-[icon=inline-start]:pl-2 sera:h-9 sera:min-w-9 sera:px-4 sera:has-data-[icon=inline-end]:pr-3 sera:has-data-[icon=inline-start]:pl-3 rhea:h-7 rhea:min-w-7",
        lg: "h-10 min-w-10 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 nova:h-9 nova:min-w-9 maia:px-4 maia:has-data-[icon=inline-end]:pr-3 maia:has-data-[icon=inline-start]:pl-3 lyra:h-9 lyra:min-w-9 mira:h-8 mira:min-w-8 luma:px-4 luma:has-data-[icon=inline-end]:pr-3 luma:has-data-[icon=inline-start]:pl-3 sera:h-11 sera:min-w-11 sera:px-8 sera:has-data-[icon=inline-end]:pr-5 sera:has-data-[icon=inline-start]:pl-5 rhea:h-9 rhea:min-w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Toggle({
  className,
  variant = "default",
  size = "default",
  ...props
}: TogglePrimitive.Props & VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Toggle, toggleVariants }
