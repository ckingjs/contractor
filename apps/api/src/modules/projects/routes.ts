import { Router } from "express";
import { z } from "zod";
import { store } from "../../data/store.js";
import { requireAuth, requireRole } from "../../middleware/auth.js";

const geofenceSchema = z.object({
  enabled: z.boolean(),
  latitude: z.number(),
  longitude: z.number(),
  radius_meters: z.number().min(50).max(500),
  address: z.string().min(3)
});

export const projectRouter = Router();

projectRouter.get("/", requireAuth, (_req, res) => {
  return res.json({ projects: store.projects });
});

projectRouter.patch("/:id/geofence", requireAuth, requireRole(["admin", "manager"]), (req, res) => {
  const parsed = geofenceSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid geofence payload.", errors: parsed.error.flatten() });
  }

  const project = store.projects.find((candidate) => candidate.id === req.params.id);
  if (!project) {
    return res.status(404).json({ message: "Project not found." });
  }

  project.geofence = parsed.data;
  return res.json({ project });
});
