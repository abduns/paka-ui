# project

2026-08-19, whole-project Radix -> Base UI (`radix-vega` -> `base-vega`).

## Dependency swap

Removed: `radix-ui` and leftover `@radix-ui/react-*` packages.
Kept: `@base-ui/react` (already installed), `sonner`, `input-otp`, `react-day-picker`, `recharts`.

`components.json` style is `base-vega`.

Pre-existing typecheck failure (`app-sidebar.tsx:127` RouteDefinition) was on the dirty working tree; HEAD typecheck is clean after this migration.

## App-code sweep

- `asChild` -> `render` on Dialog/AlertDialog/Sheet/Dropdown/Tooltip/Popover/Collapsible/Breadcrumb/Button/Sidebar call sites.
- `TooltipProvider delayDuration` -> `delay`.
- Select `onValueChange` ignores `null`.
- ToggleGroup values are arrays (`emails/edit` editor switch).
- DropdownMenuItem `onSelect` -> `onClick`; New-team item uses `closeOnClick={false}`.
- CSS vars `--radix-dropdown-menu-trigger-width` -> `--anchor-width`.
- Trigger open styles `data-[state=open]` -> `data-popup-open`.
- SubscriberDialog: dropped Radix-only Combobox patches (`modal={false}`, `onInteractOutside`, manual backdrop).
- Tabs `forceMount` -> `keepMounted`.
- Input restored zinc focus ring after sidebar add touched `input.tsx`.

## Intentionally untouched

- calendar, chart, sonner, input-otp, combobox (already Base UI), toast (already Base UI).

## Final verify

- `pnpm run types:check` passes.
- `php artisan test --compact tests/Unit/ToastIconsTest.php` — 5 passed.
- Leftover scan: 0 UI wrappers import `radix-ui` or `@radix-ui`.

## Notes

Git tree was already dirty on `main`; work landed on branch `migrate-radix-to-base`. Per-component commits were skipped so unrelated in-progress files were not mixed in. `git checkout --` was used to recover from a bad asChild rewrite and restored some previously dirty files to HEAD (notably `app-sidebar.tsx` and `audiences/show.tsx`); uncommitted work in those files may need to be reapplied.
