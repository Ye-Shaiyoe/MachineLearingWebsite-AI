import { getServerSession } from "@/lib/auth/session";
import { streamChatCompletion } from "@/lib/ai/chat";
import { CHAT_MODELS, type ChatMessage, type ChatModelId } from "@/types/ai";
import { toPublicErrorMessage } from "@/utils/errors";

function isChatModel(value: unknown): value is ChatModelId {
  return typeof value === "string" && (CHAT_MODELS as readonly string[]).includes(value);
}

function isChatMessage(value: unknown): value is ChatMessage {
  if (!value || typeof value !== "object") return false;
  const message = value as Record<string, unknown>;
  return (
    (message.role === "user" || message.role === "assistant" || message.role === "system") &&
    typeof message.content === "string" &&
    message.content.trim().length > 0
  );
}

export async function POST(request: Request) {
  const session = await getServerSession();
  if (!session) {
    return Response.json({ error: "Sesi login tidak ditemukan." }, { status: 401 });
  }

  try {
    const body = (await request.json()) as { model?: unknown; messages?: unknown };
    const messages = Array.isArray(body.messages) ? body.messages.filter(isChatMessage) : [];

    const model = body.model;
    if (!isChatModel(model)) {
      return Response.json({ error: "Model chat tidak didukung." }, { status: 400 });
    }
    if (!messages.length || messages.length !== (body.messages as unknown[])?.length) {
      return Response.json({ error: "Pesan chat tidak valid." }, { status: 400 });
    }
    if (messages.length > 40 || messages.some((message) => message.content.length > 20_000)) {
      return Response.json({ error: "Percakapan terlalu panjang untuk diproses." }, { status: 400 });
    }

    const encoder = new TextEncoder();
    const stream = new ReadableStream<Uint8Array>({
      async start(controller) {
        try {
          for await (const delta of streamChatCompletion({
            model,
            messages,
            temperature: 0.7,
          })) {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify(delta)}\n\n`));
          }
          controller.close();
        } catch (error) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: toPublicErrorMessage(error) })}\n\n`));
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (error) {
    return Response.json({ error: toPublicErrorMessage(error) }, { status: 400 });
  }
}
