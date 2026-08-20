# ChuPham HomeLab

A self-hosted homelab portal for accessing, organizing, and monitoring services running on my home server.

The project provides a single authenticated dashboard for family-facing services while keeping administrative tools private behind Tailscale and role-based access.

---

## Features

- Central dashboard for self-hosted services
- Authentik authentication
- Family and administrator roles
- Role-aware service visibility
- Backend-enforced service-status filtering
- Search and category filtering
- Live service health monitoring
- Manual and automatic status refresh
- Responsive interface
- Authenticated account display
- Sign-out through Authentik
- Docker Compose deployment
- Cloudflare Tunnel for public access
- Tailscale-only access for administrative services

---

## Architecture

```text
                         Internet
                            │
                            ▼
                    Cloudflare Tunnel
                            │
                            ▼
                         Caddy
                            │
                            ▼
                  Authentik Forward Auth
                            │
                            ▼
                    HomeLab Dashboard
                  ┌───────────────────┐
                  │   React + Nginx   │
                  └─────────┬─────────┘
                            │
                          /api
                            │
                            ▼
                       Fastify API
                            │
                            ▼
                    Service Health Checks
                            │
               ┌────────────┴────────────┐
               │                         │
               ▼                         ▼
        Family Services            Admin Services
                                     via Tailscale
```

The public dashboard is protected by Authentik before the user reaches the application.

Administrative tools are intentionally not exposed through Cloudflare Tunnel and instead use Tailscale for private access.

---

## Access Model

### Family users

Family users authenticate through Authentik and can access the family-facing section of the dashboard.

Typical services include:

- Jellyfin
- Immich
- Audiobookshelf
- Seerr

The backend also limits service-status information to services the family role is allowed to access.

### Administrators

Administrators belong to the Authentik group:

```text
homelab-admins
```

Administrators can additionally see:

- Sonarr
- Radarr
- Prowlarr
- Deluge

These services use private Tailscale addresses and are not exposed through public Cloudflare routes.

---

## Technology Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Nginx

### Backend

- Node.js
- TypeScript
- Fastify

### Infrastructure

- Docker
- Docker Compose
- Caddy
- Authentik
- Cloudflare Tunnel
- Tailscale

---

## Services

### Family-facing services

| Service | Purpose |
| --- | --- |
| Jellyfin | Movies and TV shows |
| Immich | Photo and video management |
| Audiobookshelf | Audiobooks and books |
| Seerr | Media requests |

### Administrative services

| Service | Purpose |
| --- | --- |
| Sonarr | TV automation |
| Radarr | Movie automation |
| Prowlarr | Indexer management |
| Deluge | Download client |

Administrative services are only displayed to users with administrator access.

---

## Authentication

Authentication is handled by Authentik.

The project currently uses two main groups:

```text
family
homelab-admins
```

Authentik provides identity information to the application through proxy headers such as:

```text
X-Authentik-Username
X-Authentik-Groups
X-Authentik-Email
X-Authentik-Name
```

The Fastify backend parses these headers and creates an authenticated user object.

Example:

```ts
{
  username: "example-user",
  email: "user@example.com",
  name: "Example User",
  groups: ["family"],
  isAdmin: false,
  isFamily: true
}
```

---

## Authorization

Authorization is enforced in both the frontend and backend.

The frontend uses the authenticated user's role to determine which services and navigation options should be displayed.

The backend independently filters protected data.

For example:

```text
family
   │
   ▼
GET /api/services/status
   │
   ▼
Jellyfin
Immich
Audiobookshelf
Seerr
```

An administrator receives status information for all configured services.

This means the project does not rely only on hiding frontend components for access control.

---

## Network Security

The project separates public family access from private administration access.

### Public path

```text
Browser
   │
   ▼
Cloudflare Tunnel
   │
   ▼
Caddy
   │
   ▼
Authentik
   │
   ▼
HomeLab Portal
```

### Private admin path

```text
Administrator device
        │
        ▼
     Tailscale
        │
        ▼
Sonarr / Radarr / Prowlarr / Deluge
```

Administrative applications are intentionally excluded from public Cloudflare routes.

---

## Service Monitoring

The backend periodically checks configured service targets and reports their current state.

Possible states include:

- Online
- Offline
- Unconfigured

The service status response can also include:

- HTTP status
- Response time
- Last checked timestamp

The frontend refreshes service status automatically and also includes a manual refresh option.

---

## Repository Structure

