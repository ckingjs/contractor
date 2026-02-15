import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().default(4000),
  DATABASE_URL: z.string().min(1).default("postgresql://contractor:contractor@localhost:5432/contractor"),
  JWT_SECRET: z.string().min(12).default("change-this-jwt-secret")
});

export const env = envSchema.parse(process.env);
