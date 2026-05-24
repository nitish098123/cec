import { NextResponse } from "next/server";
import { findCertificate, getCertificateCourses } from "@/lib/certificates-store";
import { buildCertificateProxyPath } from "@/lib/s3";

export const dynamic = "force-dynamic";

export async function GET() {
  const courses = await getCertificateCourses();
  return NextResponse.json({ courses });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body.email || "").trim().toLowerCase();
    const courseName = String(body.courseName || "").trim();

    if (!email || !courseName) {
      return NextResponse.json(
        { error: "Course name and email are required." },
        { status: 400 }
      );
    }

    const match = await findCertificate(courseName, email);
    if (!match) {
      return NextResponse.json({ found: false }, { status: 404 });
    }

    return NextResponse.json({
      found: true,
      certificateUrl: buildCertificateProxyPath(match.certPath),
      certPath: match.certPath,
    });
  } catch (error) {
    console.error("Certificate lookup failed:", error);
    return NextResponse.json({ error: "Lookup failed." }, { status: 500 });
  }
}
