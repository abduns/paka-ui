"use client"

import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"

import { cn } from "@/lib/utils"
import { HugeiconsIcon } from "@hugeicons/react"
import { MinusSignIcon } from "@hugeicons/core-free-icons"

function InputOTP({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string
}) {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn(
        "cn-input-otp flex items-center has-disabled:opacity-50",
        containerClassName
      )}
      spellCheck={false}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  )
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn(
        "flex items-center rounded-md has-aria-invalid:border-destructive has-aria-invalid:ring-3 has-aria-invalid:ring-destructive/20 dark:has-aria-invalid:ring-destructive/40 nova:rounded-lg maia:rounded-4xl lyra:rounded-none lyra:has-aria-invalid:ring-1 mira:has-aria-invalid:ring-2 luma:rounded-3xl sera:gap-1 sera:rounded-none sera:has-aria-invalid:ring-0 rhea:rounded-2xl",
        className
      )}
      {...props}
    />
  )
}

function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  index: number
}) {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {}

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        "relative flex size-9 items-center justify-center border-y border-r border-input text-sm shadow-xs transition-all outline-none first:rounded-l-md first:border-l last:rounded-r-md aria-invalid:border-destructive data-[active=true]:z-10 data-[active=true]:border-ring data-[active=true]:ring-3 data-[active=true]:ring-zinc-200 dark:data-[active=true]:ring-zinc-800 data-[active=true]:aria-invalid:border-destructive data-[active=true]:aria-invalid:ring-destructive/20 dark:bg-input/30 dark:data-[active=true]:aria-invalid:ring-destructive/40 nova:size-8 nova:shadow-none nova:first:rounded-l-lg nova:last:rounded-r-lg maia:bg-input/30 maia:shadow-none maia:first:rounded-l-4xl maia:last:rounded-r-4xl lyra:size-8 lyra:text-xs lyra:shadow-none lyra:first:rounded-none lyra:last:rounded-none lyra:data-[active=true]:ring-1 mira:size-7 mira:bg-input/20 mira:text-xs/relaxed mira:shadow-none mira:data-[active=true]:ring-2 luma:bg-input/50 luma:shadow-none luma:first:rounded-l-3xl luma:last:rounded-r-3xl sera:size-10 sera:border sera:border-transparent sera:border-b-input sera:bg-transparent sera:shadow-none sera:transition-[color,border-color] sera:first:rounded-none sera:last:rounded-none sera:aria-invalid:border-transparent sera:aria-invalid:border-b-destructive sera:data-[active=true]:border-transparent sera:data-[active=true]:border-b-ring sera:data-[active=true]:ring-0 sera:dark:bg-transparent rhea:size-8 rhea:bg-input/50 rhea:shadow-none rhea:transition-[color,box-shadow] rhea:duration-200 rhea:first:rounded-l-2xl rhea:last:rounded-r-2xl",
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
        </div>
      )}
    </div>
  )
}

function InputOTPSeparator({ ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-separator"
      className="flex items-center [&_svg:not([class*='size-'])]:size-4 sera:[&_svg:not([class*='size-'])]:size-3.5"
      role="separator"
      {...props}
    >
      <HugeiconsIcon icon={MinusSignIcon} strokeWidth={2} />
    </div>
  )
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
