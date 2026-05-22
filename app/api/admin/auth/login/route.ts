import { NextRequest, NextResponse } from "next/server";
import {
  isValidAdminLogin,
  setAdminSessionCookie,
} from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const adminId = String(body.adminId || "").trim();
    const password = String(body.password || "").trim();

    if (!isValidAdminLogin(adminId, password)) {
      return NextResponse.json(
        { error: "Invalid Admin ID or Password." },
        { status: 401 }
      );
    }

    const response = NextResponse.json({ success: true });
    setAdminSessionCookie(response);
    return response;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
