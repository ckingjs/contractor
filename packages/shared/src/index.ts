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
