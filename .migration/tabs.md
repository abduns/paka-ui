# tabs

2026-08-19, golden pair via CLI + replay local customizations. Migrated.

## Changed

- `resources/js/components/ui/tabs.tsx`: golden pair via CLI then replayed sliding TabsList variant; indicator now queries [data-active] instead of [data-state=active]. Tabs default to manual activation (flagged).
- grep -n "radix-ui\|@radix-ui" resources/js/components/ui/tabs.tsx: clean

## Left alone

- calendar.tsx (react-day-picker), chart.tsx (recharts), sonner.tsx (sonner), input-otp.tsx (input-otp), combobox.tsx (already Base UI). toast.tsx already Base UI.

## Behavior changes

- Default activation is manual (Radix was automatic). Flagged; not patched with activateOnFocus.

## Verify by hand

Audience/email sliding tabs: pill indicator follows the active tab.
