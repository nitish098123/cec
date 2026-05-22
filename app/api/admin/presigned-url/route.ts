import { NextRequest, NextResponse } from "next/server";
import {
  isAdminAuthenticatedRequest,
  unauthorizedResponse,
} from "@/lib/admin-auth";
import { getPresignedGetUrl, isAllowedS3Key } from "@/lib/s3";

export async function GET(request: NextRequest) {
  if (!isAdminAuthenticatedRequest(request)) {
    return unauthorizedResponse();
  }

  const key = request.nextUrl.searchParams.get("key") ?? "";
  if (!isAllowedS3Key(key)) {
    return NextResponse.json({ error: "Invalid key." }, { status: 400 });
  }

  try {
    const url = await getPresignedGetUrl(key);
    return NextResponse.json({ url });
  } catch (error) {
    console.error("Presigned URL failed:", error);
    return NextResponse.json({ error: "Failed to generate URL." }, { status: 500 });
  }
}
