# Installation

This guide installs Starter Kit for local development or evaluation. Read [Production deployment](production.md) before exposing it to the internet.

## Requirements

- PHP 8.4 or newer with the extensions required by `composer.lock`
- Composer 2
- Node.js 22 and Bun 1.3
- Redis
- SQLite, MySQL, MariaDB, or PostgreSQL
- An SMTP relay (or `MAIL_MAILER=log`) for account verification, password resets, and workspace invitations

The default `.env.example` uses SQLite, Redis queues, Redis cache, and a local SMTP relay on port 2525. That relay is only a development default; it is not suitable for a public installation.

## System email

Starter Kit sends email for one purpose: account verification, password resets, and workspace invitations, all through the application-wide `MAIL_*` values in `.env`. There is no per-workspace mail configuration — every workspace shares the same system mailer.

For local development, start an SMTP catcher on `127.0.0.1:2525` or set `MAIL_MAILER=log` to write messages to the application log. For production, configure a real relay in `.env` or the hosting platform's secret manager before enabling registration or sending invitations:

```dotenv
MAIL_MAILER=smtp
MAIL_SCHEME=null
MAIL_HOST=smtp.example.com
MAIL_PORT=587
MAIL_USERNAME=your-smtp-username
MAIL_PASSWORD=your-smtp-password
MAIL_FROM_ADDRESS=no-reply@example.com
MAIL_FROM_NAME="${APP_NAME}"
```

Use credentials supplied by the relay and make sure `MAIL_FROM_ADDRESS` is authorized by that provider. Use `MAIL_SCHEME=smtps` with port 465 only when the provider requires implicit TLS. Never commit the populated `.env` file.

## Automatic setup

```bash
git clone https://github.com/abduns/starterkit.git
cd starterkit
cp .env.example .env
# Review the database, Redis, and MAIL_* values in .env.
touch database/database.sqlite
composer setup
```

Before running `composer setup`, adjust the database, Redis, and `MAIL_*` values in `.env` when you are not using the local defaults. Start Redis and the configured local mail relay before running the command. The installer will:

1. install PHP dependencies;
2. generate `APP_KEY`;
3. migrate the database and seed baseline permissions;
4. ask whether registration is open or invitation-only;
5. create the first administrator;
6. link public storage (`storage:link`);
7. install JavaScript dependencies; and
8. build production frontend assets.

The command is idempotent — running it again on an existing installation leaves what's already configured untouched, which is what makes it safe to call from a deploy script (see [Production deployment](production.md)).

## Manual setup

Use this sequence when you want to control each step:

```bash
composer install
bun install --frozen-lockfile
cp .env.example .env
touch database/database.sqlite
php artisan key:generate
php artisan app:install
bun run build
```

Adjust database, Redis, and `MAIL_*` values in `.env` before `app:install` if you are not using the local defaults.

## Run the application

```bash
composer dev
```

This starts the Laravel development server, Vite, Horizon, and the log viewer. Run scheduled tasks in another terminal to prune expired workspace invitations and capture Horizon metrics snapshots:

```bash
php artisan schedule:work
```

## Verify the installation

Keep Horizon running while testing because password resets and workspace invitations are queued. Request a password-reset link for an account you control and confirm that it arrives through the system mailer. Then invite a teammate to your workspace from **Settings → Workspace → Members** and confirm the invitation email arrives too.

Run the repository checks:

```bash
composer validate
composer ci:check
composer audit --locked
bun audit --audit-level=high
```

If frontend changes do not appear, run `bun run build` or keep `composer dev` running.

## Common problems

### Redis connection errors

Redis must be reachable during installation because permissions and application caches are initialized while migrations run. Start Redis or change both `CACHE_STORE` and `QUEUE_CONNECTION` to services available in your environment.

### Messages remain queued

Keep `php artisan horizon` running. A web server alone does not process queued jobs — password resets, workspace invitations, and Horizon's own metrics snapshots.

### Password resets or invitations never arrive

Confirm the system `MAIL_*` values point to a reachable relay (or set `MAIL_MAILER=log` to inspect messages in the log instead), and that the `default` queue is being processed. After changing production environment values, rebuild Laravel's cached configuration and restart Horizon so workers load the new mailer:

```bash
php artisan optimize:clear
php artisan optimize
php artisan horizon:terminate
```

### Scheduled work does not run

Use `php artisan schedule:work` locally. Production should execute `php artisan schedule:run` every minute.
