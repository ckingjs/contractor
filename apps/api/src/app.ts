import cors from "cors";
import express from "express";
import { authRouter } from "./modules/auth/routes.js";
import { projectRouter } from "./modules/projects/routes.js";
import { timeEntriesRouter } from "./modules/time-entries/routes.js";

export function createApp() {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get("/api/v1/health", (_req, res) => {
    res.json({ status: "ok", service: "api", version: "0.2.0" });
  });

  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/projects", projectRouter);
  app.use("/api/v1/time-entries", timeEntriesRouter);

  return app;
}
