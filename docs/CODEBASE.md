# Codebase Guide

This guide gives each tracked project file a short purpose statement. Generated dependency files are included, but normally should not be edited by hand.

## Root

| File | Purpose |
| --- | --- |
| `.dockerignore` | Excludes local and unnecessary files from Docker build contexts. |
| `.env.example` | Lists safe example frontend service URL variables. |
| `.gitignore` | Prevents dependencies, builds, secrets, and local files from being committed. |
| `compose.yaml` | Runs the API, frontend, and authenticated Caddy entry point together. |
| `Dockerfile` | Builds the React app and serves it from Nginx. |
| `eslint.config.js` | Defines TypeScript and React lint rules. |
| `index.html` | Provides the HTML shell and React mount element. |
| `package.json` | Declares frontend dependencies and development commands. |
| `package-lock.json` | Locks exact frontend dependency versions for repeatable installs. |
| `README.md` | Documents the project, architecture, setup, and deployment. |
| `docs/CODEBASE.md` | Provides this file-by-file codebase reference. |
| `tsconfig.json` | References the browser and tooling TypeScript configurations. |
| `tsconfig.app.json` | Configures TypeScript for browser application code. |
| `tsconfig.node.json` | Configures TypeScript for Vite and other Node-based tooling. |
| `vite.config.ts` | Enables React and Tailwind and proxies local API requests. |

## Automation and deployment

| File | Purpose |
| --- | --- |
| `.github/workflows/ci.yml` | Runs automated validation in GitHub Actions. |
| `docker/caddy/Caddyfile` | Protects the application with Authentik before proxying requests. |
| `docker/nginx/default.conf` | Serves the SPA and forwards `/api` requests to Fastify. |

## Backend

| File | Purpose |
| --- | --- |
| `server/.env.example` | Lists safe example URLs used for server-side health checks. |
| `server/Dockerfile` | Builds the TypeScript API and creates its production image. |
| `server/package.json` | Declares API dependencies and development, build, and start commands. |
| `server/package-lock.json` | Locks exact backend dependency versions. |
| `server/tsconfig.json` | Configures backend TypeScript compilation. |
| `server/src/index.ts` | Starts Fastify and exposes health, identity, and service-status routes. |
| `server/src/config/serviceTargets.ts` | Maps service IDs to health-check URLs and access levels. |
| `server/src/features/auth/getAuthenticatedUser.ts` | Converts trusted Authentik headers into the application user model. |
| `server/src/features/service-status/checkServiceStatus.ts` | Checks one configured service with a bounded request timeout. |

## Frontend entry and configuration

| File | Purpose |
| --- | --- |
| `src/main.tsx` | Mounts the React application in the browser. |
| `src/App.tsx` | Selects the dashboard as the application root. |
| `src/index.css` | Defines global styles, Tailwind imports, and shared visual defaults. |
| `src/config/serviceUrls.ts` | Reads public service links from Vite environment variables. |

## Authentication feature

| File | Purpose |
| --- | --- |
| `src/features/auth/auth.types.ts` | Defines authenticated-user and API response types. |
| `src/features/auth/authApi.ts` | Requests the current authenticated user from the API. |
| `src/features/auth/hooks/useCurrentUser.ts` | Loads and stores the current user's identity and request state. |
| `src/features/auth/components/AccountMenu.tsx` | Displays account identity, role, and sign-out controls. |

## Dashboard feature

| File | Purpose |
| --- | --- |
| `src/features/dashboard/DashboardPage.tsx` | Combines search, access filtering, status data, and service sections. |
| `src/features/dashboard/components/DashboardHeader.tsx` | Renders branding, search, status summary, refresh, and account controls. |

## Service status feature

| File | Purpose |
| --- | --- |
| `src/features/service-status/serviceStatus.types.ts` | Defines service-health states and API data shapes. |
| `src/features/service-status/serviceStatusApi.ts` | Fetches authorized service statuses from the backend. |
| `src/features/service-status/hooks/useServiceStatuses.ts` | Polls service health and manages refresh, loading, and error state. |
| `src/features/service-status/components/ServiceStatusBadge.tsx` | Shows a compact visual state for one service. |
| `src/features/service-status/components/ServiceStatusSummary.tsx` | Summarizes overall health and the most recent check time. |

## Services feature

| File | Purpose |
| --- | --- |
| `src/features/services/service.types.ts` | Defines service records, categories, and access levels. |
| `src/features/services/serviceCatalog.ts` | Contains display metadata for every dashboard service. |
| `src/features/services/components/ServiceCard.tsx` | Renders one linked service with its health state. |
| `src/features/services/components/ServiceCategoryFilter.tsx` | Filters visible services by category. |
| `src/features/services/components/ServiceGrid.tsx` | Lays service cards out in a responsive grid. |
| `src/features/services/components/ServiceSection.tsx` | Groups a titled set of service cards. |

## Static assets

| File | Purpose |
| --- | --- |
| `public/favicon.svg` | Supplies the browser tab icon. |
| `public/icons.svg` | Stores shared interface icon symbols. |
| `public/icons/services/*.svg` | Supplies the individual service logos used by cards. |
| `docs/images/ChuPham_Dashboard.png` | Provides the dashboard preview shown in the README. |
