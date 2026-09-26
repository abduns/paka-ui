# dialog

2026-08-19, golden pair via CLI. Migrated.

## Changed

- `resources/js/components/ui/dialog.tsx`: golden pair via CLI --overwrite; Overlay -> Backdrop, Content -> Popup; Close uses render.
- grep -n "radix-ui\|@radix-ui" resources/js/components/ui/dialog.tsx: clean

## Left alone

- calendar.tsx (react-day-picker), chart.tsx (recharts), sonner.tsx (sonner), input-otp.tsx (input-otp), combobox.tsx (already Base UI). toast.tsx already Base UI.

## Behavior changes

- onInteractOutside/onPointerDownOutside dropped. SubscriberDialog Radix combobox workaround removed (both are Base UI now).

## Verify by hand

Open Add subscriber (TagsCombobox inside); type a tag, click a suggestion, dialog stays open.
