# Workspace Starter Kit — Extraction Plan

Extract a reusable Laravel 13 + React 19 + Inertia 3 starter kit from **Maildun**, keeping the
UI system, agent skills, auth, workspaces, and settings — and dropping the entire email domain.

**Source:** `abduns/maildun` @ `main`
**Target:** new repo, AGPL-3.0-only (same license)

---

## Locked decisions

| # | Decision |
|---|---|
| 1 | License stays **AGPL-3.0-only**. Keep `LICENSE`, keep the attribution notice mechanism (`config/attribution.php` + `attribution-badge.tsx`), repoint `APP_SOURCE_URL` at the new repo. |
| 2 | Infra kept: **Horizon**, **DiceBear**, **spatie/laravel-permission**. Drop Passport, MCP, AWS SDK, MaxMind, Flysystem S3. |
| 3 | `.ai/rules` is **not** ported. Delete all 130 files, regenerate at the end via the `infer-conventions` + `shadcn` skills. |
| 4 | Domain language is **Workspace**, not Team — models, tables, routes, types, props, components. Full rename. |

---

## Strategy: clone and subtract

Start from a clone of Maildun and delete downward. Do **not** `laravel new` and copy upward.

The generic layer isn't just files — it's wiring spread across `bootstrap/app.php`,
`HandleInertiaRequests`, `FortifyServiceProvider`, `vite.config.ts` (Wayfinder + React Compiler +
Hugeicons alias), `eslint.config.js`, `pint.json`, `phpstan.neon`, `tsconfig.json`, and 56 ordered
migrations. Copying upward means re-deriving all of it by hand and silently missing pieces.

Subtracting is mechanical and has three oracles that tell you when you're done:

```bash
php artisan test --compact
pnpm types:check
vendor/bin/phpstan analyse
```

**Phase order matters.** Strip *before* renaming. Renaming first means touching ~120 files;
renaming after the strip means ~40.

---

## Phase 0 — Repo bootstrap

```bash
git clone git@github.com:abduns/maildun.git workspace-starter
cd workspace-starter
rm -rf .git && git init && git add -A && git commit -m "chore: import maildun as extraction base"
```

Work on a branch per phase so each strip is revertible.

Then edit metadata:

- `composer.json` — `name`, `description`, `keywords`, `homepage`, `support.*`. Keep `license: AGPL-3.0-only`.
- `package.json` — nothing to change except later dep removals.
- `.env` / `.env.example` — new `APP_NAME`, `APP_URL`, fresh database, `APP_SOURCE_URL`.
- Herd: the site resolves at `https://workspace-starter.test` (kebab-case of the directory).

---

## Phase 1 — The UI system (carries over verbatim)

This is the whole point of the extraction. **Nothing in this phase gets deleted or rewritten** —
it moves across untouched, and Phase 6 only renames the four `Team*`-named items at the bottom.

### 1a. Base UI primitives — `resources/js/components/ui/` (44 files, all kept)

Built on `@base-ui/react` ^1.7.0, shadcn `base-vega` style, `hugeicons` icon library.
26 of them import `@base-ui` directly; 3 use `motion` for animation.

```
alert-dialog    alert          avatar         badge          breadcrumb
button          button-group   calendar       card           chart
checkbox        code-editor    collapsible    combobox       command
dialog          dropdown-menu  empty          field          hover-card
icon            input          input-group    input-otp      kbd
label           navigation-menu pagination    placeholder-pattern
popover         progress       select         separator      sheet
sidebar         skeleton       sonner         spinner        switch
table           tabs           textarea       toast          toggle
toggle-group    tooltip
```

Load-bearing detail — do not drop these deps, they are `ui/` dependencies not domain ones:

