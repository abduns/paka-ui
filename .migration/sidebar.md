# sidebar

2026-08-19, golden pair via CLI. Migrated.

## Changed

- `resources/js/components/ui/sidebar.tsx`: golden pair via CLI --overwrite; Slot/asChild -> useRender. Deleted generated use-mobile.ts (kept use-mobile.tsx).
- grep -n "radix-ui\|@radix-ui" resources/js/components/ui/sidebar.tsx: clean

## Left alone

- calendar.tsx (react-day-picker), chart.tsx (recharts), sonner.tsx (sonner), input-otp.tsx (input-otp), combobox.tsx (already Base UI). toast.tsx already Base UI.

## Behavior changes

None.

## Verify by hand

Collapse to icons; hover a nav item for tooltip; expand trigger works.
