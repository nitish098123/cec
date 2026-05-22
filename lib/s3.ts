import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "crypto";

const COURSE_PREFIX = process.env.AWS_S3_COURSE_PREFIX || "CECTemp/Courses/";
const MEDIA_PREFIX =
  process.env.AWS_S3_COURSE_MEDIA_PREFIX || "CECTemp/CourseMedia/";
const PRESIGNED_GET_EXPIRY = Number(
  process.env.AWS_PRESIGNED_GET_EXPIRY_SECONDS || "3600"
);
const PRESIGNED_PUT_EXPIRY = Number(
  process.env.AWS_PRESIGNED_PUT_EXPIRY_SECONDS || "900"
);

export function getCoursePrefix(): string {
  return COURSE_PREFIX;
}

export function getMediaPrefix(): string {
  return MEDIA_PREFIX;
}

function getS3Client(): S3Client {
  const region = process.env.AWS_REGION;
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

  if (!region || !accessKeyId || !secretAccessKey) {
    throw new Error("AWS credentials are not configured.");
  }

  return new S3Client({
    region,
    credentials: { accessKeyId, secretAccessKey },
  });
}

function getBucket(): string {
  const bucket = process.env.AWS_S3_BUCKET;
  if (!bucket) throw new Error("AWS_S3_BUCKET is not configured.");
  return bucket;
}

function sanitizeFileName(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_");
}

export function isHttpUrl(value: string): boolean {
  return /^https?:\/\//i.test(value.trim());
}

export function isAllowedS3Key(key: string): boolean {
  const trimmed = key.trim();
  if (!trimmed || trimmed.includes("..")) return false;
  return (
    trimmed.startsWith(COURSE_PREFIX) || trimmed.startsWith(MEDIA_PREFIX)
  );
}

export function extractS3KeyFromLegacyUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    const path = decodeURIComponent(parsed.pathname.replace(/^\/+/, ""));
    if (isAllowedS3Key(path)) return path;
    return null;
  } catch {
    return null;
  }
}

export function resolveStoredImageKey(image: string): string | null {
  const value = image.trim();
  if (!value) return null;
  if (isHttpUrl(value)) {
    return extractS3KeyFromLegacyUrl(value);
  }
  return isAllowedS3Key(value) ? value : null;
}

export async function uploadToS3(
  file: File,
  prefix: string
): Promise<{ key: string; contentType: string }> {
  const bucket = getBucket();
  const bytes = Buffer.from(await file.arrayBuffer());
  const safeName = sanitizeFileName(file.name || "file");
  const key = `${prefix}${Date.now()}-${randomUUID()}-${safeName}`;
  const contentType = file.type || "application/octet-stream";

  await getS3Client().send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: bytes,
      ContentType: contentType,
    })
  );

  return { key, contentType };
}

export async function deleteFromS3(key: string): Promise<void> {
  if (!isAllowedS3Key(key)) return;
  await getS3Client().send(
    new DeleteObjectCommand({
      Bucket: getBucket(),
      Key: key,
    })
  );
}

export async function getPresignedGetUrl(key: string): Promise<string> {
  if (!isAllowedS3Key(key)) {
    throw new Error("Invalid S3 object key.");
  }

  return getSignedUrl(
    getS3Client(),
    new GetObjectCommand({
      Bucket: getBucket(),
      Key: key,
    }),
    { expiresIn: PRESIGNED_GET_EXPIRY }
  );
}

export async function getPresignedPutUrl(
  key: string,
  contentType: string
): Promise<string> {
  if (!isAllowedS3Key(key)) {
    throw new Error("Invalid S3 object key.");
  }

  return getSignedUrl(
    getS3Client(),
    new PutObjectCommand({
      Bucket: getBucket(),
      Key: key,
      ContentType: contentType,
    }),
    { expiresIn: PRESIGNED_PUT_EXPIRY }
  );
}

export function buildCourseMediaProxyPath(key: string): string {
  return `/api/course-media?key=${encodeURIComponent(key)}`;
}

export function buildCourseImageProxyPath(key: string): string {
  return `/api/course-image?key=${encodeURIComponent(key)}`;
}
