import request from "supertest";
import { afterEach, describe, expect, it, vi } from "vitest";
import { createApp } from "./app.js";
import { prisma } from "./lib/prisma.js";
import { signToken } from "./lib/token.js";

describe("API", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("responds healthy when database ping succeeds", async () => {
    vi.spyOn(prisma, "$queryRaw").mockResolvedValue([1] as never);

    const app = createApp();
    const response = await request(app).get("/api/v1/health");

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("ok");
  });

  it("rejects invalid login", async () => {
    vi.spyOn(prisma.user, "findUnique").mockResolvedValue(null);

    const app = createApp();
    const response = await request(app).post("/api/v1/auth/login").send({
      email: "worker@contractor.local",
      password: "wrong"
    });

    expect(response.status).toBe(401);
  });

  it("rejects clock in when outside geofence", async () => {
    vi.spyOn(prisma.project, "findUnique").mockResolvedValue({
      id: "550e8400-e29b-41d4-a716-446655440000",
      name: "Project",
      geofenceEnabled: true,
      geofenceLat: 34.0522,
      geofenceLng: -118.2437,
      geofenceRadius: 100,
      geofenceAddress: "123 Main St",
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const token = signToken({
      sub: "6cf4f099-fdb6-4f96-88a1-e8cdd3394fef",
      role: "worker",
      email: "worker@contractor.local"
    });

    const app = createApp();
    const response = await request(app)
      .post("/api/v1/time-entries")
      .set("Authorization", `Bearer ${token}`)
      .send({
        project_id: "550e8400-e29b-41d4-a716-446655440000",
        type: "clock_in",
        location: {
          latitude: 35.0522,
          longitude: -119.2437,
          accuracy: 10
        },
        timestamp: "2026-02-14T08:00:00.000Z"
      });

    expect(response.status).toBe(422);
  });
});
