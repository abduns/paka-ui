# Production deployment

This checklist describes the application processes and security controls a Starter Kit production installation needs. Adapt commands to the hosting platform and test restores before accepting real data.

## Before deployment

- Use a supported PHP version and install dependencies from the committed lockfiles.
- Provision a production database and Redis with authentication and private network access.
- Configure HTTPS and set `APP_URL` to the public origin.
- Set `APP_ENV=production`, `APP_DEBUG=false`, and `REGISTRATION_ENABLED=false` unless open sign-up is intentional.
- Generate a unique `APP_KEY` and store it in the platform's secret manager.
- Configure trusted proxies and an application-wide mailer for account verification, password resets, and workspace invitations.

## Build and install

```bash
composer install --no-dev --optimize-autoloader
bun install --frozen-lockfile
bun run build
php artisan app:install --registration=closed
php artisan optimize
```

Run the first installation interactively so the administrator password does not enter shell history or a deployment log. On later automated deployments, the idempotent installer can be used without administrator credentials:

```bash
php artisan app:install --no-interaction --force --registration=closed
```

The web server's document root must be the repository's `public` directory. The application process must not run as `root`, and only Laravel's required storage and cache directories should be writable.

## Required long-running processes

### Queue workers

Keep Horizon alive under a process manager:

```bash
php artisan horizon
```

Restart workers after every deployment so they load new code:

```bash
php artisan horizon:terminate
```

### Scheduler

Run this command every minute:

```bash
php artisan schedule:run
```

The schedule captures Horizon metrics snapshots and deletes expired workspace invitations.

## Storage and backups

Back up and regularly restore-test:

- the database;
- `APP_KEY` and every deployment secret;
- locally uploaded files (workspace logos, under `storage/app/public`); and
- infrastructure configuration needed to recreate workers, schedules, and domains.

Losing `APP_KEY` invalidates every signed link and session cookie already issued. A database-only backup is incomplete when local storage is in use.

## Security checklist

- Keep public registration closed unless it is monitored and intentional.
- Allowlist Horizon accounts with `HORIZON_ALLOWED_EMAILS`.
- Use narrowly scoped trusted proxy addresses.
- Restrict database, Redis, and storage to the application network.
- Apply operating-system, PHP, Composer, and JavaScript dependency security updates.
- Run `composer audit --locked` and `bun audit --audit-level=high` during deployment or CI.
- Protect logs and backups from exposing credentials or personal data.

## Health checks after deployment

```bash
php artisan about
php artisan migrate:status
php artisan horizon:status
php artisan schedule:list
```

Then sign in, confirm that `/horizon` follows the configured access policy, request a password reset and confirm it arrives, invite a teammate to a workspace and confirm that invitation arrives, and verify the scheduler and queues are moving.

No checklist can guarantee a secure deployment. Reassess the threat model whenever Starter Kit is exposed to a new network, tenant model, or volume of personal data.