| Package | Used by |
|---|---|
| `@base-ui/react` | 26 primitives |
| `motion` | `tabs.tsx`, `navigation-menu.tsx`, `sidebar.tsx` + `auth-simple-layout`, `login` |
| `cmdk` | `command.tsx` |
| `next-themes` | `sonner.tsx` |
| `react-day-picker` | `calendar.tsx` |
| `recharts` | `chart.tsx` |
| `sonner` | `sonner.tsx` |
| `input-otp` | `input-otp.tsx` + 2FA flows |
| `class-variance-authority`, `clsx`, `tailwind-merge` | variants + `cn()` |

**`ui/sidebar.tsx` is 846 lines** — the largest primitive in the kit. Collapsible rail, mobile
sheet, cookie-persisted open state (`sidebar_state`, excluded from cookie encryption in
`bootstrap/app.php`), `SidebarProvider` / `SidebarInset` / `SidebarRail` / `SidebarTrigger` /
`SidebarInput` / `SidebarGroup*` / `SidebarMenu*`. Keep whole. Two unit tests guard it
(`SidebarActiveStateUiTest`, `GrainySidebarUiTest`).

**`ui/button.tsx`** (59 lines) — cva variants on Base UI. Keep as-is; it's the reference for
every other variant-driven primitive.

### 1b. App shell / container layer — `resources/js/components/` (kept)

```
app-shell.tsx           21 lines — SidebarProvider wrapper, header|sidebar variant
app-content.tsx         22 lines — the main container (SidebarInset / <main>)
app-header.tsx         205 lines — header-variant top nav
app-sidebar.tsx              — KEEP the shell, REWRITE the nav array (Phase 7)
app-sidebar-header.tsx
app-providers.tsx            — theme + toast providers
app-logo.tsx / app-logo-icon.tsx
nav-main.tsx  nav-user.tsx  nav-footer.tsx  nav-search.tsx
breadcrumbs.tsx  heading.tsx  text-link.tsx  user-info.tsx  user-menu-content.tsx
icons/toast-status-icons.tsx
```

### 1c. Layouts (all kept)

```
layouts/app-layout.tsx
layouts/app/app-sidebar-layout.tsx
layouts/app/app-header-layout.tsx
layouts/auth-layout.tsx
layouts/auth/auth-card-layout.tsx
layouts/auth/auth-simple-layout.tsx
layouts/auth/auth-split-layout.tsx
layouts/settings/layout.tsx      — KEEP the layout, TRIM the nav groups (Phase 7)
```

Delete only `layouts/audiences/` and `layouts/subscribe-forms/`.

### 1d. Design tokens & config (kept verbatim)

- `resources/css/app.css` — 434 lines: Tailwind v4 `@theme`, oklch palette, light/dark tokens,
  sidebar tokens, brand-theme CSS variables, input-style variants. Guarded by `CssThemeTest`.
- `components.json` — `style: base-vega`, `baseColor: neutral`, `iconLibrary: hugeicons`,
  `cssVariables: true`, aliases. This is what makes the `shadcn` skill work in the new repo.
- `.migration/` — the Radix→Base UI migration notes. Keep; the `migrate-radix-to-base` skill reads them.
- `.prettierrc`, `.prettierignore`, `eslint.config.js`, `tsconfig.json`.
- `vite.config.ts` — keep the Hugeicons style alias + `bunny('Instrument Sans')` fonts + Wayfinder
  `formVariants`. Two edits in Phase 5.

### 1e. Generic form/UI components (kept)

```
input-error.tsx  alert-error.tsx  password-input.tsx  settings-panel.tsx
settings-page-header.tsx  sliding-underline-list.tsx  appearance-tabs.tsx
paginator.tsx  list-search.tsx  filter-menu.tsx  active-filters.tsx
delete-user.tsx  manage-passkeys.tsx  passkey-item.tsx  passkey-register.tsx
passkey-verify.tsx  manage-two-factor.tsx  two-factor-setup-modal.tsx
two-factor-recovery-codes.tsx  attribution-badge.tsx
```

### 1f. Hooks & lib (kept)

