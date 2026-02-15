import { TimeEntryType } from "@prisma/client";
import { Router } from "express";
import { z } from "zod";
import { prisma } from "../../lib/prisma.js";
import { haversineDistanceMeters } from "../../lib/geofence.js";
import { requireAuth, requireRole } from "../../middleware/auth.js";

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

const listQuerySchema = z.object({
  user_id: z.string().uuid().optional(),
  project_id: z.string().uuid().optional(),
  from: z.string().datetime().optional(),
  to: z.string().datetime().optional()
});

const patchSchema = z.object({
  timestamp: z.string().datetime().optional(),
  reason: z.string().min(3).optional()
});

export const timeEntriesRouter = Router();

timeEntriesRouter.post("/", requireAuth, async (req, res) => {
  const parsed = clockEventSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      message: "Invalid time entry payload.",
      errors: parsed.error.flatten()
    });
  }

  const project = await prisma.project.findUnique({ where: { id: parsed.data.project_id } });
  if (!project) {
    return res.status(404).json({ message: "Project not found." });
  }

  const hasGeofence =
    project.geofenceEnabled &&
    project.geofenceLat !== null &&
    project.geofenceLng !== null &&
    project.geofenceRadius !== null;

  const distance = hasGeofence
    ? haversineDistanceMeters(
        parsed.data.location.latitude,
        parsed.data.location.longitude,
        project.geofenceLat!,
        project.geofenceLng!
      )
    : 0;

  const isWithinGeofence = !hasGeofence || distance <= project.geofenceRadius!;

  if (!isWithinGeofence && parsed.data.type === "clock_in") {
    return res.status(422).json({
      message: "Clock in denied. Worker is outside geofence radius.",
      distance_from_site: Number(distance.toFixed(2)),
      radius_meters: project.geofenceRadius
    });
  }

  const entry = await prisma.timeEntry.create({
    data: {
      userId: req.authUser!.id,
      projectId: parsed.data.project_id,
      type: parsed.data.type as TimeEntryType,
      timestamp: new Date(parsed.data.timestamp),
      locationLat: parsed.data.location.latitude,
      locationLng: parsed.data.location.longitude,
      locationAccuracy: parsed.data.location.accuracy,
      isWithinGeofence,
      distanceFromSite: Number(distance.toFixed(2)),
      syncedAt: new Date()
    }
  });

  await prisma.auditLog.create({
    data: {
      actorUserId: req.authUser!.id,
      action: "time_entry.create",
      entityType: "time_entry",
      entityId: entry.id
    }
  });

  return res.status(201).json({
    id: entry.id,
    user_id: entry.userId,
    project_id: entry.projectId,
    type: entry.type,
    timestamp: entry.timestamp.toISOString(),
    location_lat: entry.locationLat,
    location_lng: entry.locationLng,
    location_accuracy: entry.locationAccuracy,
    is_within_geofence: entry.isWithinGeofence,
    distance_from_site: entry.distanceFromSite,
    synced_at: entry.syncedAt?.toISOString(),
    created_at: entry.createdAt.toISOString()
  });
});

timeEntriesRouter.get("/", requireAuth, async (req, res) => {
  const parsed = listQuerySchema.safeParse(req.query);
  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid query parameters.", errors: parsed.error.flatten() });
  }

  const isManagerScope = ["admin", "manager"].includes(req.authUser!.role);
  const where = {
    userId: parsed.data.user_id ?? (isManagerScope ? undefined : req.authUser!.id),
    projectId: parsed.data.project_id,
    timestamp: {
      gte: parsed.data.from ? new Date(parsed.data.from) : undefined,
      lte: parsed.data.to ? new Date(parsed.data.to) : undefined
    }
  };

  const entries = await prisma.timeEntry.findMany({ where, orderBy: { timestamp: "desc" } });

  return res.json({
    entries: entries.map((entry) => ({
      id: entry.id,
      user_id: entry.userId,
      project_id: entry.projectId,
      type: entry.type,
      timestamp: entry.timestamp.toISOString(),
      location_lat: entry.locationLat,
      location_lng: entry.locationLng,
      location_accuracy: entry.locationAccuracy,
      is_within_geofence: entry.isWithinGeofence,
      distance_from_site: entry.distanceFromSite,
      synced_at: entry.syncedAt?.toISOString(),
      created_at: entry.createdAt.toISOString()
    }))
  });
});

timeEntriesRouter.patch("/:id", requireAuth, requireRole(["admin", "manager"]), async (req, res) => {
  const parsed = patchSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid patch payload.", errors: parsed.error.flatten() });
  }

  const existing = await prisma.timeEntry.findUnique({ where: { id: req.params.id } });
  if (!existing) {
    return res.status(404).json({ message: "Time entry not found." });
  }

  const updated = await prisma.timeEntry.update({
    where: { id: req.params.id },
    data: {
      timestamp: parsed.data.timestamp ? new Date(parsed.data.timestamp) : existing.timestamp
    }
  });

  await prisma.auditLog.create({
    data: {
      actorUserId: req.authUser!.id,
      action: "time_entry.update",
      entityType: "time_entry",
      entityId: existing.id,
      reason: parsed.data.reason ?? "Manual correction"
    }
  });

  return res.json({
    entry: {
      id: updated.id,
      user_id: updated.userId,
      project_id: updated.projectId,
      type: updated.type,
      timestamp: updated.timestamp.toISOString(),
      is_within_geofence: updated.isWithinGeofence,
      distance_from_site: updated.distanceFromSite
    }
  });
});
