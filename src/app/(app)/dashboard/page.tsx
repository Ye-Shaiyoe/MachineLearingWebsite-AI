import { requireSession, toAuthUser } from "@/lib/auth/session";
import { DashboardContent } from "@/components/dashboard/dashboard-content";

export const metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const session = await requireSession();
  const user = toAuthUser(session.user);

  return <DashboardContent user={user} />;
}
