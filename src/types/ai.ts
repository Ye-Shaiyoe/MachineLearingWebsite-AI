export const CHAT_MODELS = [
  "stealth/ox-alpha",
  "minimax/minimax-m3:free",
  "x-ai/grok-4.3",
] as const;

export type ChatModelId = (typeof CHAT_MODELS)[number];

export const IMAGE_MODELS = ["x-ai/grok-imagine-image-quality"] as const;

export type ImageModelId = (typeof IMAGE_MODELS)[number];

export const DEFAULT_CHAT_MODEL: ChatModelId = "stealth/ox-alpha";
export const DEFAULT_IMAGE_MODEL: ImageModelId =
  "x-ai/grok-imagine-image-quality";

export function isChatModelId(value: string): value is ChatModelId {
  return (CHAT_MODELS as readonly string[]).includes(value);
}

export function isImageModelId(value: string): value is ImageModelId {
  return (IMAGE_MODELS as readonly string[]).includes(value);
}

export type ChatRole = "system" | "user" | "assistant" | "tool";

export type ChatMessagePart =
  | { type: "text"; text: string }
  | { type: "image"; url: string; alt?: string };

export interface ChatMessage {
  role: ChatRole;
  content: string;
  parts?: ChatMessagePart[];
}

export interface ChatCompletionRequest {
  model: ChatModelId;
  messages: ChatMessage[];
  temperature?: number;
}

export interface ChatCompletionDelta {
  content: string;
  done: boolean;
}

export interface ImageGenerationRequest {
  prompt: string;
  model?: ImageModelId;
  aspectRatio?: string;
}

export interface GeneratedImageBytes {
  bytes: Buffer;
  mediaType: string;
  prompt: string;
  model: ImageModelId;
}
