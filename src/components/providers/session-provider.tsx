"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { AuthUser } from "@/types/auth";

type SessionContextValue = {
  user: AuthUser;
};

const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionProvider({
  user,
  children,
}: {
  user: AuthUser;
  children: ReactNode;
}) {
  return (
    <SessionContext.Provider value={{ user }}>{children}</SessionContext.Provider>
  );
}

export function useCurrentUser(): AuthUser {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useCurrentUser must be used within SessionProvider.");
  }
  return context.user;
}
