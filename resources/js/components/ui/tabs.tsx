import * as React from "react"
import { Tabs as TabsPrimitive } from "@base-ui/react/tabs"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

function Tabs({
  className,
  orientation = "horizontal",
  ...props
}: TabsPrimitive.Root.Props) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      className={cn(
        "group/tabs flex gap-2 data-horizontal:flex-col",
        className
      )}
      {...props}
    />
  )
}

const tabsListVariants = cva(
  "group/tabs-list inline-flex w-fit shrink-0 items-center justify-center rounded-lg p-[3px] text-muted-foreground group-data-horizontal/tabs:h-9 group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col data-[variant=line]:rounded-none nova:group-data-horizontal/tabs:h-8 maia:rounded-4xl maia:group-data-vertical/tabs:rounded-2xl lyra:rounded-none lyra:group-data-horizontal/tabs:h-8 mira:group-data-horizontal/tabs:h-8 luma:rounded-full luma:p-1 luma:group-data-vertical/tabs:rounded-2xl sera:rounded-none sera:p-1 sera:group-data-horizontal/tabs:h-10 rhea:rounded-2xl rhea:group-data-horizontal/tabs:h-8 rhea:group-data-vertical/tabs:p-1",
  {
    variants: {
      variant: {
        default: "bg-muted",
        line: "gap-1 bg-transparent",
        sliding: "relative bg-muted",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function TabsList({
  className,
  variant = "default",
  children,
  style,
  ...props
}: TabsPrimitive.List.Props & VariantProps<typeof tabsListVariants>) {
  const listRef = React.useRef<HTMLDivElement>(null)
  const [indicator, setIndicator] = React.useState<{
    left: number
    width: number
  } | null>(null)

  const updateIndicator = React.useCallback(() => {
    const list = listRef.current
    const activeTrigger = list?.querySelector<HTMLElement>(
      ':scope > [data-slot="tabs-trigger"][data-active]'
    )

    if (!list || !activeTrigger) {
      return
    }

    const listRect = list.getBoundingClientRect()
    const triggerRect = activeTrigger.getBoundingClientRect()
    const nextIndicator = {
      left: Math.round(triggerRect.left - listRect.left + list.scrollLeft),
      width: Math.round(triggerRect.width),
    }

    setIndicator((currentIndicator) =>
      currentIndicator?.left === nextIndicator.left &&
      currentIndicator.width === nextIndicator.width
        ? currentIndicator
        : nextIndicator
    )
  }, [])

  React.useLayoutEffect(() => {
    if (variant !== "sliding") {
      setIndicator(null)

      return
    }

    const list = listRef.current

    if (!list) {
      return
    }

    updateIndicator()

    const mutationObserver = new MutationObserver(updateIndicator)
    mutationObserver.observe(list, {
      attributes: true,
      attributeFilter: ["data-active"],
      childList: true,
      subtree: true,
    })

    const resizeObserver = new ResizeObserver(updateIndicator)
    resizeObserver.observe(list)

    return () => {
      mutationObserver.disconnect()
      resizeObserver.disconnect()
    }
  }, [updateIndicator, variant])

  return (
    <TabsPrimitive.List
      ref={listRef}
      data-slot="tabs-list"
      data-variant={variant}
      style={style}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    >
      {variant === "sliding" && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-[3px] left-0 rounded-md bg-background shadow-sm transition-[transform,width,opacity] duration-200 ease-out motion-reduce:transition-none maia:rounded-xl lyra:rounded-none luma:inset-y-1 luma:rounded-full sera:inset-y-1 sera:rounded-none rhea:rounded-2xl"
          style={{
            opacity: indicator ? 1 : 0,
            transform: `translateX(${indicator?.left ?? 0}px)`,
            width: indicator ? `${indicator.width}px` : "0px",
          }}
        />
      )}
      {children}
    </TabsPrimitive.List>
  )
}

function TabsTrigger({ className, ...props }: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        "relative z-10 inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap text-foreground/60 transition-all group-data-vertical/tabs:w-full group-data-vertical/tabs:justify-start hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-disabled:pointer-events-none aria-disabled:opacity-50 dark:text-muted-foreground dark:hover:text-foreground group-data-[variant=default]/tabs-list:data-active:shadow-sm group-data-[variant=line]/tabs-list:data-active:shadow-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 nova:px-1.5 nova:py-0.5 nova:has-data-[icon=inline-end]:pr-1 nova:has-data-[icon=inline-start]:pl-1 maia:rounded-xl maia:group-data-vertical/tabs:px-2.5 maia:group-data-vertical/tabs:py-1.5 maia:group-data-[variant=default]/tabs-list:data-active:shadow-none lyra:rounded-none lyra:px-1.5 lyra:py-0.5 lyra:text-xs lyra:group-data-vertical/tabs:py-[calc(--spacing(1.25))] lyra:has-data-[icon=inline-end]:pr-1 lyra:has-data-[icon=inline-start]:pl-1 lyra:group-data-[variant=default]/tabs-list:data-active:shadow-none mira:px-1.5 mira:py-0.5 mira:text-xs mira:group-data-vertical/tabs:py-[calc(--spacing(1.25))] mira:has-data-[icon=inline-end]:pr-1 mira:has-data-[icon=inline-start]:pl-1 mira:group-data-[variant=default]/tabs-list:data-active:shadow-none mira:[&_svg:not([class*='size-'])]:size-3.5 luma:gap-2 luma:rounded-full luma:border-transparent! luma:px-3 luma:group-data-vertical/tabs:rounded-2xl luma:group-data-vertical/tabs:px-3 luma:group-data-vertical/tabs:py-1.5 luma:has-data-[icon=inline-end]:pr-2 luma:has-data-[icon=inline-start]:pl-2 luma:group-data-[variant=default]/tabs-list:data-active:shadow-none sera:gap-2 sera:rounded-none sera:px-4 sera:py-1.5 sera:text-xs sera:font-semibold sera:tracking-wider sera:uppercase sera:group-data-vertical/tabs:px-4 sera:group-data-vertical/tabs:py-2 sera:has-data-[icon=inline-end]:pr-2.5 sera:has-data-[icon=inline-start]:pl-2.5 sera:group-data-[variant=default]/tabs-list:data-active:shadow-none sera:[&_svg:not([class*='size-'])]:size-3.5 rhea:rounded-2xl rhea:border-transparent! rhea:px-1.5 rhea:py-0.5 rhea:group-data-vertical/tabs:px-3 rhea:group-data-vertical/tabs:py-0.5 rhea:group-data-[variant=default]/tabs-list:data-active:shadow-none",
        "group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-active:bg-transparent dark:group-data-[variant=line]/tabs-list:data-active:border-transparent dark:group-data-[variant=line]/tabs-list:data-active:bg-transparent",
        "data-active:bg-background data-active:text-foreground dark:data-active:border-input dark:data-active:bg-input/30 dark:data-active:text-foreground group-data-[variant=sliding]/tabs-list:data-active:bg-transparent group-data-[variant=sliding]/tabs-list:dark:data-active:border-transparent group-data-[variant=sliding]/tabs-list:dark:data-active:bg-transparent",
        "after:absolute after:bg-foreground after:opacity-0 after:transition-opacity group-data-horizontal/tabs:after:inset-x-0 group-data-horizontal/tabs:after:bottom-[-5px] group-data-horizontal/tabs:after:h-0.5 group-data-vertical/tabs:after:inset-y-0 group-data-vertical/tabs:after:-right-1 group-data-vertical/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-active:after:opacity-100",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn("flex-1 text-sm outline-none lyra:text-xs/relaxed mira:text-xs/relaxed", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants }
