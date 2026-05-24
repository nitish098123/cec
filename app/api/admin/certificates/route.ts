import { NextRequest, NextResponse } from "next/server";
import {
  isAdminAuthenticatedRequest,
  unauthorizedResponse,
} from "@/lib/admin-auth";
import {
  addCertificateCourse,
  createCertificate,
  deleteCertificate,
  getAllCertificates,
  getCertificateCourses,
} from "@/lib/certificates-store";
import { deleteFromS3, buildCertificateProxyPath } from "@/lib/s3";
import { getSiteOrigin } from "@/lib/site-url";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  if (!isAdminAuthenticatedRequest(request)) {
    return unauthorizedResponse();
  }

  const origin = getSiteOrigin(request);
  const [courses, certificates] = await Promise.all([
    getCertificateCourses(),
    getAllCertificates(),
  ]);

  return NextResponse.json({
    courses,
    certificates: certificates.map((record) => ({
      ...record,
      certificateUrl: `${origin}${buildCertificateProxyPath(record.certPath)}`,
    })),
  });
}

export async function POST(request: NextRequest) {
  if (!isAdminAuthenticatedRequest(request)) {
    return unauthorizedResponse();
  }

  try {
    const body = await request.json();
    const action = String(body.action || "create");

    if (action === "add-course") {
      const courses = await addCertificateCourse(String(body.courseName || ""));
      return NextResponse.json({ courses });
    }

    const record = await createCertificate({
      name: String(body.name || ""),
      email: String(body.email || ""),
      number: body.number ? String(body.number) : undefined,
      courseName: String(body.courseName || ""),
      folderName: String(body.folderName || ""),
      s3Key: String(body.s3Key || ""),
      certPath: String(body.certPath || ""),
      fileName: String(body.fileName || ""),
      contentType: String(body.contentType || ""),
    });

    const origin = getSiteOrigin(request);
    return NextResponse.json(
      {
        certificate: {
          ...record,
          certificateUrl: `${origin}${buildCertificateProxyPath(record.certPath)}`,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create certificate failed:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to save certificate." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  if (!isAdminAuthenticatedRequest(request)) {
    return unauthorizedResponse();
  }

  const id = Number(request.nextUrl.searchParams.get("id"));
  if (!Number.isFinite(id)) {
    return NextResponse.json({ error: "Invalid certificate id." }, { status: 400 });
  }

  const deleted = await deleteCertificate(id);
  if (!deleted) {
    return NextResponse.json({ error: "Certificate not found." }, { status: 404 });
  }

  await deleteFromS3(deleted.s3Key).catch(() => undefined);
  return NextResponse.json({ success: true });
}
