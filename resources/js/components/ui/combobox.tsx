"use client"

import * as React from "react"
import { Combobox as ComboboxPrimitive } from "@base-ui/react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowDown01Icon, Cancel01Icon, Tick02Icon } from "@hugeicons/core-free-icons"

const Combobox = ComboboxPrimitive.Root

function ComboboxValue({ ...props }: ComboboxPrimitive.Value.Props) {
  return <ComboboxPrimitive.Value data-slot="combobox-value" {...props} />
}

function ComboboxTrigger({
  className,
  children,
  ...props
}: ComboboxPrimitive.Trigger.Props) {
  return (
    <ComboboxPrimitive.Trigger
      data-slot="combobox-trigger"
      className={cn("[&_svg:not([class*='size-'])]:size-4", className)}
      {...props}
    >
      {children}
      <HugeiconsIcon icon={ArrowDown01Icon} strokeWidth={2} className="pointer-events-none size-4 mira:size-3.5 sera:size-3.5 text-muted-foreground" />
    </ComboboxPrimitive.Trigger>
  )
}

function ComboboxClear({ className, ...props }: ComboboxPrimitive.Clear.Props) {
  return (
    <ComboboxPrimitive.Clear
      data-slot="combobox-clear"
      render={<InputGroupButton variant="ghost" size="icon-xs" />}
      className={cn(className)}
      {...props}
    >
      <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} className="pointer-events-none" />
    </ComboboxPrimitive.Clear>
  )
}

function ComboboxInput({
  className,
  children,
  disabled = false,
  showTrigger = true,
  showClear = false,
  ...props
}: ComboboxPrimitive.Input.Props & {
  showTrigger?: boolean
  showClear?: boolean
}) {
  return (
    <InputGroup className={cn("w-auto", className)}>
      <ComboboxPrimitive.Input
        render={<InputGroupInput disabled={disabled} />}
        {...props}
      />
      <InputGroupAddon align="inline-end">
        {showTrigger && (
          <InputGroupButton
            size="icon-xs"
            variant="ghost"
            data-slot="input-group-button"
            className="group-has-data-[slot=combobox-clear]/input-group:hidden data-pressed:bg-transparent"
            disabled={disabled} render={<ComboboxTrigger />} />
        )}
        {showClear && <ComboboxClear disabled={disabled} />}
      </InputGroupAddon>
      {children}
    </InputGroup>
  )
}

function ComboboxContent({
  className,
  side = "bottom",
  sideOffset = 6,
  align = "start",
  alignOffset = 0,
  anchor,
  ...props
}: ComboboxPrimitive.Popup.Props &
  Pick<
    ComboboxPrimitive.Positioner.Props,
    "side" | "align" | "sideOffset" | "alignOffset" | "anchor"
  >) {
  return (
    <ComboboxPrimitive.Portal>
      <ComboboxPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        anchor={anchor}
        className="isolate z-50"
      >
        <ComboboxPrimitive.Popup
          data-slot="combobox-content"
          data-chips={!!anchor}
          className={cn("group/combobox-content relative max-h-(--available-height) w-(--anchor-width) max-w-(--available-width) min-w-[calc(var(--anchor-width)+--spacing(7))] origin-(--transform-origin) overflow-hidden rounded-lg vega:rounded-md maia:rounded-2xl lyra:rounded-none luma:rounded-3xl sera:rounded-none rhea:rounded-2xl bg-popover text-popover-foreground shadow-md maia:shadow-2xl luma:shadow-lg rhea:shadow-lg ring-1 ring-foreground/10 maia:ring-foreground/5 luma:ring-foreground/5 luma:dark:ring-foreground/10 rhea:ring-foreground/5 rhea:dark:ring-foreground/10 duration-100 data-[chips=true]:min-w-(--anchor-width) data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 *:data-[slot=input-group]:m-1 luma:*:data-[slot=input-group]:m-1.5 sera:*:data-[slot=input-group]:m-1.5 *:data-[slot=input-group]:mb-0 *:data-[slot=input-group]:h-8 maia:*:data-[slot=input-group]:h-9 mira:*:data-[slot=input-group]:h-7 *:data-[slot=input-group]:border-input/30 maia:*:data-[slot=input-group]:border-none mira:*:data-[slot=input-group]:border-none sera:*:data-[slot=input-group]:border-transparent sera:*:data-[slot=input-group]:focus-within:border-transparent *:data-[slot=input-group]:bg-input/30 mira:*:data-[slot=input-group]:bg-input/20 luma:*:data-[slot=input-group]:bg-input/50 sera:*:data-[slot=input-group]:bg-transparent sera:*:data-[slot=input-group]:px-2.5 rhea:*:data-[slot=input-group]:bg-input/50 *:data-[slot=input-group]:shadow-none data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", className )}
          {...props}
        />
      </ComboboxPrimitive.Positioner>
    </ComboboxPrimitive.Portal>
  )
}

