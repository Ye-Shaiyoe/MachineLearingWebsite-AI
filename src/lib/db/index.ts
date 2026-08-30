import "server-only";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { getServerEnv } from "@/lib/env";
import * as schema from "./schema";

const globalForDb = globalThis as unknown as {
  postgres: ReturnType<typeof postgres> | undefined;
};

function createClient() {
  const { DATABASE_URL } = getServerEnv();
  return postgres(DATABASE_URL, {
    max: 10,
    idle_timeout: 20,
    connect_timeout: 10,
  });
}

const client = globalForDb.postgres ?? createClient();

if (process.env.NODE_ENV !== "production") {
  globalForDb.postgres = client;
}

export const db = drizzle(client, { schema });
export type Database = typeof db;
