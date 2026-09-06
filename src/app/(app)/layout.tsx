import { AppHeader } from "@/components/layout/app-header";
import { SessionProvider } from "@/components/providers/session-provider";
import { requireSession, toAuthUser } from "@/lib/auth/session";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireSession();
  const user = toAuthUser(session.user);

  return (
    <SessionProvider user={user}>
      <div className="flex min-h-full flex-col">
        <AppHeader user={user} />
        <div className="flex flex-1 flex-col">{children}</div>
      </div>
    </SessionProvider>
  );
}
