import { Router } from "express";
import { z } from "zod";
import { store } from "../../data/store.js";
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

export const timeEntriesRouter = Router();

timeEntriesRouter.post("/", requireAuth, (req, res) => {
  const parsed = clockEventSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      message: "Invalid time entry payload.",
      errors: parsed.error.flatten()
    });
  }

  const project = store.projects.find((candidate) => candidate.id === parsed.data.project_id);
  if (!project) {
    return res.status(404).json({ message: "Project not found." });
  }

  const distance = haversineDistanceMeters(
    parsed.data.location.latitude,
    parsed.data.location.longitude,
    project.geofence.latitude,
    project.geofence.longitude
  );

  const isWithinGeofence = !project.geofence.enabled || distance <= project.geofence.radius_meters;

  if (!isWithinGeofence && parsed.data.type === "clock_in") {
    return res.status(422).json({
      message: "Clock in denied. Worker is outside geofence radius.",
      distance_from_site: Number(distance.toFixed(2)),
      radius_meters: project.geofence.radius_meters
    });
  }

  const entry = {
    id: crypto.randomUUID(),
    user_id: req.authUser!.id,
    project_id: parsed.data.project_id,
    type: parsed.data.type,
    timestamp: parsed.data.timestamp,
    location_lat: parsed.data.location.latitude,
    location_lng: parsed.data.location.longitude,
    location_accuracy: parsed.data.location.accuracy,
    is_within_geofence: isWithinGeofence,
    distance_from_site: Number(distance.toFixed(2)),
    synced_at: new Date().toISOString(),
    created_at: new Date().toISOString()
  };

  store.timeEntries.push(entry);

  store.auditLogs.push({
    id: crypto.randomUUID(),
    actor_user_id: req.authUser!.id,
    action: "time_entry.create",
    entity_type: "time_entry",
    entity_id: entry.id,
    created_at: new Date().toISOString()
  });

  return res.status(201).json(entry);
});

timeEntriesRouter.get("/", requireAuth, (req, res) => {
  const parsed = listQuerySchema.safeParse(req.query);
  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid query parameters.", errors: parsed.error.flatten() });
  }

  const isManagerScope = ["admin", "manager"].includes(req.authUser!.role);
  let entries = store.timeEntries;

  if (!isManagerScope) {
    entries = entries.filter((entry) => entry.user_id === req.authUser!.id);
  }

  if (parsed.data.user_id) {
    entries = entries.filter((entry) => entry.user_id === parsed.data.user_id);
  }

  if (parsed.data.project_id) {
    entries = entries.filter((entry) => entry.project_id === parsed.data.project_id);
  }

  if (parsed.data.from) {
    entries = entries.filter((entry) => new Date(entry.timestamp) >= new Date(parsed.data.from!));
  }

  if (parsed.data.to) {
    entries = entries.filter((entry) => new Date(entry.timestamp) <= new Date(parsed.data.to!));
  }

  return res.json({ entries });
});

timeEntriesRouter.patch("/:id", requireAuth, requireRole(["admin", "manager"]), (req, res) => {
  const entry = store.timeEntries.find((candidate) => candidate.id === req.params.id);
  if (!entry) {
    return res.status(404).json({ message: "Time entry not found." });
  }

  const reason = typeof req.body?.reason === "string" ? req.body.reason : "Manual correction";
  if (typeof req.body?.timestamp === "string") {
    entry.timestamp = req.body.timestamp;
  }

  store.auditLogs.push({
    id: crypto.randomUUID(),
    actor_user_id: req.authUser!.id,
    action: "time_entry.update",
    entity_type: "time_entry",
    entity_id: entry.id,
    reason,
    created_at: new Date().toISOString()
  });

  return res.json({ entry });
});
