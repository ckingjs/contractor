import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { prisma } from "./lib/prisma.js";
import { authRouter } from "./modules/auth/routes.js";
import { projectRouter } from "./modules/projects/routes.js";
import { timeEntriesRouter } from "./modules/time-entries/routes.js";

export function createApp() {
  const app = express();
  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(
    "/api",
    rateLimit({
      windowMs: 60 * 1000,
      limit: 120,
      standardHeaders: true,
      legacyHeaders: false
    })
  );

  app.get("/api/v1/health", async (_req, res) => {
    try {
      await prisma.$queryRaw`SELECT 1`;
      return res.json({ status: "ok", service: "api", version: "0.3.0", database: "up" });
    } catch {
      return res.status(503).json({ status: "degraded", service: "api", version: "0.3.0", database: "down" });
    }
  });

  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/projects", projectRouter);
  app.use("/api/v1/time-entries", timeEntriesRouter);

  return app;
}
