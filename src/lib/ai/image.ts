import "server-only";

import { getOpenRouterEnv } from "@/lib/env";
import {
  DEFAULT_IMAGE_MODEL,
  isImageModelId,
  type GeneratedImageBytes,
  type ImageGenerationRequest,
} from "@/types/ai";
import { AppError } from "@/utils/errors";
import { openRouterGenerateImage } from "./openrouter";

export async function generateImage(
  input: ImageGenerationRequest,
): Promise<GeneratedImageBytes> {
  const model = input.model ?? DEFAULT_IMAGE_MODEL;

  if (!isImageModelId(model)) {
    throw new AppError("Unsupported image model.", {
      status: 400,
      code: "unsupported_image_model",
    });
  }

  const prompt = input.prompt.trim();
  if (!prompt) {
    throw new AppError("An image prompt is required.", {
      status: 400,
      code: "empty_image_prompt",
    });
  }

  const apiKey = process.env.OPENROUTER_API_KEY || process.env.LLM_API_KEY;
  if (!apiKey) {
    throw new AppError("OPENROUTER_API_KEY or LLM_API_KEY is required for image generation.", {
      status: 500,
      code: "api_key_missing",
    });
  }

  const image = await openRouterGenerateImage(apiKey, {
    model,
    prompt,
    aspect_ratio: input.aspectRatio,
  });

  return {
    bytes: Buffer.from(image.b64_json, "base64"),
    mediaType: image.media_type ?? "image/png",
    prompt,
    model,
  };
}
