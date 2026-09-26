# checkbox

2026-08-19, golden pair via CLI + replay local customizations. Migrated.

## Changed

- `resources/js/components/ui/checkbox.tsx`: golden pair via CLI then replayed indeterminate icon (MinusSignIcon) and data-indeterminate styles.
- grep -n "radix-ui\|@radix-ui" resources/js/components/ui/checkbox.tsx: clean

## Left alone

- calendar.tsx (react-day-picker), chart.tsx (recharts), sonner.tsx (sonner), input-otp.tsx (input-otp), combobox.tsx (already Base UI). toast.tsx already Base UI.

## Behavior changes

- checked="indeterminate" is no longer valid; use indeterminate boolean.

## Verify by hand

Check/uncheck; bulk-select indeterminate state if present.