```
hooks/: use-appearance  use-mobile  use-mobile-navigation  use-initials  use-mounted
        use-clipboard  use-current-url  use-flash-toast  use-unsaved-changes
        use-two-factor-auth  use-list-filters  use-clear-filters-on-escape
lib/:   utils.ts  format.ts  current-url.ts  focus-first-invalid.ts
        team-brand-theme.ts  → renamed in Phase 6
```

Drop hooks `use-media-upload`, `use-upload-toast` (media library only).
Drop lib `email-builder.ts`, `world-map-paths.ts`, `country-flags.ts`, `brand-icon-paths.ts`, `tags.ts`.

### 1g. Types (kept)

`types/ui.ts`, `types/navigation.ts`, `types/auth.ts`, `types/global.d.ts`, `types/vite-env.d.ts`.
`types/teams.ts` → renamed. `types/index.ts` re-export barrel gets trimmed.

---

## Phase 2 — Backend keep manifest

### Keep

**Models** — `User`, `Team`→`Workspace`, `Membership`, `TeamInvitation`→`WorkspaceInvitation`

**Concerns** — `HasTeams` (19 methods, zero domain coupling), `GeneratesUniqueTeamSlugs`,
`PasswordValidationRules`, `ProfileValidationRules`

**Enums** — `TeamRole`, `TeamPermission`, `TeamBrandColor`, `TeamBrandFont`, `TeamBrandInputStyle`

**Data** — `UserTeam`, `TeamPermissions`

**Actions** — `Fortify/CreateNewUser`, `Fortify/ResetUserPassword`, `Install/CompleteBrowserInstallation`,
`Teams/CreateTeam`, `Teams/ReleaseUserTeams`, `Teams/BuildOnboardingChecklist` *(rewrite body)*

**Controllers** — `Controller`, `HomeController`, `DashboardController` *(rewrite)*, `AvatarController`,
`InstallationController`, `Settings/ProfileController`, `Settings/SecurityController`,
`Teams/TeamController`, `Teams/TeamMemberController`, `Teams/TeamInvitationController`,
`Teams/TeamThemeController`

**Middleware** — `HandleAppearance`, `HandleInertiaRequests` *(trim)*, `EnsureTeamMembership`,
`SetTeamUrlDefaults`, `EnsureInstallationIsPending`, `EnsureRegistrationIsOpen`

**Responses** — all 5 + `Concerns/RedirectsToCurrentTeam`

**Policies** — `TeamPolicy` *(trim permissions)*

**Rules** — `TeamName`, `UniqueTeamInvitation`, `ValidTeamInvitation`

**Services** — `DiceBearAvatarGenerator`, `EnvironmentFile`, `InstallationState`

**Providers** — `AppServiceProvider` *(trim)*, `FortifyServiceProvider`, `HorizonServiceProvider`

**Notifications** — `ResetPassword`, `Teams/TeamInvitation`

**Commands** — `InstallCommand` *(trim)*

**Config** — `app`, `attribution`, `auth`, `cache`, `database`, `filesystems`, `fortify`, `horizon`,
`inertia`, `logging`, `mail`, `permission`, `queue`, `session`, `trustedproxy`

**Migrations (6 of 56)** —
`0001_01_01_000000_create_users_table`, `0001_01_01_000001_create_cache_table`,
`0001_01_01_000002_create_jobs_table`, `2024_01_01_000000_create_passkeys_table`,
`2026_01_27_000001_create_teams_table` *(strip email columns, rename tables)*,
`2026_01_27_000002_add_current_team_id_to_users_table` *(rename column)*,
`2026_08_16_093518_create_permission_tables`, `2026_08_29_100638_create_installations_table`

**Factories** — `UserFactory`, `TeamFactory`, `TeamInvitationFactory`

**Views** — `resources/views/app.blade.php`, `resources/views/vendor/`

### Drop

Delete `config/delivery.php`, `config/mcp.php`, `config/services.php` *(rewrite minimal)*,
`config/tracking.php`, `routes/ai.php`, `routes/api.php`, `app/Mcp/`, `resources/mcp/`,
`resources/mail/`, `resources/views/sender-verification.blade.php`, `API.md`, `docs/email-delivery/`.

