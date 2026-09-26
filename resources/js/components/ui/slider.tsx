import { Slider as SliderPrimitive } from "@base-ui/react/slider"
import { cn } from "@/lib/utils"

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: SliderPrimitive.Root.Props) {
  const _values = Array.isArray(value)
    ? value
    : Array.isArray(defaultValue)
      ? defaultValue
      : [min, max]

  return (
    <SliderPrimitive.Root
      className={cn("data-horizontal:w-full data-vertical:h-full", className)}
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      thumbAlignment="edge"
      {...props}
    >
      <SliderPrimitive.Control className="relative flex w-full touch-none items-center select-none data-disabled:opacity-50 data-vertical:h-full data-vertical:min-h-40 data-vertical:w-auto data-vertical:flex-col">
        <SliderPrimitive.Track
          data-slot="slider-track"
          className="relative grow overflow-hidden rounded-full bg-muted select-none data-horizontal:h-1.5 data-horizontal:w-full data-vertical:h-full data-vertical:w-1.5 nova:data-horizontal:h-1 nova:data-vertical:w-1 maia:rounded-4xl maia:data-horizontal:h-3 maia:data-vertical:w-3 lyra:rounded-none lyra:data-horizontal:h-1 lyra:data-vertical:w-1 mira:rounded-md mira:data-horizontal:h-1 mira:data-vertical:w-1 luma:bg-input/90 luma:data-horizontal:h-2 luma:data-vertical:w-2 sera:rounded-none sera:bg-input/50 sera:data-horizontal:h-0.5 sera:data-vertical:w-0.5 rhea:rounded-2xl rhea:bg-input/90 rhea:data-horizontal:h-1 rhea:data-vertical:w-1"
        >
          <SliderPrimitive.Indicator
            data-slot="slider-range"
            className="bg-primary select-none data-horizontal:h-full data-vertical:w-full"
          />
        </SliderPrimitive.Track>
        {Array.from({ length: _values.length }, (_, index) => (
          <SliderPrimitive.Thumb
            data-slot="slider-thumb"
            key={index}
            className="block size-4 shrink-0 rounded-full border border-primary bg-white shadow-sm ring-ring/50 transition-[color,box-shadow] select-none hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 nova:relative nova:size-3 nova:border-ring nova:shadow-none nova:after:absolute nova:after:-inset-2 nova:hover:ring-3 nova:focus-visible:ring-3 nova:active:ring-3 maia:rounded-4xl maia:transition-colors lyra:relative lyra:size-3 lyra:rounded-none lyra:border-ring lyra:shadow-none lyra:after:absolute lyra:after:-inset-2 lyra:hover:ring-1 lyra:focus-visible:ring-1 lyra:active:ring-1 mira:relative mira:size-3 mira:rounded-md mira:border-ring mira:shadow-none mira:ring-ring/30 mira:after:absolute mira:after:-inset-2 mira:hover:ring-2 mira:focus-visible:ring-2 mira:active:ring-2 luma:h-4 luma:w-6 luma:border-0 luma:shadow-md luma:ring-1 luma:ring-black/10 luma:not-dark:bg-clip-padding luma:hover:ring-4 luma:hover:ring-ring/30 luma:focus-visible:ring-4 luma:focus-visible:ring-ring/30 luma:data-vertical:h-6 luma:data-vertical:w-4 sera:size-3 sera:rounded-none sera:border-none sera:bg-primary sera:shadow-none sera:transition-colors sera:hover:ring-2 sera:hover:ring-ring/30 sera:focus-visible:ring-2 sera:focus-visible:ring-ring/30 rhea:rounded-2xl rhea:border-0 rhea:shadow-md rhea:ring-1 rhea:ring-black/10 rhea:duration-200 rhea:not-dark:bg-clip-padding rhea:hover:ring-4 rhea:hover:ring-ring/30 rhea:focus-visible:ring-4 rhea:focus-visible:ring-ring/30"
          />
        ))}
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  )
}

export { Slider }
