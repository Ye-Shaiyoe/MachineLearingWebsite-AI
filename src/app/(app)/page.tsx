import { redirect } from "next/navigation";
import { requireSession } from "@/lib/auth/session";

export default async function HomePage() {
  await requireSession();
  redirect("/dashboard");
}

