# Starter Kit

[![Tests](https://github.com/abduns/starterkit/actions/workflows/tests.yml/badge.svg)](https://github.com/abduns/starterkit/actions/workflows/tests.yml)

A Laravel 13 + Inertia 3 + React 19 starter kit for building multi-tenant SaaS products. It ships workspaces with roles and invitations, full authentication (passwords, email verification, two-factor authentication, passkeys), and a complete design system — so a new project starts from a working app instead of an empty one.

## Features

- Workspaces with roles, member management, and email invitations
- Fortify-based authentication: registration, password reset, email verification, two-factor authentication, and passkeys
- Invitation-only registration for public installations, with invited teammates still able to finish sign-up
- Light, dark, and system appearance
- A ~44-primitive component system built on Base UI, Tailwind CSS 4, and Hugeicons, generated with the shadcn CLI
- A browser-based guided installer (`/install`) for first-run setup on a fresh deployment
- DiceBear-generated fallback avatars
- Redis-backed queues with Laravel Horizon
- Role/permission management via `spatie/laravel-permission`

## Technology

Built with Laravel 13, Inertia 3, React 19, TypeScript, Tailwind CSS 4, Base UI, Bun, Redis, Laravel Horizon, and Pest.

## Quick start

You need PHP 8.4 or newer, Composer 2, Node.js 22, Bun 1.3, Redis, and a database supported by Laravel. SQLite is the default for local development.

```bash
git clone https://github.com/abduns/starterkit.git
cd starterkit
cp .env.example .env
# Review the database, Redis, and MAIL_* values in .env.
touch database/database.sqlite
composer setup
composer dev
```

`composer setup` installs dependencies, runs the interactive `app:install` command (application key, migrations, sign-up policy, first administrator), and builds the frontend. `composer dev` starts the web server, Vite, Horizon, and the log viewer together.

Start Redis before running the installer. The example environment expects a local SMTP relay at `127.0.0.1:2525` for account verification, password reset, and invitation emails; start one for local development or set `MAIL_MAILER=log`.

See the [installation guide](docs/installation.md) for a manual setup, alternate databases, and common problems.

## Production

A production deployment needs more than a web process. Keep Horizon supervised, run Laravel's scheduler every minute, configure a real mail transport, and back up the database, `APP_KEY`, and uploaded files.

Read the [production deployment guide](docs/production.md) and [configuration reference](docs/configuration.md) before exposing an installation to the internet. New public installations should normally use invitation-only registration:

```bash
php artisan app:install --registration=closed
```

## Documentation

- [Installation](docs/installation.md)
- [Configuration](docs/configuration.md)
- [Production deployment](docs/production.md)
- [Security policy](SECURITY.md)
- [Contributing](CONTRIBUTING.md)

## Development checks

Run the same checks used by continuous integration:

```bash
composer validate
composer ci:check
composer audit --locked
bun audit --audit-level=high
```

## License

Copyright (c) 2026 Your Organization.

Starter Kit is licensed under the [MIT License](LICENSE).

Third-party packages, artwork, and trademarks remain subject to their own terms; see [Third-party notices](THIRD_PARTY_NOTICES.md).
