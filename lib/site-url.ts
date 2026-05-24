import type { NextRequest } from "next/server";

/**
 * Resolve the public site origin for absolute URLs shown in admin.
 * On EC2 behind nginx, request.nextUrl.origin is often localhost — use SITE_URL or proxy headers.
 */
export function getSiteOrigin(request?: NextRequest | Request): string {
  const fromEnv =
    process.env.SITE_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.APP_URL;

  if (fromEnv) {
    return fromEnv.replace(/\/+$/, "");
  }

  if (request) {
    const forwardedHost = request.headers.get("x-forwarded-host");
    const forwardedProto = request.headers.get("x-forwarded-proto");

    if (forwardedHost) {
      const host = forwardedHost.split(",")[0]?.trim();
      const proto = (forwardedProto?.split(",")[0]?.trim() || "https").replace(
        /:$/,
        ""
      );
      if (host) {
        return `${proto}://${host}`;
      }
    }

    const host = request.headers.get("host");
    if (
      host &&
      !/^localhost(:\d+)?$/i.test(host) &&
      !/^127\.0\.0\.1(:\d+)?$/i.test(host)
    ) {
      const proto =
        forwardedProto?.split(",")[0]?.trim() ||
        (request.url.startsWith("https://") ? "https" : "http");
      return `${proto.replace(/:$/, "")}://${host}`;
    }

    const nextOrigin = (request as NextRequest).nextUrl?.origin;
    if (nextOrigin) {
      return nextOrigin;
    }
  }

  return "http://localhost:3000";
}
