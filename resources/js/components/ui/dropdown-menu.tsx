import * as React from "react"
import { Menu as MenuPrimitive } from "@base-ui/react/menu"

import { cn } from "@/lib/utils"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon, Tick02Icon } from "@hugeicons/core-free-icons"

function DropdownMenu({ ...props }: MenuPrimitive.Root.Props) {
  return <MenuPrimitive.Root data-slot="dropdown-menu" {...props} />
}

function DropdownMenuPortal({ ...props }: MenuPrimitive.Portal.Props) {
  return <MenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
}

function DropdownMenuTrigger({ ...props }: MenuPrimitive.Trigger.Props) {
  return <MenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />
}

function DropdownMenuContent({
  align = "start",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  className,
  ...props
}: MenuPrimitive.Popup.Props &
  Pick<
    MenuPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  >) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner
        className="isolate z-50 outline-none"
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
      >
        <MenuPrimitive.Popup
          data-slot="dropdown-menu-content"
          className={cn("z-50 max-h-(--available-height) w-(--anchor-width) min-w-32 maia:min-w-48 luma:min-w-48 sera:min-w-48 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-md nova:rounded-lg maia:rounded-2xl lyra:rounded-none mira:rounded-lg luma:rounded-3xl sera:rounded-none rhea:rounded-2xl bg-popover p-1 lyra:p-0 luma:p-1.5 sera:p-1.5 text-popover-foreground shadow-md maia:shadow-2xl luma:shadow-lg rhea:shadow-lg ring-1 ring-foreground/10 maia:ring-foreground/5 maia:dark:ring-foreground/10 luma:ring-foreground/5 luma:dark:ring-foreground/10 rhea:ring-foreground/5 rhea:dark:ring-foreground/10 duration-100 outline-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:overflow-hidden data-closed:fade-out-0 data-closed:zoom-out-95", className )}
          {...props}
        />
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  )
}

