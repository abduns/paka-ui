# tooltip

2026-08-19, golden pair via CLI. Migrated.

## Changed

- `resources/js/components/ui/tooltip.tsx`: golden pair via CLI --overwrite; Provider delayDuration -> delay (default 0 preserved in app.tsx).
- grep -n "radix-ui\|@radix-ui" resources/js/components/ui/tooltip.tsx: clean

## Left alone

- calendar.tsx (react-day-picker), chart.tsx (recharts), sonner.tsx (sonner), input-otp.tsx (input-otp), combobox.tsx (already Base UI). toast.tsx already Base UI.

## Behavior changes

- Provider delayDuration renamed to delay. skipDelayDuration -> timeout (not used).

## Verify by hand

Hover icon buttons; tooltip appears immediately (delay 0) and dismisses.