---

## Phase 3 — Strip the PHP domain

One commit. The app will not boot mid-phase; that's fine.

```bash
# Models (33 of 37)
rm app/Models/{Audience,AudienceAttribute,Automation,AutomationRun,AutomationRunStep}.php
rm app/Models/{Company,CompanyDomain,Contact}.php
rm app/Models/{Email,EmailAttachment,EmailDelivery,EmailDeliveryAttempt,EmailLink}.php
rm app/Models/{EmailLinkClick,EmailLinkTrackingAggregate,EmailProviderEvent,EmailTemplate}.php
rm app/Models/{EmailTrackingAggregate,EmailTrackingEvent,EmailTrackingInsightAggregate}.php
rm app/Models/{EmailTrackingInsightUnique,Media,MediaCategory,MediaTag,Segment}.php
rm app/Models/{SubscribeForm,Subscriber,Tag,TeamApiKey,TeamEmailIntegration,TeamSender}.php
rm app/Models/{TransactionalEmail,TransactionalEmailDelivery}.php

# Whole directories
rm -rf app/Actions/{Audiences,Automations,Emails,Media,Transactional}
rm -rf app/Jobs app/Mail app/Listeners app/Events app/Exceptions app/Contracts app/Mcp
rm -rf app/Http/Controllers/Api

# Enums — keep only TeamRole, TeamPermission, TeamBrand{Color,Font,InputStyle}
# Services — keep only DiceBearAvatarGenerator, EnvironmentFile, InstallationState
# Policies — keep only TeamPolicy
# Requests — keep only Settings/*, Install/*, and Teams/{SaveTeamRequest,DeleteTeamRequest,
#            CreateTeamInvitationRequest,RespondToTeamInvitationRequest,
#            UpdateTeamMemberRequest,SaveTeamThemeRequest}
# Controllers, Commands, Factories, Seeders, Migrations — per Phase 2 keep list
```

Composer:

```bash
composer remove aws/aws-php-sns-message-validator aws/aws-sdk-php laravel/mcp \
  laravel/passport league/flysystem-aws-s3-v3 maxmind-db/reader
```

Also drop `app/Concerns/ThrottlesEmailDelivery.php`, `app/Data/StorageMigrationReport.php`,
`app/Enums/StorageBackend.php`, `app/Services/StorageBackendMigrator.php`,
`app/Services/{PublicHttpUrlGuard,PublicSmtpHostGuard,SesFeedbackVerifier,TeamMailer,ResolvedEmailTransport,SystemDns*,ManageContact,ResolveContactCompany}.php`.

---

## Phase 4 — Repair the seams

Files that survive Phase 3 but reference deleted code. This is where the real thinking is.

**`app/Models/Team.php` (374 lines → ~140)**
Delete relations: `audiences`, `contacts`, `companies`, `subscribers`, `tags`, `emails`,
`emailTemplates`, `transactionalEmails`, `emailIntegration`, `activeSender`, `senders`,
`emailIntegrations`, `apiKeys`, `transactionalEmailDeliveries`, `media`, `mediaCategories`,
`mediaTags`, `automations`. Delete methods `resolvedEmailFromAddress()`,
`hasVerifiedSenderAddress()`, `authorizedSenderDomain()`. Trim `casts()` of email enums.
Keep: `owner`, `members`, `memberships`, `invitations`, `getRouteKeyName()`, brand-theme casts.

**`app/Http/Middleware/HandleInertiaRequests.php`**
Drop the `recentCampaigns` prop and its `use App\Models\Email`. Keep `name`, `attribution`,
`auth`, `registrationOpen`, `sidebarOpen`, `currentTeam`, `teams`, `onboarding`.

**`app/Actions/Teams/BuildOnboardingChecklist.php`**
Rewrite to a generic 3-step checklist: name the workspace → invite a member → complete profile.
(Currently keyed on audiences/emails/senders.)

