"use client"

import * as React from "react"
import { Toggle as TogglePrimitive } from "@base-ui/react/toggle"
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group"
import { type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { toggleVariants } from "@/components/ui/toggle"

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants> & {
    spacing?: number
    orientation?: "horizontal" | "vertical"
  }
>({
  size: "default",
  variant: "default",
  spacing: 2,
  orientation: "horizontal",
})

function ToggleGroup({
  className,
  variant,
  size,
  spacing = 2,
  orientation = "horizontal",
  children,
  ...props
}: ToggleGroupPrimitive.Props &
  VariantProps<typeof toggleVariants> & {
    spacing?: number
    orientation?: "horizontal" | "vertical"
  }) {
  return (
    <ToggleGroupPrimitive
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      data-spacing={spacing}
      data-orientation={orientation}
      style={{ "--gap": spacing } as React.CSSProperties}
      className={cn(
        "group/toggle-group flex w-fit flex-row items-center gap-[--spacing(var(--gap))] rounded-md data-[spacing=0]:data-[variant=outline]:shadow-xs data-vertical:flex-col data-vertical:items-stretch nova:rounded-lg nova:data-[size=sm]:rounded-[min(var(--radius-md),10px)] nova:data-[spacing=0]:data-[variant=outline]:shadow-none maia:data-[spacing=0]:data-[variant=outline]:rounded-4xl maia:data-[spacing=0]:data-[variant=outline]:shadow-none lyra:rounded-none lyra:data-[spacing=0]:data-[variant=outline]:shadow-none mira:data-[size=sm]:rounded-[min(var(--radius-md),8px)] mira:data-[spacing=0]:data-[variant=outline]:shadow-none luma:data-[spacing=0]:data-[variant=outline]:rounded-3xl luma:data-[spacing=0]:data-[variant=outline]:shadow-none sera:data-[spacing=0]:data-[variant=outline]:rounded-none sera:data-[spacing=0]:data-[variant=outline]:shadow-none rhea:data-[spacing=0]:data-[variant=outline]:rounded-2xl rhea:data-[spacing=0]:data-[variant=outline]:shadow-none",
        className
      )}
      {...props}
    >
      <ToggleGroupContext.Provider
        value={{ variant, size, spacing, orientation }}
      >
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive>
  )
}

function ToggleGroupItem({
  className,
  children,
  variant = "default",
  size = "default",
  ...props
}: TogglePrimitive.Props & VariantProps<typeof toggleVariants>) {
  const context = React.useContext(ToggleGroupContext)

  return (
    <TogglePrimitive
      data-slot="toggle-group-item"
      data-variant={context.variant || variant}
      data-size={context.size || size}
      data-spacing={context.spacing}
      className={cn(
        "shrink-0 group-data-[spacing=0]/toggle-group:rounded-none group-data-[spacing=0]/toggle-group:px-2 group-data-[spacing=0]/toggle-group:shadow-none focus:z-10 focus-visible:z-10 group-data-[spacing=0]/toggle-group:has-data-[icon=inline-end]:pr-1.5 group-data-[spacing=0]/toggle-group:has-data-[icon=inline-start]:pl-1.5 group-data-horizontal/toggle-group:data-[spacing=0]:first:rounded-l-md group-data-vertical/toggle-group:data-[spacing=0]:first:rounded-t-md group-data-horizontal/toggle-group:data-[spacing=0]:last:rounded-r-md group-data-vertical/toggle-group:data-[spacing=0]:last:rounded-b-md data-[state=on]:bg-muted group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:border-l-0 group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0 group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-l group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t nova:group-data-[spacing=0]/toggle-group:rounded-none nova:group-data-horizontal/toggle-group:data-[spacing=0]:first:rounded-l-lg nova:group-data-vertical/toggle-group:data-[spacing=0]:first:rounded-t-lg nova:group-data-horizontal/toggle-group:data-[spacing=0]:last:rounded-r-lg nova:group-data-vertical/toggle-group:data-[spacing=0]:last:rounded-b-lg maia:group-data-[spacing=0]/toggle-group:rounded-none maia:group-data-[spacing=0]/toggle-group:px-3 maia:group-data-[spacing=0]/toggle-group:has-data-[icon=inline-end]:pr-2.5 maia:group-data-[spacing=0]/toggle-group:has-data-[icon=inline-start]:pl-2.5 maia:group-data-horizontal/toggle-group:data-[spacing=0]:first:rounded-l-3xl maia:group-data-vertical/toggle-group:data-[spacing=0]:first:rounded-t-3xl maia:group-data-horizontal/toggle-group:data-[spacing=0]:last:rounded-r-3xl maia:group-data-vertical/toggle-group:data-[spacing=0]:last:rounded-b-3xl lyra:group-data-horizontal/toggle-group:data-[spacing=0]:first:rounded-none lyra:group-data-vertical/toggle-group:data-[spacing=0]:first:rounded-none lyra:group-data-horizontal/toggle-group:data-[spacing=0]:last:rounded-none lyra:group-data-vertical/toggle-group:data-[spacing=0]:last:rounded-none luma:group-data-[spacing=0]/toggle-group:rounded-none luma:group-data-[spacing=0]/toggle-group:px-3 luma:group-data-[spacing=0]/toggle-group:has-data-[icon=inline-end]:pr-2.5 luma:group-data-[spacing=0]/toggle-group:has-data-[icon=inline-start]:pl-2.5 luma:group-data-horizontal/toggle-group:data-[spacing=0]:first:rounded-l-3xl luma:group-data-vertical/toggle-group:data-[spacing=0]:first:rounded-t-3xl luma:group-data-horizontal/toggle-group:data-[spacing=0]:last:rounded-r-3xl luma:group-data-vertical/toggle-group:data-[spacing=0]:last:rounded-b-3xl sera:group-data-[spacing=0]/toggle-group:px-6 sera:group-data-[spacing=0]/toggle-group:has-data-[icon=inline-end]:pr-4 sera:group-data-[spacing=0]/toggle-group:has-data-[icon=inline-start]:pl-4 sera:group-data-horizontal/toggle-group:data-[spacing=0]:first:rounded-none sera:group-data-vertical/toggle-group:data-[spacing=0]:first:rounded-none sera:group-data-horizontal/toggle-group:data-[spacing=0]:last:rounded-none sera:group-data-vertical/toggle-group:data-[spacing=0]:last:rounded-none sera:data-[state=on]:text-foreground rhea:group-data-[spacing=0]/toggle-group:rounded-none rhea:group-data-horizontal/toggle-group:data-[spacing=0]:first:rounded-l-2xl rhea:group-data-vertical/toggle-group:data-[spacing=0]:first:rounded-t-2xl rhea:group-data-horizontal/toggle-group:data-[spacing=0]:last:rounded-r-2xl rhea:group-data-vertical/toggle-group:data-[spacing=0]:last:rounded-b-2xl",
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        className
      )}
      {...props}
    >
      {children}
    </TogglePrimitive>
  )
}

export { ToggleGroup, ToggleGroupItem }