```text
.
├── docker/
│   ├── caddy/
│   │   └── Caddyfile
│   └── nginx/
│       └── default.conf
│
├── public/
│   └── icons/
│       └── services/
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   │   └── serviceTargets.ts
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   └── service-status/
│   │   └── index.ts
│   ├── .env.example
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
│
├── src/
│   ├── config/
│   └── features/
│       ├── auth/
│       ├── dashboard/
│       ├── services/
│       └── service-status/
│
├── .dockerignore
├── .env.example
├── .gitignore
├── compose.yaml
├── Dockerfile
├── eslint.config.js
├── index.html
├── package.json
├── README.md
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

---

## Local Development

### Requirements

- Node.js
- npm

Clone the repository:

```bash
git clone https://github.com/CChumChum/ChuPham-HomeLab-Project.git
cd ChuPham-HomeLab-Project
```

Install frontend dependencies:

```bash
npm install
```

Install backend dependencies:

```bash
cd server
npm install
cd ..
```

---

## Environment Configuration

The repository contains example environment files:

```text
.env.example
server/.env.example
```

Create local copies:

```bash
cp .env.example .env.local
cp server/.env.example server/.env
```

Update the values for your own environment.

Real environment files are excluded from Git.

---

## Frontend Environment Variables

Frontend navigation URLs use Vite environment variables.

Example:

```env
VITE_JELLYFIN_URL=https://jellyfin.example.com
VITE_IMMICH_URL=https://immich.example.com
VITE_AUDIOBOOKSHELF_URL=https://books.example.com
VITE_SEERR_URL=https://requests.example.com

VITE_SONARR_URL=http://private-host:8989
VITE_RADARR_URL=http://private-host:7878
VITE_PROWLARR_URL=http://private-host:9696
VITE_DELUGE_URL=http://private-host:8112
```

Variables beginning with `VITE_` are included in the browser build and must never contain passwords, API keys, tokens, or other secrets.

---

## Backend Environment Variables

The backend uses separate service URLs for health checks.

Example:

```env
JELLYFIN_URL=http://service-address
IMMICH_URL=http://service-address
AUDIOBOOKSHELF_URL=http://service-address
SEERR_URL=http://service-address

SONARR_URL=http://service-address
RADARR_URL=http://service-address
PROWLARR_URL=http://service-address
DELUGE_URL=http://service-address
```

These variables are stored in `server/.env` and excluded from Git.

---

## Running Locally

### Backend

```bash
cd server
npm run dev
```

By default the API runs at:

```text
http://127.0.0.1:3001
```

### Frontend

In another terminal:

```bash
npm run dev
```

Vite proxies `/api` requests to the backend during local development.

---

## Building

Frontend:

```bash
npm run build
```

Backend:

```bash
cd server
npm run build
```

---

## Docker Deployment

Create the required private environment files:

```text
.env
server/.env
```

Then run:

```bash
docker compose up -d --build
```

Check container status:

```bash
docker compose ps
```

The primary containers are:

```text
api
frontend
caddy
```

---

## Production Request Flow

```text
https://example.com
        │
        ▼
Cloudflare Tunnel
        │
        ▼
Caddy
        │
        ▼
Authentik
        │
        ▼
Nginx
        │
        ▼
React
```

API requests follow:

```text
Browser
   │
   ▼
/api/*
   │
   ▼
Caddy
   │
   ▼
Nginx
   │
   ▼
Fastify
```

---

## Reverse Proxy Design

Caddy is the external entry point for the dashboard stack.

The frontend container is intentionally not exposed directly through a host port.

```text
Host
 │
 ▼
Caddy
 │
 ▼
Frontend
 │
 ▼
API
```

This avoids creating a direct route to the frontend that could bypass Authentik.

---

## Cloudflare Tunnel

Cloudflare Tunnel provides remote access without traditional router port forwarding.

The public HomeLab hostname points to Caddy.

Authentik can use a separate public hostname such as:

```text
auth.example.com
```

Administrative applications do not require Cloudflare routes.

---

## Tailscale

Tailscale is used for private administrative access.

```text
Admin laptop
     │
     ▼
Tailscale
     │
     ├── Sonarr
     ├── Radarr
     ├── Prowlarr
     └── Deluge
```

---

## Security

Several security decisions are intentionally built into the project:

- Real `.env` files are excluded from Git
- API keys and passwords are never stored in the frontend
- Authentik protects the dashboard
- Backend authorization is based on authenticated group membership
- Administrator-only service data is filtered server-side
- The frontend container is not exposed directly
- Administrative applications are not exposed publicly
- Tailscale provides a private network boundary for admin tools
- Cloudflare Tunnel is used instead of public router port forwarding

---

## Secrets

Never commit:

```text
.env
.env.local
server/.env
```

Also never commit:

- Passwords
- API keys
- Authentik secrets
- Cloudflare Tunnel tokens
- Private keys
- SSH keys
- Certificates containing private keys

The repository should contain only safe example configuration.

---

## Documentation

Additional documentation can be kept in:

```text
docs/
├── ARCHITECTURE.md
├── DEPLOYMENT.md
└── SECURITY.md
```

---

## Continuous Integration

GitHub Actions can validate both projects on pushes and pull requests.

```text
Frontend
├── npm ci
└── npm run build

Backend
├── npm ci
└── npm run build
```

---

## Roadmap

Potential future improvements include:

- Dashboard customization
- User favorites
- Service ordering
- Additional monitoring
- Improved mobile navigation
- Better account controls
- Automated dependency updates
- Container security scanning
- Additional deployment documentation
- More service integrations

---

## Disclaimer

This repository contains application and infrastructure code for a personal homelab environment.

Environment-specific credentials, secrets, private addresses, authentication keys, and other sensitive values are intentionally excluded.

Anyone adapting this project should review the authentication, networking, and deployment configuration for their own environment.
