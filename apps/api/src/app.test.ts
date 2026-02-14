import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";
import { store } from "./data/store.js";
import { createApp } from "./app.js";

describe("API", () => {
  beforeEach(() => {
    store.timeEntries.length = 0;
    store.auditLogs.length = 0;
  });

  it("responds on health endpoint", async () => {
    const app = createApp();
    const response = await request(app).get("/api/v1/health");

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("ok");
  });

  it("logs in and creates a time entry", async () => {
    const app = createApp();
    const loginResponse = await request(app).post("/api/v1/auth/login").send({
      email: "worker@contractor.local",
      password: "pass1234"
    });

    const response = await request(app)
      .post("/api/v1/time-entries")
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send({
        project_id: "550e8400-e29b-41d4-a716-446655440000",
        type: "clock_in",
        location: {
          latitude: 34.0522,
          longitude: -118.2437,
          accuracy: 10
        },
        timestamp: "2026-02-14T08:00:00.000Z"
      });

    expect(loginResponse.status).toBe(200);
    expect(response.status).toBe(201);
    expect(response.body.type).toBe("clock_in");
    expect(response.body.is_within_geofence).toBe(true);
  });

  it("rejects clock in outside geofence", async () => {
    const app = createApp();
    const loginResponse = await request(app).post("/api/v1/auth/login").send({
      email: "worker@contractor.local",
      password: "pass1234"
    });

    const response = await request(app)
      .post("/api/v1/time-entries")
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
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
