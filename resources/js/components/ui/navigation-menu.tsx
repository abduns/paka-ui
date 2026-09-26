import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowDown01Icon } from "@hugeicons/core-free-icons"

function NavigationMenu({
  align = "start",
  className,
  children,
  ...props
}: NavigationMenuPrimitive.Root.Props &
  Pick<NavigationMenuPrimitive.Positioner.Props, "align">) {
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      className={cn(
        "group/navigation-menu relative flex max-w-max flex-1 items-center justify-center",
        className
      )}
      {...props}
    >
      {children}
      <NavigationMenuPositioner align={align} />
    </NavigationMenuPrimitive.Root>
  )
}

function NavigationMenuList({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof NavigationMenuPrimitive.List>) {
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      className={cn(
        "group flex flex-1 list-none items-center justify-center gap-0",
        className
      )}
      {...props}
    />
  )
}

function NavigationMenuItem({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof NavigationMenuPrimitive.Item>) {
  return (
    <NavigationMenuPrimitive.Item
      data-slot="navigation-menu-item"
      className={cn("relative", className)}
      {...props}
    />
  )
}

const navigationMenuTriggerStyle = cva(
  "group/navigation-menu-trigger inline-flex h-9 w-max items-center justify-center rounded-md nova:rounded-lg maia:rounded-2xl lyra:rounded-none mira:rounded-lg luma:rounded-3xl sera:rounded-none rhea:rounded-2xl px-4 nova:px-2.5 maia:px-4.5 lyra:px-2.5 mira:px-2.5 luma:px-4.5 sera:px-4.5 rhea:px-2.5 py-2 nova:py-1.5 maia:py-2.5 lyra:py-1.5 mira:py-1.5 luma:py-2.5 sera:py-2.5 rhea:py-1.5 text-sm lyra:text-xs mira:text-xs/relaxed font-medium transition-all outline-none hover:bg-muted focus:bg-muted focus-visible:ring-3 lyra:focus-visible:ring-1 mira:focus-visible:ring-2 sera:focus-visible:ring-2 focus-visible:ring-ring/50 mira:focus-visible:ring-ring/30 luma:focus-visible:ring-ring/30 sera:focus-visible:ring-ring/30 rhea:focus-visible:ring-ring/30 focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-popup-open:bg-muted/50 data-popup-open:hover:bg-muted data-open:bg-muted/50 data-open:hover:bg-muted data-open:focus:bg-muted"
)

function NavigationMenuTrigger({
  className,
  children,
  ...props
}: NavigationMenuPrimitive.Trigger.Props) {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={cn(navigationMenuTriggerStyle(), "group", className)}
      {...props}
    >
      {children}{" "}
      <HugeiconsIcon icon={ArrowDown01Icon} strokeWidth={2} className="relative top-px ml-1 size-3 transition duration-300 group-data-popup-open/navigation-menu-trigger:rotate-180 group-data-open/navigation-menu-trigger:rotate-180" aria-hidden="true" />
    </NavigationMenuPrimitive.Trigger>
  )
}

function NavigationMenuContent({
  className,
  ...props
}: NavigationMenuPrimitive.Content.Props) {
  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      className={cn(
        "data-ending-style:data-activation-direction=left:translate-x-[50%] data-ending-style:data-activation-direction=right:translate-x-[-50%] data-starting-style:data-activation-direction=left:translate-x-[-50%] data-starting-style:data-activation-direction=right:translate-x-[50%] h-full w-auto p-2 nova:p-1 maia:p-2.5 lyra:p-1 mira:p-1.5 luma:p-2.5 sera:p-2.5 rhea:p-1.5 pr-2.5 nova:pr-1 maia:pr-3 lyra:pr-1 mira:pr-1.5 luma:pr-3 sera:pr-3 rhea:pr-1.5 transition-[opacity,transform,translate] duration-[0.35s] ease-[cubic-bezier(0.22,1,0.36,1)] group-data-[viewport=false]/navigation-menu:rounded-md nova:group-data-[viewport=false]/navigation-menu:rounded-lg maia:group-data-[viewport=false]/navigation-menu:rounded-2xl lyra:group-data-[viewport=false]/navigation-menu:rounded-none mira:group-data-[viewport=false]/navigation-menu:rounded-xl luma:group-data-[viewport=false]/navigation-menu:rounded-3xl sera:group-data-[viewport=false]/navigation-menu:rounded-none rhea:group-data-[viewport=false]/navigation-menu:rounded-2xl group-data-[viewport=false]/navigation-menu:bg-popover group-data-[viewport=false]/navigation-menu:text-popover-foreground group-data-[viewport=false]/navigation-menu:shadow maia:group-data-[viewport=false]/navigation-menu:shadow-2xl mira:group-data-[viewport=false]/navigation-menu:shadow-md luma:group-data-[viewport=false]/navigation-menu:shadow-lg sera:group-data-[viewport=false]/navigation-menu:shadow-md rhea:group-data-[viewport=false]/navigation-menu:shadow-lg group-data-[viewport=false]/navigation-menu:ring-1 group-data-[viewport=false]/navigation-menu:ring-foreground/10 maia:group-data-[viewport=false]/navigation-menu:ring-foreground/5 luma:group-data-[viewport=false]/navigation-menu:ring-foreground/5 luma:group-data-[viewport=false]/navigation-menu:dark:ring-foreground/10 rhea:group-data-[viewport=false]/navigation-menu:ring-foreground/5 rhea:group-data-[viewport=false]/navigation-menu:dark:ring-foreground/10 group-data-[viewport=false]/navigation-menu:duration-300 data-ending-style:opacity-0 data-starting-style:opacity-0 data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 data-[motion^=from-]:animate-in data-[motion^=from-]:fade-in data-[motion^=to-]:animate-out data-[motion^=to-]:fade-out **:data-[slot=navigation-menu-link]:focus:ring-0 **:data-[slot=navigation-menu-link]:focus:outline-none group-data-[viewport=false]/navigation-menu:data-open:animate-in group-data-[viewport=false]/navigation-menu:data-open:fade-in-0 group-data-[viewport=false]/navigation-menu:data-open:zoom-in-95 group-data-[viewport=false]/navigation-menu:data-closed:animate-out group-data-[viewport=false]/navigation-menu:data-closed:fade-out-0 group-data-[viewport=false]/navigation-menu:data-closed:zoom-out-95",
        className
      )}
      {...props}
    />
  )
}

