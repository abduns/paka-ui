import * as React from "react"
import { Command as CommandPrimitive } from "cmdk"

import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  InputGroup,
  InputGroupAddon,
} from "@/components/ui/input-group"
import { HugeiconsIcon } from "@hugeicons/react"
import { SearchIcon, Tick02Icon } from "@hugeicons/core-free-icons"

function Command({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn(
        "flex size-full flex-col overflow-hidden rounded-xl! maia:rounded-4xl! lyra:rounded-none! luma:rounded-4xl! sera:rounded-none! rhea:rounded-3xl! bg-popover p-1 lyra:p-0 sera:p-0 text-popover-foreground",
        className
      )}
      {...props}
    />
  )
}

function CommandDialog({
  title = "Command Palette",
  description = "Search for a command to run...",
  children,
  className,
  showCloseButton = false,
  ...props
}: Omit<React.ComponentProps<typeof Dialog>, "children"> & {
  title?: string
  description?: string
  className?: string
  showCloseButton?: boolean
  children: React.ReactNode
}) {
  return (
    <Dialog {...props}>
      <DialogContent
        className={cn(
          "top-1/3 w-lg translate-y-0 overflow-hidden rounded-xl! maia:rounded-4xl! lyra:rounded-none! luma:rounded-4xl! sera:rounded-none! rhea:rounded-3xl! p-0",
          className
        )}
        showCloseButton={showCloseButton}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <Command>{children}</Command>
      </DialogContent>
    </Dialog>
  )
}

function CommandInput({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Input>) {
  return (
    <div data-slot="command-input-wrapper" className="p-1 pb-0 lyra:border-b lyra:p-0 sera:pb-1">
      <InputGroup className="h-8! maia:h-9! luma:h-9! sera:h-10! rounded-lg! maia:rounded-4xl! lyra:rounded-none! mira:rounded-md! luma:rounded-4xl! sera:rounded-none! rhea:rounded-2xl! border-input/30 maia:border-input lyra:border-none mira:border-input luma:border-transparent sera:border-transparent sera:border-b-input rhea:border-transparent bg-input/30 mira:bg-input/20 mira:dark:bg-input/30 luma:bg-input/50 sera:bg-transparent rhea:bg-input/50 sera:px-3 shadow-none! *:data-[slot=input-group-addon]:pl-2!">
        <CommandPrimitive.Input
          data-slot="command-input"
          className={cn(
            "w-full text-sm lyra:text-xs mira:text-xs/relaxed sera:px-2 outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          {...props}
        />
        <InputGroupAddon>
          <HugeiconsIcon icon={SearchIcon} strokeWidth={2} className="size-4 mira:size-3.5 sera:size-3.5 shrink-0 opacity-50" />
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}

function CommandList({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={cn(
        "no-scrollbar max-h-72 scroll-py-1 lyra:scroll-py-0 overflow-x-hidden overflow-y-auto outline-none",
        className
      )}
      {...props}
    />
  )
}

function CommandEmpty({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className={cn("py-6 text-center text-sm lyra:text-xs mira:text-xs/relaxed", className)}
      {...props}
    />
  )
}

function CommandGroup({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn(
        "overflow-hidden p-1 lyra:p-0 luma:p-1.5 sera:p-1.5 text-foreground **:[[cmdk-group-heading]]:px-2 maia:**:[[cmdk-group-heading]]:px-3 mira:**:[[cmdk-group-heading]]:px-2.5 luma:**:[[cmdk-group-heading]]:px-3 sera:**:[[cmdk-group-heading]]:px-3 **:[[cmdk-group-heading]]:py-1.5 maia:**:[[cmdk-group-heading]]:py-2 luma:**:[[cmdk-group-heading]]:py-2 sera:**:[[cmdk-group-heading]]:py-2 **:[[cmdk-group-heading]]:text-xs **:[[cmdk-group-heading]]:font-medium lyra:**:[[cmdk-group-heading]]:font-normal sera:**:[[cmdk-group-heading]]:font-semibold sera:**:[[cmdk-group-heading]]:tracking-wider sera:**:[[cmdk-group-heading]]:uppercase **:[[cmdk-group-heading]]:text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function CommandSeparator({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      className={cn("-mx-1 maia:mx-0 luma:mx-0 sera:-mx-1.5 rhea:mx-0 maia:my-1 mira:my-1 luma:my-1.5 sera:my-1.5 rhea:my-1 h-px w-auto bg-border maia:bg-border/50 mira:bg-border/50 luma:bg-border/50 sera:bg-border/50 rhea:bg-border/50", className)}
      {...props}
    />
  )
}

function CommandItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(
        "group/command-item relative flex cursor-default items-center gap-2 rounded-sm maia:rounded-lg lyra:rounded-none mira:rounded-md luma:rounded-2xl sera:rounded-none rhea:rounded-xl px-2 maia:px-3 mira:px-2.5 luma:px-3 sera:px-3 py-1.5 maia:py-2 lyra:py-2 luma:py-2 sera:py-2 mira:min-h-7 rhea:min-h-7 text-sm lyra:text-xs mira:text-xs/relaxed luma:font-medium outline-hidden select-none in-data-[slot=dialog-content]:rounded-lg! maia:in-data-[slot=dialog-content]:rounded-2xl! lyra:in-data-[slot=dialog-content]:rounded-none! mira:in-data-[slot=dialog-content]:rounded-md! luma:in-data-[slot=dialog-content]:rounded-3xl! sera:in-data-[slot=dialog-content]:rounded-none! rhea:in-data-[slot=dialog-content]:rounded-2xl! data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 data-selected:bg-muted data-selected:text-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 mira:[&_svg:not([class*='size-'])]:size-3.5 sera:[&_svg:not([class*='size-'])]:size-3.5 data-selected:**:[svg]:text-foreground",
        className
      )}
      {...props}
    >
      {children}
      <HugeiconsIcon icon={Tick02Icon} strokeWidth={2} className="ml-auto opacity-0 group-has-data-[slot=command-shortcut]/command-item:hidden group-data-[checked=true]/command-item:opacity-100" />
    </CommandPrimitive.Item>
  )
}

function CommandShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="command-shortcut"
      className={cn(
        "ml-auto text-xs mira:text-[0.625rem] tracking-widest text-muted-foreground group-data-selected/command-item:text-foreground",
        className
      )}
      {...props}
    />
  )
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}