**`bootstrap/app.php`**
Remove the 6 provider-secret strings from `trimStrings(except:)` and `dontFlash()`.
Remove `validateCsrfTokens(except:)` entries — all three are domain routes.
Keep `encryptCookies(except: ['appearance','sidebar_state'])` — the sidebar depends on it.
Keep the spatie middleware aliases.

**`routes/web.php` (280 lines → ~45)** — reduce to:
install (4), `/` home, avatars, the `{workspace}` prefix group containing only `dashboard`,
the two invitation routes, and `require settings.php`.

**`routes/settings.php`** — keep profile, security, appearance, workspace CRUD/switch/leave,
members, invitations, theme, and the `.well-known/passkey-endpoints` route.
Delete the email, sender, email-provider, api-key, and tags blocks.

**`app/Enums/TeamPermission.php` + `TeamPolicy` + `Data/TeamPermissions`**
Drop `canManageTags`, `canManageEmails`; keep the workspace/member/invitation set.
Mirror the change in `resources/js/types/teams.ts`.

**`config/services.php`** — rewrite to an empty/minimal stub.
**`app/Providers/AppServiceProvider.php`** — drop mail/transport/tracking bindings, keep trusted proxies + Vite prefetch.
**`InstallCommand` + `InstallSeeder` + `DatabaseSeeder`** — drop starter-template and sender seeding.
**`app/Console/Commands/`** — keep only `InstallCommand`; delete the other 9.
**`routes/console.php`** — drop the email/automation/tracking schedules.

---

## Phase 5 — Strip the frontend domain

```bash
rm -rf resources/js/pages/{audiences,automations,companies,contacts,email-templates}
rm -rf resources/js/pages/{emails,list-hygiene,media,segments,subscribe-forms}
rm -rf resources/js/pages/{transactional,unsubscribe}
rm -rf resources/js/email-builder
rm -rf resources/js/layouts/{audiences,subscribe-forms}
rm -rf resources/js/actions resources/js/routes   # Wayfinder regenerates these
```

Delete ~55 domain components. Keep exactly the sets listed in Phase 1b/1e plus:
`create-team-modal`(→create-workspace), `delete-team-modal`, `leave-team-modal`,
`edit-member-modal`, `invite-member-modal`, `remove-member-modal`, `cancel-invitation-modal`,
`pending-invitations-modal`, `team-invitation-alert`, `team-switcher`,
`getting-started-checklist`.

Types: delete `audiences.ts`, `automations.ts`, `companies.ts`, `contacts.ts`, `emails.ts`,
`media.ts`. Rewrite `onboarding.ts`. Trim the `index.ts` barrel to
`auth | navigation | onboarding | ui | workspaces`.

**npm removals:**

```bash
pnpm remove @usewaypoint/block-avatar @usewaypoint/block-button \
  @usewaypoint/block-columns-container @usewaypoint/block-container \
  @usewaypoint/block-divider @usewaypoint/block-heading @usewaypoint/block-html \
  @usewaypoint/block-image @usewaypoint/block-spacer @usewaypoint/block-text \
  @usewaypoint/document-core @usewaypoint/email-builder \
  @mui/material @mui/icons-material @emotion/react @emotion/styled \
  @xyflow/react @codemirror/lang-html @codemirror/lang-json @uiw/react-codemirror \
  react-colorful flag-icons highlight.js zustand zod
```

Then re-check `date-fns` — its only two consumers are domain components, so it likely goes too.
Confirm with `pnpm dlx depcheck` before removing anything else; **do not** remove `cmdk`,
`next-themes`, `react-day-picker`, `recharts`, or `motion` — all four are `ui/` dependencies.

**`vite.config.ts`** — two edits only:
1. Drop the `build.assetsInlineLimit` flag-icons rule.
2. Drop the `sources:` filter in the React Compiler babel plugin (it existed to exclude
   `/email-builder/`). Compile everything.

Regenerate routes: `php artisan wayfinder:generate`.

---

## Phase 6 — Rename Team → Workspace