function DropdownMenuGroup({ ...props }: MenuPrimitive.Group.Props) {
  return <MenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: MenuPrimitive.GroupLabel.Props & {
  inset?: boolean
}) {
  return (
    <MenuPrimitive.GroupLabel
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn(
        "px-2 nova:px-1.5 maia:px-3 luma:px-3 sera:px-3 py-1.5 nova:py-1 maia:py-2.5 lyra:py-2 luma:py-2.5 sera:py-2 rhea:py-1 text-xs font-medium maia:font-normal lyra:font-normal mira:font-normal luma:font-normal sera:font-semibold rhea:font-normal sera:tracking-wider sera:uppercase text-muted-foreground data-inset:pl-8 nova:data-inset:pl-7 maia:data-inset:pl-9.5 lyra:data-inset:pl-7 mira:data-inset:pl-7.5 luma:data-inset:pl-9.5 sera:data-inset:pl-9.5 rhea:data-inset:pl-7",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: MenuPrimitive.Item.Props & {
  inset?: boolean
  variant?: "default" | "destructive"
}) {
  return (
    <MenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "group/dropdown-menu-item relative flex cursor-default items-center gap-2 nova:gap-1.5 maia:gap-2.5 luma:gap-2.5 sera:gap-2.5 rounded-sm nova:rounded-md maia:rounded-xl lyra:rounded-none mira:rounded-md luma:rounded-2xl sera:rounded-none rhea:rounded-xl px-2 nova:px-1.5 maia:px-3 luma:px-3 sera:px-3 py-1.5 nova:py-1 maia:py-2 lyra:py-2 mira:py-1 luma:py-2 sera:py-2 mira:min-h-7 rhea:min-h-7 text-sm lyra:text-xs mira:text-xs/relaxed sera:text-xs luma:font-medium sera:font-medium sera:tracking-wider sera:uppercase outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:pl-8 nova:data-inset:pl-7 maia:data-inset:pl-9.5 lyra:data-inset:pl-7 mira:data-inset:pl-7.5 luma:data-inset:pl-9.5 sera:data-inset:pl-9.5 rhea:data-inset:pl-7 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 mira:[&_svg:not([class*='size-'])]:size-3.5 sera:[&_svg:not([class*='size-'])]:size-3.5 data-[variant=destructive]:*:[svg]:text-destructive",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuSub({ ...props }: MenuPrimitive.SubmenuRoot.Props) {
  return <MenuPrimitive.SubmenuRoot data-slot="dropdown-menu-sub" {...props} />
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: MenuPrimitive.SubmenuTrigger.Props & {
  inset?: boolean
}) {
  return (
    <MenuPrimitive.SubmenuTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "flex cursor-default items-center gap-2 nova:gap-1.5 rounded-sm nova:rounded-md maia:rounded-xl lyra:rounded-none mira:rounded-md luma:rounded-2xl sera:rounded-none rhea:rounded-xl px-2 nova:px-1.5 maia:px-3 luma:px-3 sera:px-3 py-1.5 nova:py-1 maia:py-2 lyra:py-2 mira:py-1 luma:py-2 sera:py-2 mira:min-h-7 rhea:min-h-7 text-sm lyra:text-xs mira:text-xs sera:text-xs luma:font-medium sera:font-medium sera:tracking-wider sera:uppercase outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:pl-8 nova:data-inset:pl-7 maia:data-inset:pl-9.5 lyra:data-inset:pl-7 mira:data-inset:pl-7.5 luma:data-inset:pl-9.5 sera:data-inset:pl-9.5 rhea:data-inset:pl-7 data-popup-open:bg-accent data-popup-open:text-accent-foreground data-open:bg-accent data-open:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 mira:[&_svg:not([class*='size-'])]:size-3.5 sera:[&_svg:not([class*='size-'])]:size-3.5",
        className
      )}
      {...props}
    >
      {children}
      <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} className="ml-auto" />
    </MenuPrimitive.SubmenuTrigger>
  )
}

function DropdownMenuSubContent({
  align = "start",
  alignOffset = -3,
  side = "right",
  sideOffset = 0,
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuContent>) {
  return (
    <DropdownMenuContent
      data-slot="dropdown-menu-sub-content"
      className={cn("w-auto min-w-[96px] maia:min-w-36 mira:min-w-32 luma:min-w-36 sera:min-w-36 rounded-md nova:rounded-lg maia:rounded-2xl lyra:rounded-none mira:rounded-lg luma:rounded-3xl sera:rounded-none rhea:rounded-2xl bg-popover p-1 lyra:p-0 luma:p-1.5 sera:p-1.5 text-popover-foreground shadow-lg maia:shadow-2xl mira:shadow-md sera:shadow-md ring-1 ring-foreground/10 maia:ring-foreground/5 luma:ring-foreground/5 luma:dark:ring-foreground/10 rhea:ring-foreground/5 rhea:dark:ring-foreground/10 duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", className )}
      align={align}
      alignOffset={alignOffset}
      side={side}
      sideOffset={sideOffset}
      {...props}
    />
  )
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  inset,
  ...props
}: MenuPrimitive.CheckboxItem.Props & {
  inset?: boolean
}) {
  return (
    <MenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      data-inset={inset}
      className={cn(
        "relative flex cursor-default items-center gap-2 nova:gap-1.5 maia:gap-2.5 luma:gap-2.5 sera:gap-2.5 rounded-sm nova:rounded-md maia:rounded-xl lyra:rounded-none mira:rounded-md luma:rounded-2xl sera:rounded-none rhea:rounded-xl py-1.5 nova:py-1 maia:py-2 lyra:py-2 luma:py-2 sera:py-2 mira:min-h-7 rhea:min-h-7 pr-8 pl-2 nova:pl-1.5 maia:pl-3 luma:pl-3 sera:pl-3 text-sm lyra:text-xs mira:text-xs sera:text-xs luma:font-medium sera:font-medium sera:tracking-wider sera:uppercase outline-hidden select-none focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground data-inset:pl-8 nova:data-inset:pl-7 maia:data-inset:pl-9.5 lyra:data-inset:pl-7 mira:data-inset:pl-7.5 luma:data-inset:pl-9.5 sera:data-inset:pl-9.5 rhea:data-inset:pl-7 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 mira:[&_svg:not([class*='size-'])]:size-3.5 sera:[&_svg:not([class*='size-'])]:size-3.5",
        className
      )}
      checked={checked}
      {...props}
    >
      <span
        className="pointer-events-none absolute right-2 flex items-center justify-center"
        data-slot="dropdown-menu-checkbox-item-indicator"
      >
        <MenuPrimitive.CheckboxItemIndicator>
          <HugeiconsIcon icon={Tick02Icon} strokeWidth={2} />
        </MenuPrimitive.CheckboxItemIndicator>
      </span>
      {children}
    </MenuPrimitive.CheckboxItem>
  )
}

function DropdownMenuRadioGroup({ ...props }: MenuPrimitive.RadioGroup.Props) {
  return (
    <MenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  )
}

function DropdownMenuRadioItem({
  className,
  children,
  inset,
  ...props
}: MenuPrimitive.RadioItem.Props & {
  inset?: boolean
}) {
  return (
    <MenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      data-inset={inset}
      className={cn(
        "relative flex cursor-default items-center gap-2 nova:gap-1.5 maia:gap-2.5 luma:gap-2.5 sera:gap-2.5 rounded-sm nova:rounded-md maia:rounded-xl lyra:rounded-none mira:rounded-md luma:rounded-2xl sera:rounded-none rhea:rounded-xl py-1.5 nova:py-1 maia:py-2 lyra:py-2 luma:py-2 sera:py-2 mira:min-h-7 rhea:min-h-7 pr-8 pl-2 nova:pl-1.5 maia:pl-3 luma:pl-3 sera:pl-3 text-sm lyra:text-xs mira:text-xs sera:text-xs luma:font-medium sera:font-medium sera:tracking-wider sera:uppercase outline-hidden select-none focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground data-inset:pl-8 nova:data-inset:pl-7 maia:data-inset:pl-9.5 lyra:data-inset:pl-7 mira:data-inset:pl-7.5 luma:data-inset:pl-9.5 sera:data-inset:pl-9.5 rhea:data-inset:pl-7 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 mira:[&_svg:not([class*='size-'])]:size-3.5 sera:[&_svg:not([class*='size-'])]:size-3.5",
        className
      )}
      {...props}
    >
      <span
        className="pointer-events-none absolute right-2 flex items-center justify-center"
        data-slot="dropdown-menu-radio-item-indicator"
      >
        <MenuPrimitive.RadioItemIndicator>
          <HugeiconsIcon icon={Tick02Icon} strokeWidth={2} />
        </MenuPrimitive.RadioItemIndicator>
      </span>
      {children}
    </MenuPrimitive.RadioItem>
  )
}

function DropdownMenuSeparator({
  className,
  ...props
}: MenuPrimitive.Separator.Props) {
  return (
    <MenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn("-mx-1 luma:-mx-1.5 sera:-mx-1.5 my-1 lyra:my-0 luma:my-1.5 sera:my-1.5 h-px bg-border maia:bg-border/50 mira:bg-border/50 luma:bg-border/50 sera:bg-border/50 rhea:bg-border/50", className)}
      {...props}
    />
  )
}

function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        "ml-auto text-xs mira:text-[0.625rem] tracking-widest text-muted-foreground group-focus/dropdown-menu-item:text-accent-foreground",
        className
      )}
      {...props}
    />
  )
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
}
