import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion"
import { cn } from "@/lib/utils"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowDown01Icon, ArrowUp01Icon } from "@hugeicons/core-free-icons"

function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex w-full flex-col maia:overflow-hidden maia:rounded-2xl maia:border mira:overflow-hidden mira:rounded-md mira:border luma:overflow-hidden luma:rounded-2xl luma:border rhea:overflow-hidden rhea:rounded-2xl rhea:border", className)}
      {...props}
    />
  )
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("not-last:border-b maia:data-open:bg-muted/50 mira:data-open:bg-muted/50 luma:data-open:bg-muted/50 rhea:data-open:bg-muted/50", className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger relative flex flex-1 items-start justify-between maia:gap-6 mira:gap-6 luma:gap-6 sera:gap-6 rhea:gap-6 rounded-md nova:rounded-lg maia:rounded-none lyra:rounded-none mira:rounded-none luma:rounded-none sera:rounded-none rhea:rounded-none border border-transparent py-4 nova:py-2.5 maia:p-4 lyra:py-2.5 mira:p-2 luma:p-4 rhea:p-4 text-left text-sm lyra:text-xs mira:text-xs/relaxed font-medium sera:font-semibold transition-all outline-none hover:underline focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 lyra:focus-visible:ring-1 sera:focus-visible:ring-2 sera:focus-visible:ring-ring/30 maia:focus-visible:border-transparent maia:focus-visible:ring-0 mira:focus-visible:border-transparent mira:focus-visible:ring-0 luma:focus-visible:border-transparent luma:focus-visible:ring-0 rhea:focus-visible:border-transparent rhea:focus-visible:ring-0 focus-visible:after:border-ring aria-disabled:pointer-events-none aria-disabled:opacity-50 **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-4 sera:**:data-[slot=accordion-trigger-icon]:size-3.5 **:data-[slot=accordion-trigger-icon]:text-muted-foreground",
          className
        )}
        {...props}
      >
        {children}
        <HugeiconsIcon icon={ArrowDown01Icon} strokeWidth={2} data-slot="accordion-trigger-icon" className="pointer-events-none shrink-0 group-aria-expanded/accordion-trigger:hidden" />
        <HugeiconsIcon icon={ArrowUp01Icon} strokeWidth={2} data-slot="accordion-trigger-icon" className="pointer-events-none hidden shrink-0 group-aria-expanded/accordion-trigger:inline" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className="overflow-hidden maia:px-4 mira:px-2 luma:px-4 rhea:px-4 text-sm lyra:text-xs mira:text-xs/relaxed data-open:animate-accordion-down data-closed:animate-accordion-up"
      {...props}
    >
      <div
        className={cn(
          "h-(--accordion-panel-height) pt-0 pb-4 nova:pb-2.5 lyra:pb-2.5 data-ending-style:h-0 data-starting-style:h-0 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
          className
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Panel>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
