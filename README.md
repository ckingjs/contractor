# Contractor Management Monorepo

Initial implementation scaffold based on `specs/spec.md`.

## Workspace layout

- `apps/api`: Node.js + Express TypeScript API
- `apps/web`: React + Vite TypeScript frontend shell
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

## Initial implemented scope

- Health endpoint at `GET /api/v1/health`
- Time entry endpoint at `POST /api/v1/time-entries` with schema validation
- Frontend dashboard shell with module cards aligned to the spec
- Baseline tests for API and frontend rendering

## Next steps

- Add auth and role-based access control
- Connect PostgreSQL + Redis and Prisma models
- Implement offline sync and PWA setup
- Expand API modules (projects, expenses, messaging, notifications)
