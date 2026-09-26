# navigation-menu

2026-08-19, golden pair via CLI. Migrated.

## Changed

- `resources/js/components/ui/navigation-menu.tsx`: golden pair via CLI --overwrite; Viewport is Positioner>Popup>Viewport.
- grep -n "radix-ui\|@radix-ui" resources/js/components/ui/navigation-menu.tsx: clean

## Left alone

- calendar.tsx (react-day-picker), chart.tsx (recharts), sonner.tsx (sonner), input-otp.tsx (input-otp), combobox.tsx (already Base UI). toast.tsx already Base UI.

## Behavior changes

- Hover delay default 200ms -> 50ms. Flagged; not patched.

## Verify by hand

Hover nav items if used; note the faster open delay.
