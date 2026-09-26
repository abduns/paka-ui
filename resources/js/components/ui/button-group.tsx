import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva } from "class-variance-authority"
import type { VariantProps } from "class-variance-authority"

import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

const buttonGroupVariants = cva(
  "flex w-fit items-stretch *:focus-visible:relative *:focus-visible:z-10 has-[>[data-slot=button-group]]:gap-2 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-md nova:has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-lg maia:has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-4xl lyra:rounded-none lyra:has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-none luma:has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-4xl sera:has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-none rhea:has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-2xl [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1 luma:has-[>[data-variant=outline]]:*:data-[slot=input-group]:border-border luma:has-[>[data-variant=outline]]:*:data-[slot=select-trigger]:border-border luma:has-[>[data-variant=outline]]:[&>[data-slot=input-group]:has(:focus-visible)]:border-ring luma:has-[>[data-variant=outline]]:[&>[data-slot=select-trigger]:focus-visible]:border-ring luma:has-[>[data-variant=outline]]:[&>input]:border-border luma:has-[>[data-variant=outline]]:[&>input:focus-visible]:border-ring sera:has-[>[data-variant=outline]]:*:data-[slot=input-group]:border-border sera:has-[>[data-variant=outline]]:*:data-[slot=select-trigger]:border-border sera:has-[>[data-variant=outline]]:[&>[data-slot=input-group]:has(:focus-visible)]:border-ring sera:has-[>[data-variant=outline]]:[&>[data-slot=select-trigger]:focus-visible]:border-ring sera:has-[>[data-variant=outline]]:[&>input]:border-border sera:has-[>[data-variant=outline]]:[&>input:focus-visible]:border-ring sera:*:data-[slot=input]:px-4 sera:has-[>[data-variant=outline]]:*:data-[slot=input-group]:px-2.5 sera:has-[>[data-variant=outline]]:*:[[role=combobox]]:px-2.5 rhea:has-[>[data-variant=outline]]:*:data-[slot=input-group]:border-border rhea:has-[>[data-variant=outline]]:*:data-[slot=select-trigger]:border-border rhea:has-[>[data-variant=outline]]:[&>[data-slot=input-group]:has(:focus-visible)]:border-ring rhea:has-[>[data-variant=outline]]:[&>[data-slot=select-trigger]:focus-visible]:border-ring rhea:has-[>[data-variant=outline]]:[&>input]:border-border rhea:has-[>[data-variant=outline]]:[&>input:focus-visible]:border-ring",
  {
    variants: {
      orientation: {
        horizontal:
          "*:data-slot:rounded-r-none [&>[data-slot]:not(:has(~[data-slot]))]:rounded-r-md! nova:[&>[data-slot]:not(:has(~[data-slot]))]:rounded-r-lg! maia:[&>[data-slot]:not(:has(~[data-slot]))]:rounded-r-4xl! lyra:[&>[data-slot]:not(:has(~[data-slot]))]:rounded-none! luma:[&>[data-slot]:not(:has(~[data-slot]))]:rounded-r-4xl! sera:[&>[data-slot]:not(:has(~[data-slot]))]:rounded-none! rhea:[&>[data-slot]:not(:has(~[data-slot]))]:rounded-r-2xl! [&>[data-slot]~[data-slot]]:rounded-l-none [&>[data-slot]~[data-slot]]:border-l-0",
        vertical:
          "flex-col *:data-slot:rounded-b-none [&>[data-slot]:not(:has(~[data-slot]))]:rounded-b-md! nova:[&>[data-slot]:not(:has(~[data-slot]))]:rounded-b-lg! maia:[&>[data-slot]:not(:has(~[data-slot]))]:rounded-b-4xl! lyra:[&>[data-slot]:not(:has(~[data-slot]))]:rounded-none! luma:[&>[data-slot]:not(:has(~[data-slot]))]:rounded-b-4xl! sera:[&>[data-slot]:not(:has(~[data-slot]))]:rounded-none! rhea:[&>[data-slot]:not(:has(~[data-slot]))]:rounded-b-2xl! [&>[data-slot]~[data-slot]]:rounded-t-none [&>[data-slot]~[data-slot]]:border-t-0",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  }
)

function ButtonGroup({
  className,
  orientation,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof buttonGroupVariants>) {
  return (
    <div
      role="group"
      data-slot="button-group"
      data-orientation={orientation}
      className={cn(buttonGroupVariants({ orientation }), className)}
      {...props}
    />
  )
}

function ButtonGroupText({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">) {
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        className: cn(
          "flex items-center gap-2 rounded-md nova:rounded-lg maia:rounded-4xl lyra:rounded-none luma:rounded-4xl sera:rounded-none rhea:rounded-2xl border sera:border-transparent sera:border-b-input bg-muted sera:bg-transparent px-2.5 text-sm lyra:text-xs mira:text-xs/relaxed sera:text-xs font-medium sera:font-semibold sera:uppercase shadow-xs nova:shadow-none maia:shadow-none lyra:shadow-none mira:shadow-none luma:shadow-none sera:shadow-none rhea:shadow-none sera:group-has-[>[data-variant=outline]]/button-group:border-border [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 sera:[&_svg:not([class*='size-'])]:size-3.5",
          className
        ),
      },
      props
    ),
    render,
    state: {
      slot: "button-group-text",
    },
  })
}

function ButtonGroupSeparator({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="button-group-separator"
      orientation={orientation}
      className={cn(
        "relative self-stretch bg-input data-horizontal:mx-px data-horizontal:w-auto data-vertical:my-px data-vertical:h-auto",
        className
      )}
      {...props}
    />
  )
}

export {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
  buttonGroupVariants,
}