function NavigationMenuPositioner({
  className,
  side = "bottom",
  sideOffset = 8,
  align = "start",
  alignOffset = 0,
  ...props
}: NavigationMenuPrimitive.Positioner.Props) {
  return (
    <NavigationMenuPrimitive.Portal>
      <NavigationMenuPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        className={cn(
          "isolate z-50 h-(--positioner-height) w-(--positioner-width) max-w-(--available-width) transition-[top,left,right,bottom] duration-[0.35s] ease-[cubic-bezier(0.22,1,0.36,1)] data-instant:transition-none data-[side=bottom]:before:top-[-10px] data-[side=bottom]:before:right-0 data-[side=bottom]:before:left-0",
          className
        )}
        {...props}
      >
        <NavigationMenuPrimitive.Popup className="data-[ending-style]:easing-[ease] xs:w-(--popup-width) relative h-(--popup-height) w-(--popup-width) origin-(--transform-origin) rounded-lg maia:rounded-2xl lyra:rounded-none mira:rounded-xl luma:rounded-3xl sera:rounded-none rhea:rounded-3xl bg-popover text-popover-foreground shadow luma:shadow-lg sera:shadow-md rhea:shadow-lg ring-1 ring-foreground/10 maia:ring-foreground/5 luma:ring-foreground/5 luma:dark:ring-foreground/10 rhea:ring-foreground/5 rhea:dark:ring-foreground/10 transition-[opacity,transform,width,height,scale,translate] duration-[0.35s] ease-[cubic-bezier(0.22,1,0.36,1)] outline-none data-ending-style:scale-90 data-ending-style:opacity-0 data-ending-style:duration-150 data-starting-style:scale-90 data-starting-style:opacity-0">
          <NavigationMenuPrimitive.Viewport className="relative size-full overflow-hidden" />
        </NavigationMenuPrimitive.Popup>
      </NavigationMenuPrimitive.Positioner>
    </NavigationMenuPrimitive.Portal>
  )
}

function NavigationMenuLink({
  className,
  ...props
}: NavigationMenuPrimitive.Link.Props) {
  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      className={cn(
        "flex items-center gap-1.5 nova:gap-2 lyra:gap-2 rhea:gap-2 rounded-md nova:rounded-lg maia:rounded-2xl lyra:rounded-none mira:rounded-lg luma:rounded-3xl sera:rounded-none rhea:rounded-2xl p-2 maia:p-3 luma:p-3 sera:p-3 rhea:px-2.5 rhea:py-1.5 text-sm lyra:text-xs mira:text-xs/relaxed rhea:font-medium transition-all outline-none hover:bg-muted focus:bg-muted focus-visible:ring-3 lyra:focus-visible:ring-1 mira:focus-visible:ring-2 sera:focus-visible:ring-2 focus-visible:ring-ring/50 mira:focus-visible:ring-ring/30 luma:focus-visible:ring-ring/30 sera:focus-visible:ring-ring/30 rhea:focus-visible:ring-ring/30 focus-visible:outline-1 in-data-[slot=navigation-menu-content]:rounded-sm nova:in-data-[slot=navigation-menu-content]:rounded-md maia:in-data-[slot=navigation-menu-content]:rounded-xl lyra:in-data-[slot=navigation-menu-content]:rounded-none mira:in-data-[slot=navigation-menu-content]:rounded-md luma:in-data-[slot=navigation-menu-content]:rounded-2xl sera:in-data-[slot=navigation-menu-content]:rounded-none rhea:in-data-[slot=navigation-menu-content]:w-full rhea:in-data-[slot=navigation-menu-content]:rounded-xl rhea:in-data-[slot=navigation-menu-content]:p-2 rhea:in-data-[slot=navigation-menu-content]:font-normal data-[active=true]:bg-muted/50 data-[active=true]:hover:bg-muted data-[active=true]:focus:bg-muted [&_svg:not([class*='size-'])]:size-4 sera:[&_svg:not([class*='size-'])]:size-3.5",
        className
      )}
      {...props}
    />
  )
}

function NavigationMenuIndicator({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof NavigationMenuPrimitive.Icon>) {
  return (
    <NavigationMenuPrimitive.Icon
      data-slot="navigation-menu-indicator"
      className={cn(
        "top-full z-1 flex h-1.5 items-end justify-center overflow-hidden data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:animate-in data-[state=visible]:fade-in",
        className
      )}
      {...props}
    >
      <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm lyra:rounded-none sera:rounded-none bg-border shadow-md" />
    </NavigationMenuPrimitive.Icon>
  )
}

export {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuPositioner,
}
