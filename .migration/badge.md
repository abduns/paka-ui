# badge

2026-08-19, golden pair via CLI + replay local customizations. Migrated.

## Changed

- `resources/js/components/ui/badge.tsx`: golden pair via CLI then replayed local inset-ring color variants (success/info/purple/pink/rose/orange/teal/sky/ghost/link) onto the useRender wrapper.
- grep -n "radix-ui\|@radix-ui" resources/js/components/ui/badge.tsx: clean

## Left alone

- calendar.tsx (react-day-picker), chart.tsx (recharts), sonner.tsx (sonner), input-otp.tsx (input-otp), combobox.tsx (already Base UI). toast.tsx already Base UI.

## Behavior changes

None.

## Verify by hand

Tags page still shows color variants (green/blue/etc), not Vega pills.
