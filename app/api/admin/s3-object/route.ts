import { NextRequest, NextResponse } from "next/server";
import {
  isAdminAuthenticatedRequest,
  unauthorizedResponse,
} from "@/lib/admin-auth";
import { deleteFromS3, isAllowedS3Key } from "@/lib/s3";

export async function DELETE(request: NextRequest) {
  if (!isAdminAuthenticatedRequest(request)) {
    return unauthorizedResponse();
  }

  const key = request.nextUrl.searchParams.get("key") ?? "";
  if (!isAllowedS3Key(key)) {
    return NextResponse.json({ error: "Invalid key." }, { status: 400 });
  }

  try {
    await deleteFromS3(key);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("S3 delete failed:", error);
    return NextResponse.json({ error: "Failed to delete object." }, { status: 500 });
  }
}
