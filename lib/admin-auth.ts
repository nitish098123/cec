import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const ADMIN_SESSION_COOKIE = "cec_admin_session";

const DEFAULT_ADMIN_ID = "admin-cec";
const DEFAULT_ADMIN_PASSWORD = "admincec123";

export function getAdminCredentials() {
  return {
    adminId: process.env.ADMIN_ID || DEFAULT_ADMIN_ID,
    password: process.env.ADMIN_PASSWORD || DEFAULT_ADMIN_PASSWORD,
    sessionToken:
      process.env.ADMIN_SESSION_TOKEN || "cec-admin-session-token-change-me",
  };
}

export function isValidAdminLogin(adminId: string, password: string): boolean {
  const creds = getAdminCredentials();
  return adminId === creds.adminId && password === creds.password;
}

export function isAdminAuthenticatedRequest(request: NextRequest): boolean {
  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  return token === getAdminCredentials().sessionToken;
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  return token === getAdminCredentials().sessionToken;
}

export function setAdminSessionCookie(response: NextResponse): void {
  const { sessionToken } = getAdminCredentials();
  response.cookies.set(ADMIN_SESSION_COOKIE, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });
}

export function clearAdminSessionCookie(response: NextResponse): void {
  response.cookies.set(ADMIN_SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

export function unauthorizedResponse() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
