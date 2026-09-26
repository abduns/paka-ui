# toggle-group

2026-08-19, golden pair via CLI. Migrated.

## Changed

- `resources/js/components/ui/toggle-group.tsx`: golden pair via CLI --overwrite; type=single dropped; values are arrays.
- grep -n "radix-ui\|@radix-ui" resources/js/components/ui/toggle-group.tsx: clean

## Left alone

- calendar.tsx (react-day-picker), chart.tsx (recharts), sonner.tsx (sonner), input-otp.tsx (input-otp), combobox.tsx (already Base UI). toast.tsx already Base UI.

## Behavior changes

- value/onValueChange are always arrays. emails/edit editor ToggleGroup updated to value={[mode]}.

## Verify by hand

Email editor visual/html toggle; only one mode stays selected.
