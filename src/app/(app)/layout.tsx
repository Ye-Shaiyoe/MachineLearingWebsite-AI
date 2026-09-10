import { SessionProvider } from "@/components/providers/session-provider";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardTopBar } from "@/components/dashboard/top-bar";
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
      <div className="dashboard-shell flex h-screen overflow-hidden">
        {/* Sidebar */}
        <DashboardSidebar />

        {/* Main area — offset by sidebar width */}
        <div className="ml-56 flex flex-1 flex-col overflow-hidden">
          <DashboardTopBar user={user} />
          <div className="flex flex-1 overflow-hidden">{children}</div>
        </div>
      </div>
    </SessionProvider>
  );
}
