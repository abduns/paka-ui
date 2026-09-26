import * as React from "react"
import { Select as SelectPrimitive } from "@base-ui/react/select"

import { cn } from "@/lib/utils"
import { HugeiconsIcon } from "@hugeicons/react"
import { UnfoldMoreIcon, Tick02Icon, ArrowUp01Icon, ArrowDown01Icon } from "@hugeicons/core-free-icons"

type SelectItemDefinition = {
  children?: React.ReactNode
  value?: unknown
}

function collectItems(children: React.ReactNode) {
  const items: Array<{ label: React.ReactNode; value: unknown }> = []

  React.Children.forEach(children, (child) => {
    if (!React.isValidElement<SelectItemDefinition>(child)) {
      return
    }

    if (child.type === SelectItem) {
      items.push({
        label: child.props.children,
        value: child.props.value ?? null,
      })
    }

    items.push(...collectItems(child.props.children))
  })

  return items
}

function Select<Value, Multiple extends boolean | undefined = false>({
  children,
  items,
  ...props
}: SelectPrimitive.Root.Props<Value, Multiple>) {
  return (
    <SelectPrimitive.Root
      items={
        items ??
        (collectItems(children) as SelectPrimitive.Root.Props<
          Value,
          Multiple
        >["items"])
      }
      {...props}
    >
      {children}
    </SelectPrimitive.Root>
  )
}

function SelectGroup({ className, ...props }: SelectPrimitive.Group.Props) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={cn("scroll-my-1 p-1 lyra:p-0 luma:scroll-my-1.5 luma:p-1.5 sera:scroll-my-1.5 sera:p-1.5 rhea:scroll-my-1.5", className)}
      {...props}
    />
  )
}

