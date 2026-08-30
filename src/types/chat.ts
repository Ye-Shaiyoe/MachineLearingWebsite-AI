import type { ChatModelId, ChatRole } from "./ai";

export interface Conversation {
  id: string;
  userId: string;
  title: string;
  model: ChatModelId;
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id: string;
  conversationId: string;
  role: ChatRole;
  content: string;
  model: ChatModelId | null;
  createdAt: Date;
}

export interface GeneratedImage {
  id: string;
  conversationId: string;
  messageId: string | null;
  prompt: string;
  storageKey: string;
  url: string;
  mediaType: string;
  createdAt: Date;
}
