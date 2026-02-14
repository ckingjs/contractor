import cors from "cors";
import express from "express";
import { z } from "zod";

const clockEventSchema = z.object({
  project_id: z.string().uuid(),
  type: z.enum(["clock_in", "clock_out", "break_start", "break_end"]),
  location: z.object({
    latitude: z.number(),
    longitude: z.number(),
    accuracy: z.number().nonnegative()
  }),
  timestamp: z.string().datetime()
});

export function createApp() {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get("/api/v1/health", (_req, res) => {
    res.json({ status: "ok", service: "api", version: "0.1.0" });
  });

  app.post("/api/v1/time-entries", (req, res) => {
    const parsed = clockEventSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Invalid time entry payload.",
        errors: parsed.error.flatten()
      });
    }

    return res.status(201).json({
      id: crypto.randomUUID(),
      ...parsed.data,
      synced_at: new Date().toISOString(),
      created_at: new Date().toISOString()
    });
  });

  return app;
}
