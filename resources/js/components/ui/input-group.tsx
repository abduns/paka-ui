"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

function InputGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-group"
      role="group"
      className={cn(
        "group/input-group relative flex h-9 w-full min-w-0 items-center rounded-md border border-input shadow-xs transition-[color,box-shadow] outline-none in-data-[slot=combobox-content]:focus-within:border-inherit in-data-[slot=combobox-content]:focus-within:ring-0 has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-3 has-[[data-slot=input-group-control]:focus-visible]:ring-zinc-200 dark:has-[[data-slot=input-group-control]:focus-visible]:ring-zinc-800 has-[[data-slot][aria-invalid=true]]:border-destructive has-[[data-slot][aria-invalid=true]]:ring-3 has-[[data-slot][aria-invalid=true]]:ring-destructive/20 has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>textarea]:h-auto dark:bg-input/30 dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40 has-[>[data-align=block-end]]:[&>input]:pt-3 has-[>[data-align=block-start]]:[&>input]:pb-3 has-[>[data-align=inline-end]]:[&>input]:pr-1.5 has-[>[data-align=inline-start]]:[&>input]:pl-1.5 nova:h-8 nova:rounded-lg nova:shadow-none nova:has-disabled:bg-input/50 nova:has-disabled:opacity-50 nova:dark:has-disabled:bg-input/80 maia:rounded-4xl maia:bg-input/30 maia:shadow-none maia:has-data-[align=block-end]:rounded-2xl maia:has-data-[align=block-start]:rounded-2xl maia:has-[textarea]:rounded-xl lyra:h-8 lyra:rounded-none lyra:shadow-none lyra:has-disabled:bg-input/50 lyra:has-disabled:opacity-50 lyra:has-[[data-slot=input-group-control]:focus-visible]:ring-1 lyra:has-[[data-slot][aria-invalid=true]]:ring-1 lyra:dark:has-disabled:bg-input/80 mira:h-7 mira:bg-input/20 mira:shadow-none mira:has-[[data-slot=input-group-control]:focus-visible]:ring-2 mira:has-[[data-slot][aria-invalid=true]]:ring-2 luma:rounded-4xl luma:border-transparent luma:bg-input/50 luma:shadow-none luma:has-data-[align=block-end]:rounded-3xl luma:has-data-[align=block-start]:rounded-3xl luma:has-[textarea]:rounded-2xl sera:h-10 sera:rounded-none sera:border-transparent sera:border-b-input sera:shadow-none sera:transition-[color,border-color] sera:has-[[data-slot=input-group-control]:focus-visible]:border-transparent sera:has-[[data-slot=input-group-control]:focus-visible]:border-b-ring sera:has-[[data-slot=input-group-control]:focus-visible]:ring-0 sera:has-[[data-slot][aria-invalid=true]]:border-transparent sera:has-[[data-slot][aria-invalid=true]]:border-b-destructive sera:has-[[data-slot][aria-invalid=true]]:ring-0 sera:dark:bg-transparent sera:dark:has-[[data-slot][aria-invalid=true]]:border-b-destructive/50 sera:has-[>[data-align=inline-end]]:[&>input]:pr-2 sera:has-[>[data-align=inline-start]]:[&>input]:pl-2 rhea:h-8 rhea:rounded-2xl rhea:border-transparent rhea:bg-input/50 rhea:shadow-none rhea:duration-200",
        className
      )}
      {...props}
    />
  )
}

