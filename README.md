# Contractor Management Monorepo

Specification-driven contractor management platform.

## Workspace layout

- `apps/api`: Express TypeScript API (Stage 3: Prisma/Postgres-backed)
- `apps/web`: React + Vite frontend
- `packages/shared`: shared domain types/constants
- `specs/`: product and technical specification documents

## Quick start

```bash
npm install
docker compose up -d postgres redis
cp apps/api/.env.example apps/api/.env
npm run prisma:generate -w @contractor/api
npm run prisma:migrate -w @contractor/api
npm run prisma:seed -w @contractor/api
npm run dev
```

## Stage 3 implemented scope

- Postgres persistence with Prisma models and seed data (`users`, `projects`, `time_entries`, `audit_logs`)
- API hardening with Helmet, rate limiting, env validation, and DB-aware health check
- JWT auth login with bcrypt password verification and role-based middleware
- Geofence-aware time entry creation/listing/editing persisted in database
- Manager/admin geofence management endpoint persisted to database
- Frontend Stage 2 authenticated clock-in/out workflow retained and compatible with persisted API

## API endpoints

- `GET /api/v1/health`
- `POST /api/v1/auth/login`
- `GET /api/v1/auth/me`
- `GET /api/v1/projects`
- `PATCH /api/v1/projects/:id/geofence`
- `POST /api/v1/time-entries`
- `GET /api/v1/time-entries`
- `PATCH /api/v1/time-entries/:id`

## Demo credentials

- `worker@contractor.local` / `pass1234`
- `manager@contractor.local` / `pass1234`

## Next stage

- Offline queue + sync conflict handling
- Notification pipeline (email/push)
- OpenAPI generation + CI pipeline gates
