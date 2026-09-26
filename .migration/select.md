# select

2026-08-19, golden pair via CLI + replay local customizations. Migrated.

## Changed

- `resources/js/components/ui/select.tsx`: golden pair via CLI then replayed zinc focus ring (ring-zinc-200 / dark:ring-zinc-800) on SelectTrigger.
- grep -n "radix-ui\|@radix-ui" resources/js/components/ui/select.tsx: clean

## Left alone

- calendar.tsx (react-day-picker), chart.tsx (recharts), sonner.tsx (sonner), input-otp.tsx (input-otp), combobox.tsx (already Base UI). toast.tsx already Base UI.

## Behavior changes

- onValueChange value is T | null. Call sites ignore null.

## Verify by hand

Open a select, pick an item, tab away; zinc focus ring on the trigger.