const inputGroupAddonVariants = cva(
  "flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-sm font-medium text-muted-foreground select-none group-data-[disabled=true]/input-group:opacity-50 [&>kbd]:rounded-[calc(var(--radius)-5px)] [&>svg:not([class*='size-'])]:size-4 maia:py-2 maia:[&>kbd]:rounded-4xl lyra:text-xs lyra:[&>kbd]:rounded-none mira:gap-1 mira:py-2 mira:text-xs/relaxed mira:[&>kbd]:rounded-[calc(var(--radius-sm)-2px)] mira:[&>svg:not([class*='size-'])]:size-3.5 luma:py-2 luma:[&>kbd]:rounded-3xl sera:py-2 sera:[&>kbd]:rounded-none sera:[&>svg:not([class*='size-'])]:size-3.5 rhea:[&>kbd]:rounded-2xl",
  {
    variants: {
      align: {
        "inline-start":
          "order-first pl-2 has-[>button]:-ml-1 has-[>kbd]:ml-[-0.15rem] nova:has-[>button]:ml-[-0.3rem] maia:pl-3 lyra:has-[>button]:ml-[-0.3rem] mira:has-[>button]:ml-[-0.275rem] mira:has-[>kbd]:ml-[-0.275rem] luma:pl-3 luma:has-[>kbd]:-ml-1 sera:pl-0 sera:has-[>button]:ml-0 sera:has-[>kbd]:ml-0 rhea:has-[>button]:ml-[-0.3rem]",
        "inline-end":
          "order-last pr-2 has-[>button]:-mr-1 has-[>kbd]:mr-[-0.15rem] nova:has-[>button]:mr-[-0.3rem] maia:pr-3 lyra:has-[>button]:mr-[-0.3rem] mira:has-[>button]:mr-[-0.275rem] mira:has-[>kbd]:mr-[-0.275rem] luma:pr-3 luma:has-[>kbd]:-mr-1 sera:pr-0 sera:has-[>button]:mr-0 sera:has-[>kbd]:mr-0 rhea:has-[>button]:mr-[-0.3rem]",
        "block-start":
          "order-first w-full justify-start px-2.5 pt-2 group-has-[>input]/input-group:pt-2 [.border-b]:pb-2 maia:px-3 maia:pt-3 maia:group-has-[>input]/input-group:pt-3 maia:[.border-b]:pb-3 mira:px-2 luma:px-3 luma:pt-3 luma:group-has-[>input]/input-group:pt-3.5 luma:[.border-b]:pb-3.5 sera:px-0 sera:pt-3 sera:group-has-[>input]/input-group:pt-3.5 sera:[.border-b]:pb-3.5",
        "block-end":
          "order-last w-full justify-start px-2.5 pb-2 group-has-[>input]/input-group:pb-2 [.border-t]:pt-2 maia:px-3 maia:pb-3 maia:group-has-[>input]/input-group:pb-3 maia:[.border-t]:pt-3 mira:px-2 luma:px-3 luma:pb-3 luma:group-has-[>input]/input-group:pb-3.5 luma:[.border-t]:pt-3.5 sera:px-0 sera:pb-3 sera:group-has-[>input]/input-group:pb-3.5 sera:[.border-t]:pt-3.5",
      },
    },
    defaultVariants: {
      align: "inline-start",
    },
  }
)

function InputGroupAddon({
  className,
  align = "inline-start",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof inputGroupAddonVariants>) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("button")) {
          return
        }
        e.currentTarget.parentElement?.querySelector("input")?.focus()
      }}
      {...props}
    />
  )
}

const inputGroupButtonVariants = cva(
  "flex items-center gap-2 text-sm shadow-none maia:rounded-4xl lyra:text-xs mira:rounded-md mira:text-xs/relaxed luma:rounded-4xl sera:rounded-none rhea:rounded-2xl",
  {
    variants: {
      size: {
        xs: "h-6 gap-1 rounded-[calc(var(--radius)-5px)] px-1.5 [&>svg:not([class*='size-'])]:size-3.5 nova:rounded-[calc(var(--radius)-3px)] maia:rounded-4xl lyra:rounded-none mira:h-5 mira:rounded-[calc(var(--radius-sm)-2px)] mira:px-1 mira:[&>svg:not([class*='size-'])]:size-3 luma:rounded-xl sera:rounded-none sera:text-xs rhea:rounded-xl",
        sm: "lyra:gap-1 mira:gap-1",
        "icon-xs":
          "size-6 rounded-[calc(var(--radius)-5px)] p-0 has-[>svg]:p-0 nova:rounded-[calc(var(--radius)-3px)] maia:rounded-4xl lyra:rounded-none mira:rounded-md luma:rounded-xl sera:rounded-none sera:text-xs rhea:rounded-xl",
        "icon-sm": "size-8 p-0 has-[>svg]:p-0 lyra:size-7 mira:size-7",
      },
    },
    defaultVariants: {
      size: "xs",
    },
  }
)

function InputGroupButton({
  className,
  type = "button",
  variant = "ghost",
  size = "xs",
  ...props
}: Omit<React.ComponentProps<typeof Button>, "size"> &
  VariantProps<typeof inputGroupButtonVariants>) {
  return (
    <Button
      type={type}
      data-size={size}
      variant={variant}
      className={cn(inputGroupButtonVariants({ size }), className)}
      {...props}
    />
  )
}

function InputGroupText({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "flex items-center gap-2 text-sm text-muted-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 lyra:text-xs mira:text-xs/relaxed sera:[&_svg:not([class*='size-'])]:size-3.5",
        className
      )}
      {...props}
    />
  )
}

function InputGroupInput({
  className,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <Input
      data-slot="input-group-control"
      className={cn(
        "flex-1 rounded-none border-0 bg-transparent shadow-none ring-0 focus-visible:ring-0 aria-invalid:ring-0 dark:bg-transparent nova:disabled:bg-transparent nova:dark:disabled:bg-transparent lyra:disabled:bg-transparent lyra:dark:disabled:bg-transparent",
        className
      )}
      {...props}
    />
  )
}

function InputGroupTextarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <Textarea
      data-slot="input-group-control"
      className={cn(
        "flex-1 resize-none rounded-none border-0 bg-transparent py-2 shadow-none ring-0 focus-visible:ring-0 aria-invalid:ring-0 dark:bg-transparent nova:disabled:bg-transparent nova:dark:disabled:bg-transparent lyra:disabled:bg-transparent lyra:dark:disabled:bg-transparent luma:py-2.5 sera:py-2.5",
        className
      )}
      {...props}
    />
  )
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
}
