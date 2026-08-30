import "server-only";

import { getOpenRouterEnv } from "@/lib/env";
import {
  DEFAULT_CHAT_MODEL,
  isChatModelId,
  type ChatCompletionDelta,
  type ChatCompletionRequest,
} from "@/types/ai";
import { AppError } from "@/utils/errors";
import { openRouterChatCompletion } from "./openrouter";

function assertChatRequest(input: ChatCompletionRequest): ChatCompletionRequest {
  if (!isChatModelId(input.model)) {
    throw new AppError("Unsupported chat model.", {
      status: 400,
      code: "unsupported_chat_model",
    });
  }

  if (!input.messages.length) {
    throw new AppError("At least one message is required.", {
      status: 400,
      code: "empty_messages",
    });
  }

  return {
    ...input,
    model: input.model ?? DEFAULT_CHAT_MODEL,
  };
}

async function* parseSseStream(
  body: ReadableStream<Uint8Array>,
): AsyncGenerator<ChatCompletionDelta> {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }

    buffer += decoder.decode(value, { stream: true });
    const events = buffer.split("\n\n");
    buffer = events.pop() ?? "";

    for (const event of events) {
      for (const line of event.split("\n")) {
        if (!line.startsWith("data: ")) {
          continue;
        }

        const data = line.slice(6).trim();
        if (data === "[DONE]") {
          yield { content: "", done: true };
          return;
        }

        try {
          const parsed = JSON.parse(data) as {
            choices?: Array<{ delta?: { content?: string } }>;
          };
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) {
            yield { content, done: false };
          }
        } catch {
          // Ignore malformed SSE chunks from the provider.
        }
      }
    }
  }

  yield { content: "", done: true };
}

export async function* streamChatCompletion(
  input: ChatCompletionRequest,
): AsyncGenerator<ChatCompletionDelta> {
  const request = assertChatRequest(input);
  const { OPENROUTER_API_KEY } = getOpenRouterEnv();

  const response = await openRouterChatCompletion(OPENROUTER_API_KEY, {
    model: request.model,
    messages: request.messages.map((message) => ({
      role: message.role,
      content: message.content,
    })),
    stream: true,
    temperature: request.temperature,
  });

  if (!response.body) {
    throw new AppError("The AI provider did not return a stream.", {
      status: 502,
      code: "ai_stream_missing",
    });
  }

  yield* parseSseStream(response.body);
}
