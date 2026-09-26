# avatar

2026-08-19, golden pair via CLI. Migrated.

## Changed

- `resources/js/components/ui/avatar.tsx`: golden pair via CLI --overwrite.
- grep -n "radix-ui\|@radix-ui" resources/js/components/ui/avatar.tsx: clean

## Left alone

- calendar.tsx (react-day-picker), chart.tsx (recharts), sonner.tsx (sonner), input-otp.tsx (input-otp), combobox.tsx (already Base UI). toast.tsx already Base UI.

## Behavior changes

None.

## Verify by hand

Sidebar/user avatars show image then fallback if it fails.
