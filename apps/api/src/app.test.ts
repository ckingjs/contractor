import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "./app.js";

describe("API", () => {
  it("responds on health endpoint", async () => {
    const app = createApp();
    const response = await request(app).get("/api/v1/health");

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("ok");
  });

  it("creates a time entry", async () => {
    const app = createApp();
    const response = await request(app).post("/api/v1/time-entries").send({
      project_id: "550e8400-e29b-41d4-a716-446655440000",
      type: "clock_in",
      location: {
        latitude: 34.0522,
        longitude: -118.2437,
        accuracy: 10
      },
      timestamp: "2026-02-14T08:00:00.000Z"
    });

    expect(response.status).toBe(201);
    expect(response.body.type).toBe("clock_in");
  });
});
