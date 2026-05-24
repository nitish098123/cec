import { NextRequest, NextResponse } from "next/server";
import {
  isAdminAuthenticatedRequest,
  unauthorizedResponse,
} from "@/lib/admin-auth";
import {
  buildCourseImageProxyPath,
  buildCourseMediaProxyPath,
  getCoursePrefix,
  getMediaPrefix,
  getPresignedGetUrl,
  uploadToS3,
} from "@/lib/s3";
import { getSiteOrigin } from "@/lib/site-url";

export async function POST(request: NextRequest) {
  if (!isAdminAuthenticatedRequest(request)) {
    return unauthorizedResponse();
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const uploadType = String(formData.get("type") || "image");

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "File is required." }, { status: 400 });
    }

    const imageTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    const mediaTypes = [
      ...imageTypes,
      "application/pdf",
    ];

    const isMedia = uploadType === "media";
    const allowed = isMedia ? mediaTypes : imageTypes;
    if (!allowed.includes(file.type)) {
      return NextResponse.json(
        {
          error: isMedia
            ? "Only JPG, PNG, WEBP, or PDF files are allowed."
            : "Only JPG, PNG, or WEBP images are allowed.",
        },
        { status: 400 }
      );
    }

    const prefix = isMedia ? getMediaPrefix() : getCoursePrefix();
    const uploaded = await uploadToS3(file, prefix);
    const presignedViewUrl = await getPresignedGetUrl(uploaded.key);
    const origin = getSiteOrigin(request);
    const proxyPath = isMedia
      ? buildCourseMediaProxyPath(uploaded.key)
      : buildCourseImageProxyPath(uploaded.key);
    const copyUrl = `${origin}${proxyPath}`;

    return NextResponse.json({
      key: uploaded.key,
      presignedViewUrl,
      copyUrl,
      proxyPath,
    });
  } catch (error) {
    console.error("S3 upload failed:", error);
    const message =
      error instanceof Error ? error.message : "Failed to upload file.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
