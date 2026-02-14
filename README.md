# Contractor Management Monorepo

Initial implementation scaffold based on `specs/spec.md` with a Stage 2 vertical slice.

## Workspace layout

- `apps/api`: Node.js + Express TypeScript API
- `apps/web`: React + Vite TypeScript frontend
- `packages/shared`: shared types/constants for cross-app usage
- `specs/`: product and technical specification documents

## Quick start

```bash
npm install
npm run dev
```

This runs workspace dev scripts. You can also run services individually:

```bash
npm run dev -w @contractor/api
npm run dev -w @contractor/web
```

## Stage 2 implemented scope

- Authentication endpoints:
  - `POST /api/v1/auth/login`
  - `GET /api/v1/auth/me`
- Project endpoints:
  - `GET /api/v1/projects`
  - `PATCH /api/v1/projects/:id/geofence` (manager/admin)
- Time entry endpoints:
  - `POST /api/v1/time-entries` with geofence distance validation
  - `GET /api/v1/time-entries` with query filters
  - `PATCH /api/v1/time-entries/:id` (manager/admin)
- Audit log capture for time entry create/update events (in-memory store)
- Frontend authenticated clock-in/clock-out workflow with geolocation capture and latest entry display

## Demo credentials

- `worker@contractor.local` / `pass1234`
- `manager@contractor.local` / `pass1234`

## Data persistence note

Current Stage 2 implementation uses an in-memory store for speed of iteration. Persisted Postgres/Prisma storage and offline queue sync are the next priority items.