Do this **after** the strip. Fresh project, so rewrite migrations in place — no rename migrations.

### Database

| From | To |
|---|---|
| `teams` | `workspaces` |
| `team_members` | `workspace_members` |
| `team_invitations` | `workspace_invitations` |
| `teams.team_id` FKs | `workspace_id` |
| `users.current_team_id` | `current_workspace_id` |

Also drop these columns from the workspaces table while you're in there:
`email_editor`, `email_from_name`, `email_from_address`, `email_reply_to`,
`requires_email_integration`, `convert_uploads_to_webp`.
Keep `uuid`, `name`, `slug`, `logo_path`, `brand_color`, `brand_font`, `brand_input_style`,
`is_personal`, timestamps, soft deletes.

### PHP classes

```
Team                        → Workspace
TeamInvitation              → WorkspaceInvitation
Membership                  → Membership (unchanged)
TeamRole                    → WorkspaceRole
TeamPermission              → WorkspacePermission
TeamBrandColor/Font/InputStyle → WorkspaceBrand*
HasTeams                    → HasWorkspaces
GeneratesUniqueTeamSlugs    → GeneratesUniqueWorkspaceSlugs
EnsureTeamMembership        → EnsureWorkspaceMembership
SetTeamUrlDefaults          → SetWorkspaceUrlDefaults
RedirectsToCurrentTeam      → RedirectsToCurrentWorkspace
Data\UserTeam               → Data\UserWorkspace
Data\TeamPermissions        → Data\WorkspacePermissions
Rules\TeamName              → Rules\WorkspaceName
Rules\UniqueTeamInvitation  → Rules\UniqueWorkspaceInvitation
Rules\ValidTeamInvitation   → Rules\ValidWorkspaceInvitation
Actions\Teams\CreateTeam    → Actions\Workspaces\CreateWorkspace
Actions\Teams\ReleaseUserTeams → Actions\Workspaces\ReleaseUserWorkspaces
Http\Controllers\Teams\*    → Http\Controllers\Workspaces\Workspace*Controller
Http\Requests\Teams\*       → Http\Requests\Workspaces\*
Policies\TeamPolicy         → Policies\WorkspacePolicy
Notifications\Teams\TeamInvitation → Notifications\Workspaces\WorkspaceInvitation
```

Use `git mv` for files, then a scoped `sed` over `app/ database/ routes/ tests/`, then
`composer dump-autoload`. Let PHPStan find the stragglers.

### Routes

Route names `teams.*` → `workspaces.*`. URL param `{current_team}` → `{workspace}`.
Paths already read `/settings/workspace/...` — keep them, and **delete** the
`settings/teams/{path?}` 301 redirect block (nothing to migrate in a fresh app).

### Frontend

```
types/teams.ts              → types/workspaces.ts
  Team                      → Workspace
  TeamRole                  → WorkspaceRole
  TeamBrandColor/Font/InputStyle → WorkspaceBrand*
  TeamMember/TeamInvitation/TeamPermissions/TeamInvitationContext → Workspace*
  DashboardInvitation.team  → .workspace
lib/team-brand-theme.ts     → lib/workspace-brand-theme.ts  (teamBrandPalettes → workspaceBrandPalettes)
components/team-switcher.tsx        → workspace-switcher.tsx
components/create-team-modal.tsx    → create-workspace-modal.tsx
components/delete-team-modal.tsx    → delete-workspace-modal.tsx
components/leave-team-modal.tsx     → leave-workspace-modal.tsx
components/team-invitation-alert.tsx → workspace-invitation-alert.tsx
pages/teams/                → pages/workspaces/
```

**Shared Inertia props** — the rename that breaks the most files:
`page.props.currentTeam` → `currentWorkspace`, `page.props.teams` → `workspaces`.
Update `HandleInertiaRequests::share()` and every consumer (`app-sidebar`, `settings/layout`,
`workspace-switcher`, `nav-user`, `dashboard`, `getting-started-checklist`).

