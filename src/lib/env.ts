import "server-only";

import { z } from "zod";

const requiredEnvSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  BETTER_AUTH_SECRET: z
    .string()
    .min(32, "BETTER_AUTH_SECRET must be at least 32 characters"),
  BETTER_AUTH_URL: z.string().url("BETTER_AUTH_URL must be a valid URL"),
});

const openRouterEnvSchema = z.object({
  OPENROUTER_API_KEY: z.string().min(1, "OPENROUTER_API_KEY is required"),
});

const r2EnvSchema = z.object({
  R2_ACCOUNT_ID: z.string().min(1, "R2_ACCOUNT_ID is required"),
  R2_ACCESS_KEY_ID: z.string().min(1, "R2_ACCESS_KEY_ID is required"),
  R2_SECRET_ACCESS_KEY: z.string().min(1, "R2_SECRET_ACCESS_KEY is required"),
  R2_BUCKET_NAME: z.string().min(1, "R2_BUCKET_NAME is required"),
  R2_PUBLIC_URL: z.string().url("R2_PUBLIC_URL must be a valid URL"),
});

export type ServerEnv = z.infer<typeof requiredEnvSchema>;
export type OpenRouterEnv = z.infer<typeof openRouterEnvSchema>;
export type R2Env = z.infer<typeof r2EnvSchema>;

function formatZodError(error: z.ZodError): string {
  return error.issues
    .map((issue) => issue.path.join(".") || "env")
    .join(", ");
}

let cachedServerEnv: ServerEnv | undefined;

export function getServerEnv(): ServerEnv {
  if (cachedServerEnv) {
    return cachedServerEnv;
  }

  const parsed = requiredEnvSchema.safeParse(process.env);
  if (!parsed.success) {
    throw new Error(
      `Invalid environment configuration: ${formatZodError(parsed.error)}`,
    );
  }

  cachedServerEnv = parsed.data;
  return cachedServerEnv;
}

export function getOpenRouterEnv(): OpenRouterEnv {
  const parsed = openRouterEnvSchema.safeParse(process.env);
  if (!parsed.success) {
    throw new Error(
      `Invalid OpenRouter configuration: ${formatZodError(parsed.error)}`,
    );
  }
  return parsed.data;
}

export function getR2Env(): R2Env {
  const parsed = r2EnvSchema.safeParse(process.env);
  if (!parsed.success) {
    throw new Error(
      `Invalid R2 configuration: ${formatZodError(parsed.error)}`,
    );
  }
  return parsed.data;
}
