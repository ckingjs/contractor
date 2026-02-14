import type { ClockEventType, UserRole } from "@contractor/shared";

export type AppUser = {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  password: string;
};

export type Project = {
  id: string;
  name: string;
  geofence: {
    enabled: boolean;
    latitude: number;
    longitude: number;
    radius_meters: number;
    address: string;
  };
};

export type TimeEntry = {
  id: string;
  user_id: string;
  project_id: string;
  type: ClockEventType;
  timestamp: string;
  location_lat: number;
  location_lng: number;
  location_accuracy: number;
  is_within_geofence: boolean;
  distance_from_site: number;
  synced_at: string;
  created_at: string;
};

export type AuditLog = {
  id: string;
  actor_user_id: string;
  action: string;
  entity_type: string;
  entity_id: string;
  reason?: string;
  created_at: string;
};

export const store: {
  users: AppUser[];
  projects: Project[];
  timeEntries: TimeEntry[];
  auditLogs: AuditLog[];
} = {
  users: [
    {
      id: "7f387668-c6ba-4cd2-bf73-ae5102fe9d02",
      email: "manager@contractor.local",
      name: "Maria Manager",
      role: "manager",
      password: "pass1234"
    },
    {
      id: "6cf4f099-fdb6-4f96-88a1-e8cdd3394fef",
      email: "worker@contractor.local",
      name: "Wes Worker",
      role: "worker",
      password: "pass1234"
    }
  ],
  projects: [
    {
      id: "550e8400-e29b-41d4-a716-446655440000",
      name: "Smith Residence Rewiring",
      geofence: {
        enabled: true,
        latitude: 34.0522,
        longitude: -118.2437,
        radius_meters: 100,
        address: "123 Main St, Los Angeles, CA"
      }
    }
  ],
  timeEntries: [],
  auditLogs: []
};
