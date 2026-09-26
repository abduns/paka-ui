# Security policy

## Reporting a vulnerability

Do not disclose suspected vulnerabilities in a public issue, discussion, pull request, or chat transcript.

Use GitHub's private vulnerability reporting for this repository:

https://github.com/abduns/starterkit/security/advisories/new

Include the affected commit or release, deployment details that matter, reproduction steps, impact, and any proposed mitigation. Remove real credentials and other personal data from the report.

The maintainer will acknowledge a complete report as soon as practical, investigate it, and coordinate remediation and disclosure. Response times are best-effort because this is a community-maintained project.

## Supported versions

Security fixes are applied to the current `main` branch and, when tagged releases exist, the latest release line. Older commits and forks are not maintained by this project.

## Operator responsibilities

Self-hosting transfers important security responsibilities to the operator:

- Set `APP_ENV=production`, `APP_DEBUG=false`, and a correct HTTPS `APP_URL`.
- Generate a unique `APP_KEY`, store it as a secret, and back it up. It protects every signed link, session, and encrypted value the application issues.
- Keep registration invitation-only unless public sign-up is intentional.
- Restrict Horizon with `HORIZON_ALLOWED_EMAILS` and configure trusted proxies narrowly.
- Run the web application, Horizon, Redis, database, and scheduler with least-privilege service accounts.
- Keep dependencies and the host operating system patched.
- Protect database backups and uploaded files; both can contain personal or confidential data.

See [Production deployment](docs/production.md) for the full checklist.
