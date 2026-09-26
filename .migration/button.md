# button

2026-08-19, golden pair via CLI. Migrated.

## Changed

- `resources/js/components/ui/button.tsx`: golden pair via CLI --overwrite; uses @base-ui/react/button (not Slot).
- grep -n "radix-ui\|@radix-ui" resources/js/components/ui/button.tsx: clean

## Left alone

- calendar.tsx (react-day-picker), chart.tsx (recharts), sonner.tsx (sonner), input-otp.tsx (input-otp), combobox.tsx (already Base UI). toast.tsx already Base UI.

## Behavior changes

- asChild replaced by render. nativeButton={false} required when rendering <a>/<Link>.

## Verify by hand

Click primary/outline/ghost/destructive; confirm Link-rendered buttons still navigate.
