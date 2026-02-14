export type UserRole = "admin" | "manager" | "worker" | "client";

export const projectStatusWorkflow = [
  "Lead",
  "Quoted",
  "Approved",
  "In Progress",
  "Completed",
  "Invoiced",
  "Paid"
] as const;

export type ProjectStatus = (typeof projectStatusWorkflow)[number];

export type ClockEventType = "clock_in" | "clock_out" | "break_start" | "break_end";

export type LocationPoint = {
  latitude: number;
  longitude: number;
  accuracy: number;
};

export type TimeEntryPayload = {
  project_id: string;
  type: ClockEventType;
  location: LocationPoint;
  timestamp: string;
};
