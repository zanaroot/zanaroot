"server only";

import { env } from "@/env";
import * as Minio from "minio";

export const s3 = new Minio.Client({
  accessKey: env.MINIO_ACCESS_KEY,
  secretKey: env.MINIO_SECRET_KEY,
  port: env.MINIO_PORT ?? 9000,
  region: env.MINIO_REGION,
  endPoint: env.MINIO_PRIVATE_DOMAIN,
  useSSL: env.MINIO_SSL === "true",
});

export const uploadToS3 = async (safename: string, buffer: Uint8Array) => {
  const result = await s3.putObject(
    env.MINIO_BUCKET_NAME,
    safename,
    Buffer.from(buffer),
    undefined,
    {
      "Content-type": "image",
    },
  );

  return result;
};

export const generateSafeName = (ext?: string): string =>
  `${Date.now()}_${crypto.randomUUID()}${ext ? `.${ext}` : ""}`;

export const convertFileToBuffer = async (file: File): Promise<Uint8Array> => {
  const arrayBuffer = await file.arrayBuffer();
  return new Uint8Array(arrayBuffer);
};

export const getPublicUrlByName = (name: string) =>
  `http${env.MINIO_SSL === "true" ? "s" : ""}://${env.MINIO_PUBLIC_DOMAIN}:${env.MINIO_PORT ?? 9000}/${env.MINIO_BUCKET_NAME}/${name}`;
