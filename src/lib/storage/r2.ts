import "server-only";

import {
  PutObjectCommand,
  S3Client,
  type PutObjectCommandInput,
} from "@aws-sdk/client-s3";
import { getR2Env, type R2Env } from "@/lib/env";
import { AppError } from "@/utils/errors";

export interface UploadObjectInput {
  key: string;
  body: Buffer;
  contentType: string;
}

export interface UploadedObject {
  key: string;
  url: string;
}

function createR2Client(env: R2Env): S3Client {
  return new S3Client({
    region: "auto",
    endpoint: `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: env.R2_ACCESS_KEY_ID,
      secretAccessKey: env.R2_SECRET_ACCESS_KEY,
    },
  });
}

let cachedClient: S3Client | undefined;

function getClient(): { client: S3Client; env: R2Env } {
  const env = getR2Env();
  if (!cachedClient) {
    cachedClient = createR2Client(env);
  }
  return { client: cachedClient, env };
}

export function publicUrlForKey(key: string, publicBaseUrl: string): string {
  return `${publicBaseUrl.replace(/\/$/, "")}/${key.replace(/^\//, "")}`;
}

export async function uploadObject(
  input: UploadObjectInput,
): Promise<UploadedObject> {
  const { client, env } = getClient();

  const params: PutObjectCommandInput = {
    Bucket: env.R2_BUCKET_NAME,
    Key: input.key,
    Body: input.body,
    ContentType: input.contentType,
  };

  try {
    await client.send(new PutObjectCommand(params));
  } catch {
    throw new AppError("Failed to store generated image.", {
      status: 502,
      code: "storage_upload_failed",
    });
  }

  return {
    key: input.key,
    url: publicUrlForKey(input.key, env.R2_PUBLIC_URL),
  };
}