---

## Phase 7 — Rebuild the shell

**`components/app-sidebar.tsx`** — currently imports 9 domain route modules
(`audiences`, `automations`, `companies`, `contacts`, `email_templates`, `emails`,
`list_hygiene`, `media`, `transactional_emails`) and builds `*Url` consts from
`currentTeam.slug`. Replace the nav array with a single `Dashboard` item plus one commented
example showing the `currentWorkspace.slug` pattern, so the next feature is copy-paste.
Keep everything else — header, `NavSearch`, `NavUser`, `SidebarRail`, footer, checklist slot.

**`layouts/settings/layout.tsx`** — trim `navGroups` to:

- **Account** — Profile, Security, Appearance
- **Workspace** — General, Members, Theme

Delete the Email / Sender / Email Provider / API / Tags entries and their icon imports.
Keep the search filter, `SidebarInset`, back-to-dashboard button.

**`pages/dashboard.tsx`** — strip campaign stats; leave a heading, the invitation alert, the
onboarding checklist, and an `<Empty>` placeholder.

**`components/nav-search.tsx`** — reduce the command palette entries to Dashboard + settings pages.

**`components/getting-started-checklist.tsx`** — point at the rewritten generic checklist.

---

## Phase 8 — Tests

### Keep (rename `Team*` → `Workspace*`)

```
Feature/Auth/*                        7 files — authentication, registration, password reset,
                                        email verification, 2FA challenge, password confirmation,
                                        registration policy
Feature/Settings/*                    3 files — profile update, security, account deletion
Feature/Teams/*                       3 files → Workspaces/ — workspace, members, invitations,
                                        expired-invitation pruning
Feature/TeamPermissionTest            → WorkspacePermissionTest
Feature/TeamThemeTest                 → WorkspaceThemeTest
Feature/{ApplicationName,Attribution,Avatar,Home,Dashboard,DatabaseSchema,
         PublicIdentifiers,TrustedProxies,OnboardingChecklist}Test
Feature/{BrowserInstallation,InstallCommand,AdminUserSeeder}Test
Unit/{AppSidebarLayout,AuthLayout,SettingsLayoutUi,SettingsFormsUi,SidebarActiveStateUi,
      GrainySidebarUi,SidebarIcons,CssTheme,BadgeUi,BreadcrumbUi,PaginationUi,SelectUi,
      DialogSpacingUi,DialogWidthUi,PasswordInputUi,FormInputPlaceholders,ToastIcons,
      CurrentUrlUi,EditIcons,HugeiconsIconStyleConfig}Test
Unit/{TeamSwitcherUi,TeamBrandThemeSsr,TeamThemeUi}Test → Workspace*
```

Delete the ~85 domain tests. Delete `Unit/{ListFiltersUi,UploadToastUi,MediaUi,...}` only if you
also dropped the corresponding component.

Update `tests/Pest.php` and `tests/TestCase.php` for the renamed factories.

### Gates — all must pass before Phase 9

```bash
vendor/bin/pint --format agent
vendor/bin/phpstan analyse
php artisan test --compact
pnpm lint:check && pnpm types:check && pnpm build
```

Update `.github/workflows/tests.yml` if job names reference the old app.

---

## Phase 9 — Agent config

**Skills** — copy as-is, then trim:

```
.claude/skills/  (+ mirrors in .cursor/ .grok/ .agents/ .github/)
  KEEP:  fortify-development  inertia-react-development  infer-conventions
         laravel-best-practices  migrate-radix-to-base  shadcn
         tailwindcss-development  testing-best-practices  wayfinder-development
         configuring-horizon
  DROP:  mcp-development  passport-development
```

Keep `skills-lock.json` (tracks `shadcn` and `migrate-radix-to-base` from the `shadcn/ui` repo).

**`.ai/rules`** — `rm -rf .ai/rules`, then regenerate:

