import { NextRequest, NextResponse } from "next/server";
import { getPresignedGetUrl, isAllowedS3Key } from "@/lib/s3";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const key = request.nextUrl.searchParams.get("key") ?? "";
  if (!isAllowedS3Key(key)) {
    return NextResponse.json({ error: "Invalid key." }, { status: 400 });
  }

  try {
    const url = await getPresignedGetUrl(key);
    return NextResponse.redirect(url, 302);
  } catch (error) {
    console.error("Presigned image URL failed:", error);
    return NextResponse.json({ error: "Image not found." }, { status: 404 });
  }
}
