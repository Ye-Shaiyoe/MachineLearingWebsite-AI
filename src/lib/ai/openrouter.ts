import "server-only";

import { AppError } from "@/utils/errors";

const OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1";

export interface OpenRouterChatMessage {
  role: "system" | "user" | "assistant" | "tool";
  content: string;
}

export interface OpenRouterChatRequest {
  model: string;
  messages: OpenRouterChatMessage[];
  stream?: boolean;
  temperature?: number;
}

export interface OpenRouterImageRequest {
  model: string;
  prompt: string;
  aspect_ratio?: string;
}

export interface OpenRouterImageResult {
  b64_json: string;
  media_type?: string;
}

interface OpenRouterErrorBody {
  error?: {
    message?: string;
    code?: number | string;
  };
}

function sanitizeProviderError(status: number, body: string): never {
  let message = "The AI provider request failed.";

  try {
    const parsed = JSON.parse(body) as OpenRouterErrorBody;
    if (parsed.error?.message) {
      message = parsed.error.message;
    }
  } catch {
    // Keep the generic message so raw provider payloads are not leaked.
  }

  throw new AppError(message, {
    status: status >= 400 && status < 500 ? status : 502,
    code: "ai_provider_error",
  });
}

export async function openRouterRequest(
  path: string,
  apiKey: string,
  body: unknown,
  init?: { stream?: boolean },
): Promise<Response> {
  const response = await fetch(`${OPENROUTER_BASE_URL}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": process.env.BETTER_AUTH_URL ?? "http://localhost:3000",
      "X-Title": "AI Chat",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const text = await response.text();
    sanitizeProviderError(response.status, text);
  }

  if (init?.stream && !response.body) {
    throw new AppError("The AI provider did not return a stream.", {
      status: 502,
      code: "ai_stream_missing",
    });
  }

  return response;
}

export async function openRouterChatCompletion(
  apiKey: string,
  payload: OpenRouterChatRequest,
): Promise<Response> {
  return openRouterRequest("/chat/completions", apiKey, payload, {
    stream: payload.stream,
  });
}

export async function openRouterGenerateImage(
  apiKey: string,
  payload: OpenRouterImageRequest,
): Promise<OpenRouterImageResult> {
  const response = await openRouterRequest("/images", apiKey, payload);
  const json = (await response.json()) as {
    data?: OpenRouterImageResult[];
  };

  const image = json.data?.[0];
  if (!image?.b64_json) {
    throw new AppError("The image provider returned no image data.", {
      status: 502,
      code: "ai_image_empty",
    });
  }

  return image;
}
