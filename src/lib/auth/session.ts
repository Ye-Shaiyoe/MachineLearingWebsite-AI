import "server-only";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./index";
import type { AuthUser } from "@/types/auth";

export async function getServerSession() {
  return auth.api.getSession({
    headers: await headers(),
  });
}

export type AppSession = NonNullable<Awaited<ReturnType<typeof getServerSession>>>;

export function toAuthUser(user: AppSession["user"]): AuthUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    image: user.image ?? null,
    emailVerified: user.emailVerified,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

export async function requireSession(): Promise<AppSession> {
  const session = await getServerSession();
  if (!session) {
    redirect("/login");
  }
  return session;
}

export async function requireGuest(): Promise<void> {
  const session = await getServerSession();
  if (session) {
    redirect("/");
  }
}
