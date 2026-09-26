import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse rounded-md maia:rounded-xl lyra:rounded-none luma:rounded-2xl sera:rounded-none rhea:rounded-2xl bg-muted", className)}
      {...props}
    />
  )
}

export { Skeleton }