1. Run the `infer-conventions` skill over the stripped codebase.
2. Run the `shadcn` skill to record the Base UI / `base-vega` component conventions.
3. Record with the Boost `record-rule` tool so rules land in `.ai/rules` with correct globs.

Do this **last** — rules generated against the half-stripped tree would describe code that no
longer exists.

**`.mcp.json`** — drop the `maildun` server, keep `laravel-boost`.
**`CLAUDE.md` / `AGENTS.md`** — rewrite the project-specific sections; keep the Boost guideline
blocks, PHP conventions, Pint, Pest, Inertia, Wayfinder rules.
**`boost.json`**, `opencode.json`, `.codex/`, `.cursor/`, `.grok/` — repoint names.

---

## Phase 10 — License, docs, release

- `LICENSE` — unchanged AGPL-3.0-only. Update the copyright line and the additional-terms
  attribution clause to name the new project.
- `config/attribution.php` — change the default `APP_SOURCE_URL` to the new repo; keep the
  "Powered by" mechanism, since §13 compliance is why it exists.
- `THIRD_PARTY_NOTICES.md` — remove entries for the dropped packages (AWS SDK, MaxMind,
  usewaypoint, MUI, Emotion).
- `README.md` — rewrite. `docs/` — keep `installation.md`, `configuration.md`, `production.md`
  trimmed; delete `docs/email-delivery/`. Delete `API.md`.
- `CONTRIBUTING.md`, `SECURITY.md`, `CODE_OF_CONDUCT.md` — keep, repoint URLs.
- `.github/ISSUE_TEMPLATE`, `pull_request_template.md`, `dependabot.yml` — keep, repoint.

Then tag `v0.1.0` and use it as the template repo.

---

## Judgment calls I made — flip any of these

| Call | Rationale | To flip |
|---|---|---|
| **Keep the brand-theme feature** (color / font / input-style per workspace) | It themes the *app's own* UI via CSS variables in `app.css`, not email. Genuinely generic and a strong starter-kit differentiator. 3 enums, 1 controller, 1 page, 1 lib file, 3 tests. | Delete `WorkspaceBrand*` enums, `WorkspaceThemeController`, `pages/workspaces/theme.tsx`, `lib/workspace-brand-theme.ts`, and the brand columns. |
| **Drop the media library** | Team-scoped uploads are useful, but they drag `StorageBackend`, `StorageBackendMigrator`, 4 storage commands, image→WebP processing, and Flysystem S3. Not worth it in v1. | Add back after v0.1.0 as a first feature — it's the best test that the kit works. |
| **Drop tags** | `Tag` is subscriber-scoped (`subscriber_tag` pivot); generic tagging would be a rewrite, not an extraction. | — |
| **Keep the browser install flow** | `/install` + `/install/system` + `InstallCommand` + `EnsureInstallationIsPending` is a genuinely nice self-hosted-starter feature and is domain-free once the seeders are trimmed. | Delete the 4 routes, controller, middleware, action, request, migration, and 2 tests. |
| **Keep Horizon despite an empty queue** | You asked for it, and invitation mail + password resets already queue. | — |
| **Keep `laravel/chisel`** | Dev tooling, no domain coupling. | — |

---

## Rough sizing

| Phase | Scope |
|---|---|
| 0 Bootstrap | ~10 files |
| 3 Strip PHP | ~330 files deleted, 6 composer packages |
| 4 Repair seams | ~14 files edited — the thinking-heavy phase |
| 5 Strip frontend | ~140 files deleted, 24 npm packages |
| 6 Rename | ~45 files renamed + a repo-wide `sed` |
| 7 Rebuild shell | 5 files |
| 8 Tests | ~85 deleted, ~40 kept/renamed |
| 9 Agent config | ~15 files + a rules regeneration run |
| 10 Docs | ~12 files |

**What survives:** ~44 UI primitives, 8 layouts, ~35 app components, 12 hooks, 4 lib files,
434 lines of design tokens, 10 skills, the full Fortify + passkey + 2FA stack, workspaces with
roles/permissions/invitations/switching, and the settings shell.
