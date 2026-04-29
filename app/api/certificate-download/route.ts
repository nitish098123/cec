import { NextRequest, NextResponse } from "next/server";

const CERT_CDN_BASE =
  "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/";

function sanitizeCertPath(input: string): string | null {
  const trimmed = input.trim().replace(/^\/+/, "");
  if (!trimmed || trimmed.includes("..")) {
    return null;
  }

  const segments = trimmed.split("/");
  if (segments.length < 2) {
    return null;
  }

  try {
    return segments
      .map((segment) => encodeURIComponent(decodeURIComponent(segment)))
      .join("/");
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  const certPathParam = request.nextUrl.searchParams.get("certPath") ?? "";
  const download = request.nextUrl.searchParams.get("download") === "1";
  const safePath = sanitizeCertPath(certPathParam);

  if (!safePath) {
    return NextResponse.json(
      { error: "Invalid certificate path." },
      { status: 400 }
    );
  }

  const cdnUrl = `${CERT_CDN_BASE}${safePath}`;
  const upstream = await fetch(cdnUrl, { cache: "no-store" });

  if (!upstream.ok) {
    return NextResponse.json(
      { error: "Certificate not found on CDN." },
      { status: upstream.status }
    );
  }

  const fileName = decodeURIComponent(safePath.split("/").pop() || "certificate.jpg");
  const contentType = upstream.headers.get("content-type") || "image/jpeg";
  const body = await upstream.arrayBuffer();

  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": download
        ? `attachment; filename="${fileName}"`
        : `inline; filename="${fileName}"`,
      "Cache-Control": "no-store",
    },
  });
}
