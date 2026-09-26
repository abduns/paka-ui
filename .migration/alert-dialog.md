# alert-dialog

2026-08-19, golden pair via CLI. Migrated.

## Changed

- `resources/js/components/ui/alert-dialog.tsx`: golden pair via CLI --overwrite; Overlay -> Backdrop, Cancel -> Close, Action is a plain Button.
- grep -n "radix-ui\|@radix-ui" resources/js/components/ui/alert-dialog.tsx: clean

## Left alone

- calendar.tsx (react-day-picker), chart.tsx (recharts), sonner.tsx (sonner), input-otp.tsx (input-otp), combobox.tsx (already Base UI). toast.tsx already Base UI.

## Behavior changes

- AlertDialogAction is a plain Button (no Action primitive). It does not auto-close the dialog.
- Initial focus is first tabbable, not Cancel.

## Verify by hand

Open a delete confirmation; Escape cancels; action button still runs the delete.
