# dropdown-menu

2026-08-19, golden pair via CLI. Migrated.

## Changed

- `resources/js/components/ui/dropdown-menu.tsx`: golden pair via CLI --overwrite; Menu primitive; Content is Portal>Positioner>Popup.
- grep -n "radix-ui\|@radix-ui" resources/js/components/ui/dropdown-menu.tsx: clean

## Left alone

- calendar.tsx (react-day-picker), chart.tsx (recharts), sonner.tsx (sonner), input-otp.tsx (input-otp), combobox.tsx (already Base UI). toast.tsx already Base UI.

## Behavior changes

- CheckboxItem/RadioItem closeOnClick defaults false (Radix closed on select). Flagged; not auto-patched.
- Call sites: onSelect renamed to onClick.

## Verify by hand

Open overflow menus; choose an item; menu closes. Keyboard arrows + typeahead.
