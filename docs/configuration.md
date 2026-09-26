# Configuration

Copy `.env.example` to `.env` and treat the resulting file as a secret. This page explains the settings that are specific or especially important to Starter Kit; Laravel's standard settings retain their normal behavior.

## Application and access

| Variable | Purpose | Production guidance |
| --- | --- | --- |
| `APP_KEY` | Encrypts application secrets and signed data | Generate once, back it up securely, and do not rotate casually |
| `APP_PREVIOUS_KEYS` | Former `APP_KEY` values kept as decryption fallbacks | Set during a rotation so already-signed links and sessions keep working |
| `APP_URL` | Canonical origin for signed links and the passkey relying party | Use the public HTTPS origin |
| `APP_DEBUG` | Detailed exception output | Always `false` in production |
| `PASSKEYS_USER_HANDLE_SECRET` | Derives the WebAuthn user handle | Set it explicitly; left empty it defaults to `APP_KEY` |
| `REGISTRATION_ENABLED` | Allows public account creation | Prefer `false` unless open registration is intentional |
| `TRUSTED_PROXIES` | Trusts proxy-provided client addresses | Use explicit proxy addresses when possible; never set `*` on a directly exposed server |

Invited teammates can finish registration even when public registration is disabled.

`APP_URL` carries more weight than its name suggests. Password-reset links and email-verification links are signed against this value, so changing it invalidates links already sent. Its host is also the passkey relying party ID, so a change locks people out of passkey sign-in unless `PASSKEYS_USER_HANDLE_SECRET` was set independently.

## Database, Redis, and queues

SQLite is convenient locally and is the default. PostgreSQL and MySQL/MariaDB are also supported — set `DB_CONNECTION` and uncomment the connection details in `.env.example`. Use a managed or operationally backed-up database for production workloads.

Starter Kit defaults to Redis for cache and queues. Horizon runs a single `default` supervisor that processes every queued job — password-reset and verification email, workspace invitation email, and its own metrics snapshots. Process caps and wait thresholds are controlled by the `HORIZON_*` variables in `.env.example`.

## System email

There is one mail configuration, the application-wide `MAIL_*` values, used for account verification, password resets, and workspace invitation notifications. There is no per-workspace or per-tenant mail configuration. See [Installation → System email](installation.md#system-email).

## Storage

`FILESYSTEM_DISK=local` stores workspace logos and other user uploads under `storage/app/public`, symlinked to `public/storage` by `storage:link` (run automatically during `app:install`). Include that directory in backups. The starter kit does not ship a cloud storage driver out of the box — add one (e.g. `league/flysystem-aws-s3-v3`) and configure a `filesystems.disks` entry if you need it.

## Horizon access and alerts

Outside local development, `/horizon` is limited to the comma-separated accounts in `HORIZON_ALLOWED_EMAILS`. Leave no production dashboard accidentally public.

Set `HORIZON_NOTIFICATION_EMAIL` to receive long-wait alerts and keep the scheduled `horizon:snapshot` command running for metrics.

## Secrets

Never commit `.env`, database dumps, or generated storage content. Prefer the hosting platform's secret manager and restrict access to backups and logs.
