# separator

2026-08-19, golden pair via CLI. Migrated.

## Changed

- `resources/js/components/ui/separator.tsx`: golden pair via CLI --overwrite; callable Separator primitive.
- grep -n "radix-ui\|@radix-ui" resources/js/components/ui/separator.tsx: clean

## Left alone

- calendar.tsx (react-day-picker), chart.tsx (recharts), sonner.tsx (sonner), input-otp.tsx (input-otp), combobox.tsx (already Base UI). toast.tsx already Base UI.

## Behavior changes

None.

## Verify by hand

Settings/sidebar separators still divide sections.
