import { Router } from "express";
import { z } from "zod";
import { prisma } from "../../lib/prisma.js";
import { requireAuth, requireRole } from "../../middleware/auth.js";

const geofenceSchema = z.object({
  enabled: z.boolean(),
  latitude: z.number(),
  longitude: z.number(),
  radius_meters: z.number().min(50).max(500),
  address: z.string().min(3)
});

export const projectRouter = Router();

projectRouter.get("/", requireAuth, async (_req, res) => {
  const projects = await prisma.project.findMany({ orderBy: { createdAt: "desc" } });

  return res.json({
    projects: projects.map((project) => ({
      id: project.id,
      name: project.name,
      geofence: {
        enabled: project.geofenceEnabled,
        latitude: project.geofenceLat,
        longitude: project.geofenceLng,
        radius_meters: project.geofenceRadius,
        address: project.geofenceAddress
      }
    }))
  });
});

projectRouter.patch("/:id/geofence", requireAuth, requireRole(["admin", "manager"]), async (req, res) => {
  const parsed = geofenceSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid geofence payload.", errors: parsed.error.flatten() });
  }

  const project = await prisma.project.findUnique({ where: { id: req.params.id } });
  if (!project) {
    return res.status(404).json({ message: "Project not found." });
  }

  const updated = await prisma.project.update({
    where: { id: req.params.id },
    data: {
      geofenceEnabled: parsed.data.enabled,
      geofenceLat: parsed.data.latitude,
      geofenceLng: parsed.data.longitude,
      geofenceRadius: Math.round(parsed.data.radius_meters),
      geofenceAddress: parsed.data.address
    }
  });

  return res.json({
    project: {
      id: updated.id,
      name: updated.name,
      geofence: {
        enabled: updated.geofenceEnabled,
        latitude: updated.geofenceLat,
        longitude: updated.geofenceLng,
        radius_meters: updated.geofenceRadius,
        address: updated.geofenceAddress
      }
    }
  });
});