function SelectValue({ className, ...props }: SelectPrimitive.Value.Props) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className={cn("flex flex-1 text-left", className)}
      {...props}
    />
  )
}

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: SelectPrimitive.Trigger.Props & {
  size?: "sm" | "default"
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "flex w-fit items-center justify-between gap-1.5 rounded-md border border-input bg-transparent py-2 pr-2 pl-2.5 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-zinc-200 dark:focus-visible:ring-zinc-800 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-placeholder:text-muted-foreground data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5 dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 nova:rounded-lg nova:shadow-none nova:select-none nova:data-[size=default]:h-8 nova:data-[size=sm]:h-7 nova:data-[size=sm]:rounded-[min(var(--radius-md),10px)] maia:rounded-4xl maia:bg-input/30 maia:px-3 maia:shadow-none maia:dark:hover:bg-input/50 lyra:rounded-none lyra:text-xs lyra:shadow-none lyra:select-none lyra:focus-visible:ring-1 lyra:aria-invalid:ring-1 lyra:data-[size=default]:h-8 lyra:data-[size=sm]:h-7 mira:bg-input/20 mira:px-2 mira:py-1.5 mira:text-xs/relaxed mira:shadow-none mira:focus-visible:ring-2 mira:aria-invalid:ring-2 mira:data-[size=default]:h-7 mira:data-[size=sm]:h-6 mira:dark:bg-input/30 mira:dark:hover:bg-input/50 mira:[&_svg:not([class*='size-'])]:size-3.5 luma:rounded-3xl luma:border-transparent luma:bg-input/50 luma:px-3 luma:shadow-none luma:focus-visible:border-ring luma:aria-invalid:border-destructive luma:dark:aria-invalid:border-destructive/50 sera:rounded-none sera:border-transparent sera:border-b-input sera:px-0 sera:shadow-none sera:transition-[color,border-color] sera:focus-visible:border-transparent sera:focus-visible:border-b-ring sera:focus-visible:ring-0 sera:aria-invalid:border-transparent sera:aria-invalid:border-b-destructive sera:aria-invalid:ring-0 sera:data-[size=default]:h-10 sera:data-[size=sm]:h-9 sera:dark:bg-transparent sera:dark:hover:bg-transparent sera:dark:aria-invalid:border-transparent sera:dark:aria-invalid:border-b-destructive/50 sera:[&_svg:not([class*='size-'])]:size-3.5 rhea:rounded-2xl rhea:border-transparent rhea:bg-input/50 rhea:shadow-none rhea:duration-200 rhea:focus-visible:border-ring rhea:aria-invalid:border-destructive rhea:data-[size=default]:h-8 rhea:data-[size=sm]:h-7 rhea:dark:aria-invalid:border-destructive/50",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon
        render={
          <HugeiconsIcon icon={UnfoldMoreIcon} strokeWidth={2} className="pointer-events-none size-4 text-muted-foreground mira:size-3.5 sera:size-3.5" />
        }
      />
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  side = "bottom",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
  alignItemWithTrigger = true,
  ...props
}: SelectPrimitive.Popup.Props &
  Pick<
    SelectPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset" | "alignItemWithTrigger"
  >) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        alignItemWithTrigger={alignItemWithTrigger}
        className="isolate z-50"
      >
        <SelectPrimitive.Popup
          data-slot="select-content"
          data-align-trigger={alignItemWithTrigger}
          className={cn("relative isolate z-50 max-h-(--available-height) w-(--anchor-width) min-w-36 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-md bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 data-[align-trigger=true]:animate-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 nova:rounded-lg maia:rounded-2xl maia:shadow-2xl maia:ring-foreground/5 lyra:rounded-none mira:min-w-32 mira:rounded-lg luma:rounded-3xl luma:shadow-lg luma:ring-foreground/5 luma:dark:ring-foreground/10 sera:rounded-none rhea:rounded-2xl rhea:shadow-lg rhea:ring-foreground/5 rhea:dark:ring-foreground/10", className )}
          {...props}
        >
          <SelectScrollUpButton />
          <SelectPrimitive.List>{children}</SelectPrimitive.List>
          <SelectScrollDownButton />
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({
  className,
  ...props
}: SelectPrimitive.GroupLabel.Props) {
  return (
    <SelectPrimitive.GroupLabel
      data-slot="select-label"
      className={cn("px-2 py-1.5 text-xs text-muted-foreground nova:px-1.5 nova:py-1 maia:px-3 maia:py-2.5 lyra:py-2 luma:px-3 luma:py-2.5 sera:px-3 sera:py-2 sera:font-semibold sera:tracking-wider sera:uppercase rhea:py-1", className)}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  ...props
}: SelectPrimitive.Item.Props) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2 nova:gap-1.5 nova:rounded-md nova:py-1 nova:pl-1.5 maia:gap-2.5 maia:rounded-xl maia:py-2 maia:pl-3 lyra:rounded-none lyra:py-2 lyra:text-xs mira:min-h-7 mira:rounded-md mira:px-2 mira:py-1 mira:text-xs/relaxed mira:[&_svg:not([class*='size-'])]:size-3.5 luma:gap-2.5 luma:rounded-2xl luma:py-2 luma:pl-3 luma:font-medium sera:gap-2.5 sera:rounded-none sera:py-2 sera:pl-3 sera:[&_svg:not([class*='size-'])]:size-3.5 rhea:min-h-7 rhea:rounded-xl",
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemText className="flex flex-1 shrink-0 items-center gap-2 whitespace-nowrap">
        {children}
      </SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator
        render={
          <span className="pointer-events-none absolute right-2 flex size-4 items-center justify-center" />
        }
      >
        <HugeiconsIcon icon={Tick02Icon} strokeWidth={2} className="pointer-events-none" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({
  className,
  ...props
}: SelectPrimitive.Separator.Props) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("pointer-events-none -mx-1 my-1 h-px bg-border maia:bg-border/50 lyra:my-0 mira:bg-border/50 luma:-mx-1.5 luma:my-1.5 sera:-mx-1.5 sera:my-1.5 sera:bg-border/50", className)}
      {...props}
    />
  )
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpArrow>) {
  return (
    <SelectPrimitive.ScrollUpArrow
      data-slot="select-scroll-up-button"
      className={cn(
        "top-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4 mira:[&_svg:not([class*='size-'])]:size-3.5 sera:[&_svg:not([class*='size-'])]:size-3.5",
        className
      )}
      {...props}
    >
      <HugeiconsIcon icon={ArrowUp01Icon} strokeWidth={2} />
    </SelectPrimitive.ScrollUpArrow>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownArrow>) {
  return (
    <SelectPrimitive.ScrollDownArrow
      data-slot="select-scroll-down-button"
      className={cn(
        "bottom-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4 mira:[&_svg:not([class*='size-'])]:size-3.5 sera:[&_svg:not([class*='size-'])]:size-3.5",
        className
      )}
      {...props}
    >
      <HugeiconsIcon icon={ArrowDown01Icon} strokeWidth={2} />
    </SelectPrimitive.ScrollDownArrow>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