function ComboboxList({ className, ...props }: ComboboxPrimitive.List.Props) {
  return (
    <ComboboxPrimitive.List
      data-slot="combobox-list"
      className={cn(
        "no-scrollbar max-h-[min(calc(--spacing(72)---spacing(9)),calc(var(--available-height)---spacing(9)))] scroll-py-1 luma:scroll-py-1.5 sera:scroll-py-1.5 overflow-y-auto overscroll-contain p-1 lyra:p-0 luma:p-1.5 sera:p-1.5 data-empty:p-0",
        className
      )}
      {...props}
    />
  )
}

function ComboboxItem({
  className,
  children,
  ...props
}: ComboboxPrimitive.Item.Props) {
  return (
    <ComboboxPrimitive.Item
      data-slot="combobox-item"
      className={cn(
        "relative flex w-full cursor-default items-center gap-2 maia:gap-2.5 luma:gap-2.5 sera:gap-2.5 rounded-md vega:rounded-sm maia:rounded-xl lyra:rounded-none luma:rounded-2xl sera:rounded-none rhea:rounded-xl py-1 vega:py-1.5 maia:py-2 lyra:py-2 luma:py-2 sera:py-2 rhea:py-1.5 mira:min-h-7 rhea:min-h-7 pr-8 pl-1.5 vega:pl-2 maia:pl-3 lyra:pl-2 mira:px-2 luma:pl-3 sera:pl-3 rhea:pl-2 text-sm lyra:text-xs mira:text-xs/relaxed luma:font-medium outline-hidden select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground not-data-[variant=destructive]:data-highlighted:**:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 mira:[&_svg:not([class*='size-'])]:size-3.5 sera:[&_svg:not([class*='size-'])]:size-3.5",
        className
      )}
      {...props}
    >
      {children}
      <ComboboxPrimitive.ItemIndicator
        render={
          <span className="pointer-events-none absolute right-2 flex size-4 items-center justify-center" />
        }
      >
        <HugeiconsIcon icon={Tick02Icon} strokeWidth={2} className="pointer-events-none" />
      </ComboboxPrimitive.ItemIndicator>
    </ComboboxPrimitive.Item>
  )
}

function ComboboxGroup({ className, ...props }: ComboboxPrimitive.Group.Props) {
  return (
    <ComboboxPrimitive.Group
      data-slot="combobox-group"
      className={cn(className)}
      {...props}
    />
  )
}

function ComboboxLabel({
  className,
  ...props
}: ComboboxPrimitive.GroupLabel.Props) {
  return (
    <ComboboxPrimitive.GroupLabel
      data-slot="combobox-label"
      className={cn("px-2 maia:px-3.5 luma:px-3 sera:px-3 py-1.5 maia:py-2.5 lyra:py-2 luma:py-2.5 sera:py-2 text-xs sera:font-semibold sera:tracking-wider sera:uppercase text-muted-foreground", className)}
      {...props}
    />
  )
}

function ComboboxCollection({ ...props }: ComboboxPrimitive.Collection.Props) {
  return (
    <ComboboxPrimitive.Collection data-slot="combobox-collection" {...props} />
  )
}

function ComboboxEmpty({ className, ...props }: ComboboxPrimitive.Empty.Props) {
  return (
    <ComboboxPrimitive.Empty
      data-slot="combobox-empty"
      className={cn(
        "hidden w-full justify-center py-2 text-center text-sm lyra:text-xs mira:text-xs/relaxed text-muted-foreground group-data-empty/combobox-content:flex",
        className
      )}
      {...props}
    />
  )
}

function ComboboxSeparator({
  className,
  ...props
}: ComboboxPrimitive.Separator.Props) {
  return (
    <ComboboxPrimitive.Separator
      data-slot="combobox-separator"
      className={cn("-mx-1 luma:-mx-1.5 sera:-mx-1.5 my-1 lyra:my-0 luma:my-1.5 sera:my-1.5 h-px bg-border maia:bg-border/50 mira:bg-border/50 sera:bg-border/50", className)}
      {...props}
    />
  )
}

