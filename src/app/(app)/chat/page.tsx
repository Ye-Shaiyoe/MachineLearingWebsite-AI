import type { Metadata } from "next";
import { requireSession, toAuthUser } from "@/lib/auth/session";
import { ChatWorkspace } from "@/components/chat/chat-workspace";

export const metadata: Metadata = {
  title: "Chat",
};

export default async function ChatPage() {
  const session = await requireSession();
  return <ChatWorkspace user={toAuthUser(session.user)} />;
}
