import type { Metadata } from "next";
import { getServerSession, toAuthUser } from "@/lib/auth/session";
import { GalaxyExperience } from "@/components/landing/galaxy-experience";

export const metadata: Metadata = {
  title: "Orbital AI · High-Precision Neural Observatory",
  description:
    "Private multi-model AI cluster with zero-leak server isolation, Cloudflare R2 media vault, and high-performance inference gateways.",
  openGraph: {
    title: "Orbital AI · High-Precision Neural Observatory",
    description:
      "Private multi-model AI cluster with zero-leak server isolation and Cloudflare R2 media vault.",
    type: "website",
  },
};

export default async function LandingPage() {
  const session = await getServerSession();
  const user = session ? toAuthUser(session.user) : null;

  return <GalaxyExperience user={user} />;
}