function ComboboxChips({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof ComboboxPrimitive.Chips> &
  ComboboxPrimitive.Chips.Props) {
  return (
    <ComboboxPrimitive.Chips
      data-slot="combobox-chips"
      className={cn(
        "flex min-h-8 vega:min-h-9 maia:min-h-9 mira:min-h-7 luma:min-h-9 sera:min-h-10 flex-wrap items-center gap-1 vega:gap-1.5 maia:gap-1.5 luma:gap-1.5 sera:gap-1.5 rounded-lg vega:rounded-md maia:rounded-4xl lyra:rounded-none mira:rounded-md luma:rounded-3xl sera:rounded-none rhea:rounded-2xl border border-input luma:border-transparent sera:border-transparent sera:border-b-input rhea:border-transparent bg-transparent maia:bg-input/30 mira:bg-input/20 luma:bg-input/50 rhea:bg-input/50 bg-clip-padding px-2.5 mira:px-2 luma:px-3 sera:px-0 py-1 vega:py-1.5 maia:py-1.5 mira:py-0.5 luma:py-1.5 sera:py-1.5 text-sm lyra:text-xs mira:text-xs/relaxed vega:shadow-xs transition-colors focus-within:border-ring sera:focus-within:border-transparent sera:focus-within:border-b-ring focus-within:ring-3 lyra:focus-within:ring-1 mira:focus-within:ring-2 sera:focus-within:ring-0 focus-within:ring-ring/50 mira:focus-within:ring-ring/30 luma:focus-within:ring-ring/30 rhea:focus-within:ring-ring/30 has-aria-invalid:border-destructive sera:has-aria-invalid:border-transparent sera:has-aria-invalid:border-b-destructive has-aria-invalid:ring-3 lyra:has-aria-invalid:ring-1 mira:has-aria-invalid:ring-2 sera:has-aria-invalid:ring-0 has-aria-invalid:ring-destructive/20 has-data-[slot=combobox-chip]:px-1 vega:has-data-[slot=combobox-chip]:px-1.5 maia:has-data-[slot=combobox-chip]:px-1.5 luma:has-data-[slot=combobox-chip]:px-1.5 sera:has-data-[slot=combobox-chip]:px-0 dark:bg-input/30 luma:dark:bg-input/50 sera:dark:bg-transparent rhea:dark:bg-input/50 dark:has-aria-invalid:border-destructive/50 sera:dark:has-aria-invalid:border-transparent sera:dark:has-aria-invalid:border-b-destructive/50 dark:has-aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

function ComboboxChip({
  className,
  children,
  showRemove = true,
  ...props
}: ComboboxPrimitive.Chip.Props & {
  showRemove?: boolean
}) {
  return (
    <ComboboxPrimitive.Chip
      data-slot="combobox-chip"
      className={cn(
        "flex h-[calc(--spacing(5.25))] vega:h-[calc(--spacing(5.5))] maia:h-[calc(--spacing(5.5))] mira:h-[calc(--spacing(4.75))] luma:h-[calc(--spacing(5.5))] sera:h-[calc(--spacing(5.5))] w-fit items-center justify-center gap-1 rounded-sm maia:rounded-4xl lyra:rounded-none mira:rounded-[calc(var(--radius-sm)-2px)] luma:rounded-3xl sera:rounded-none rhea:rounded-2xl bg-muted maia:bg-muted-foreground/10 mira:bg-muted-foreground/10 luma:bg-input luma:dark:bg-input/60 rhea:bg-input rhea:dark:bg-input/60 px-1.5 maia:px-2 luma:px-2 sera:px-2 text-xs mira:text-xs/relaxed font-medium whitespace-nowrap text-foreground has-disabled:pointer-events-none has-disabled:cursor-not-allowed has-disabled:opacity-50 has-data-[slot=combobox-chip-remove]:pr-0 rhea:has-data-[slot=combobox-chip-remove]:pr-0.5",
        className
      )}
      {...props}
    >
      {children}
      {showRemove && (
        <ComboboxPrimitive.ChipRemove
          render={<Button variant="ghost" size="icon-xs" />}
          className="-ml-1 rhea:-ml-0.5 rhea:size-4.5 opacity-50 hover:opacity-100"
          data-slot="combobox-chip-remove"
        >
          <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} className="pointer-events-none" />
        </ComboboxPrimitive.ChipRemove>
      )}
    </ComboboxPrimitive.Chip>
  )
}

function ComboboxChipsInput({
  className,
  ...props
}: ComboboxPrimitive.Input.Props) {
  return (
    <ComboboxPrimitive.Input
      data-slot="combobox-chip-input"
      className={cn("min-w-16 flex-1 outline-none", className)}
      {...props}
    />
  )
}

function useComboboxAnchor() {
  return React.useRef<HTMLDivElement | null>(null)
}

export {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxCollection,
  ComboboxEmpty,
  ComboboxSeparator,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipsInput,
  ComboboxTrigger,
  ComboboxValue,
  useComboboxAnchor,
}
