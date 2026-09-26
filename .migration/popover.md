# popover

2026-08-19, golden pair via CLI. Migrated.

## Changed

- `resources/js/components/ui/popover.tsx`: golden pair via CLI --overwrite; Portal > Positioner > Popup.
- grep -n "radix-ui\|@radix-ui" resources/js/components/ui/popover.tsx: clean

## Left alone

- calendar.tsx (react-day-picker), chart.tsx (recharts), sonner.tsx (sonner), input-otp.tsx (input-otp), combobox.tsx (already Base UI). toast.tsx already Base UI.

## Behavior changes

None.

## Verify by hand

Open a date/popover trigger; position and dismiss on outside click.
