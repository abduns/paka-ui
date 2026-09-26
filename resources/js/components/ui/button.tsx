import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 vega:rounded-md maia:rounded-4xl lyra:rounded-none lyra:text-xs lyra:focus-visible:ring-1 lyra:aria-invalid:ring-1 mira:rounded-md mira:text-xs/relaxed mira:focus-visible:ring-2 mira:focus-visible:ring-ring/30 mira:aria-invalid:ring-2 luma:rounded-4xl luma:focus-visible:ring-ring/30 sera:rounded-none sera:text-xs sera:font-semibold sera:tracking-widest sera:uppercase sera:focus-visible:ring-2 sera:focus-visible:ring-ring/30 sera:aria-invalid:ring-2 sera:[&_svg:not([class*='size-'])]:size-3.5 rhea:rounded-2xl rhea:focus-visible:ring-ring/30",
  {
    variants: {
      variant: {
        default:
          "relative grainy bg-primary text-primary-foreground shadow-xs inset-shadow-2xs inset-shadow-white/40 hover:bg-[color-mix(in_oklch,var(--primary),black_12%)] focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/15 active:bg-[color-mix(in_oklch,var(--primary),black_22%)] active:shadow-none active:inset-shadow-none",
        outline:
          "border-border bg-background shadow-xs hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50 nova:shadow-none maia:bg-input/30 maia:shadow-none maia:hover:bg-input/50 lyra:shadow-none mira:bg-transparent mira:shadow-none mira:hover:bg-input/50 luma:shadow-none luma:dark:bg-transparent luma:dark:hover:bg-input/30 sera:bg-transparent sera:shadow-none sera:dark:bg-transparent sera:dark:hover:bg-input/30 rhea:shadow-none rhea:dark:bg-transparent rhea:dark:hover:bg-input/30",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline sera:underline",
      },
      size: {
        default:
          "h-9 gap-1.5 px-2.5 in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 nova:h-8 nova:in-data-[slot=button-group]:rounded-lg maia:px-3 maia:has-data-[icon=inline-end]:pr-2.5 maia:has-data-[icon=inline-start]:pl-2.5 lyra:h-8 lyra:in-data-[slot=button-group]:rounded-none mira:h-7 mira:gap-1 mira:px-2 mira:has-data-[icon=inline-end]:pr-1.5 mira:has-data-[icon=inline-start]:pl-1.5 mira:[&_svg:not([class*='size-'])]:size-3.5 luma:px-3 luma:has-data-[icon=inline-end]:pr-2.5 luma:has-data-[icon=inline-start]:pl-2.5 sera:h-10 sera:px-6 sera:in-data-[slot=button-group]:rounded-none sera:has-data-[icon=inline-end]:pr-4 sera:has-data-[icon=inline-start]:pl-4 rhea:h-8 rhea:px-3 rhea:has-data-[icon=inline-end]:pr-2.5 rhea:has-data-[icon=inline-start]:pl-2.5",
        xs: "h-6 gap-1 rounded-md px-2 text-xs in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3 nova:rounded-[min(var(--radius-md),10px)] nova:in-data-[slot=button-group]:rounded-lg maia:rounded-4xl maia:px-2.5 maia:has-data-[icon=inline-end]:pr-2 maia:has-data-[icon=inline-start]:pl-2 lyra:rounded-none lyra:in-data-[slot=button-group]:rounded-none mira:h-5 mira:rounded-sm mira:text-[0.625rem] mira:[&_svg:not([class*='size-'])]:size-2.5 luma:rounded-4xl luma:px-2.5 luma:has-data-[icon=inline-end]:pr-2 luma:has-data-[icon=inline-start]:pl-2 sera:h-7 sera:rounded-none sera:px-3 sera:in-data-[slot=button-group]:rounded-none sera:has-data-[icon=inline-end]:pr-2 sera:has-data-[icon=inline-start]:pl-2 rhea:rounded-2xl rhea:px-2.5 rhea:has-data-[icon=inline-end]:pr-2 rhea:has-data-[icon=inline-start]:pl-2",
        sm: "h-8 gap-1 rounded-md px-2.5 in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 nova:h-7 nova:rounded-[min(var(--radius-md),12px)] nova:text-[0.8rem] nova:in-data-[slot=button-group]:rounded-lg nova:[&_svg:not([class*='size-'])]:size-3.5 maia:rounded-4xl maia:px-3 maia:has-data-[icon=inline-end]:pr-2 maia:has-data-[icon=inline-start]:pl-2 lyra:h-7 lyra:rounded-none lyra:in-data-[slot=button-group]:rounded-none lyra:[&_svg:not([class*='size-'])]:size-3.5 mira:h-6 mira:px-2 mira:text-xs/relaxed mira:[&_svg:not([class*='size-'])]:size-3 luma:rounded-4xl luma:px-3 luma:has-data-[icon=inline-end]:pr-2 luma:has-data-[icon=inline-start]:pl-2 sera:h-9 sera:rounded-none sera:px-4 sera:in-data-[slot=button-group]:rounded-none sera:has-data-[icon=inline-end]:pr-3 sera:has-data-[icon=inline-start]:pl-3 rhea:h-7 rhea:rounded-2xl rhea:px-3 rhea:has-data-[icon=inline-end]:pr-2 rhea:has-data-[icon=inline-start]:pl-2",
        lg: "h-10 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 nova:h-9 maia:px-4 maia:has-data-[icon=inline-end]:pr-3 maia:has-data-[icon=inline-start]:pl-3 lyra:h-9 mira:h-8 mira:gap-1 mira:text-xs/relaxed luma:px-4 luma:has-data-[icon=inline-end]:pr-3 luma:has-data-[icon=inline-start]:pl-3 sera:h-11 sera:px-8 sera:has-data-[icon=inline-end]:pr-5 sera:has-data-[icon=inline-start]:pl-5 rhea:h-9 rhea:px-4 rhea:has-data-[icon=inline-end]:pr-3 rhea:has-data-[icon=inline-start]:pl-3",
        icon: "size-9 nova:size-8 lyra:size-8 mira:size-7 mira:[&_svg:not([class*='size-'])]:size-3.5 sera:size-10 rhea:size-8",
        "icon-xs":
          "size-6 rounded-md in-data-[slot=button-group]:rounded-md [&_svg:not([class*='size-'])]:size-3 nova:rounded-[min(var(--radius-md),10px)] nova:in-data-[slot=button-group]:rounded-lg maia:rounded-4xl lyra:rounded-none lyra:in-data-[slot=button-group]:rounded-none mira:size-5 mira:rounded-sm mira:[&_svg:not([class*='size-'])]:size-2.5 luma:rounded-4xl sera:size-7 sera:rounded-none sera:in-data-[slot=button-group]:rounded-none rhea:rounded-2xl",
        "icon-sm":
          "size-8 rounded-md in-data-[slot=button-group]:rounded-md nova:size-7 nova:rounded-[min(var(--radius-md),12px)] nova:in-data-[slot=button-group]:rounded-lg maia:rounded-4xl lyra:size-7 lyra:rounded-none lyra:in-data-[slot=button-group]:rounded-none mira:size-6 mira:[&_svg:not([class*='size-'])]:size-3 luma:rounded-4xl sera:size-9 sera:rounded-none sera:in-data-[slot=button-group]:rounded-none rhea:size-7 rhea:rounded-2xl",
        "icon-lg": "size-10 nova:size-9 lyra:size-9 mira:size-8 mira:[&_svg:not([class*='size-'])]:size-4 sera:size-11 rhea:size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
