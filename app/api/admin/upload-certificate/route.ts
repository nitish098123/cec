import { NextRequest, NextResponse } from "next/server";
import {
  isAdminAuthenticatedRequest,
  unauthorizedResponse,
} from "@/lib/admin-auth";
import {
  buildCertificateRelativePath,
  buildCertificateS3Key,
  buildCertificateProxyPath,
  getPresignedGetUrl,
  sanitizeFileName,
  sanitizeFolderName,
  uploadBufferToS3,
} from "@/lib/s3";
import { getSiteOrigin } from "@/lib/site-url";

export async function POST(request: NextRequest) {
  if (!isAdminAuthenticatedRequest(request)) {
    return unauthorizedResponse();
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const folderName = String(formData.get("folderName") || "").trim();
    const candidateName = String(formData.get("candidateName") || "").trim();

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "Certificate file is required." }, { status: 400 });
    }
    if (!folderName) {
      return NextResponse.json({ error: "Folder name is required." }, { status: 400 });
    }

    const allowed = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "application/pdf",
    ];
    if (!allowed.includes(file.type)) {
      return NextResponse.json(
        { error: "Only JPG, PNG, WEBP, or PDF files are allowed." },
        { status: 400 }
      );
    }

    const safeFolder = sanitizeFolderName(folderName);
    if (!safeFolder) {
      return NextResponse.json({ error: "Invalid folder name." }, { status: 400 });
    }

    const ext = file.name.includes(".")
      ? file.name.slice(file.name.lastIndexOf("."))
      : file.type === "application/pdf"
        ? ".pdf"
        : ".jpg";
    const baseName = candidateName
      ? sanitizeFileName(candidateName).replace(/\.[^.]+$/, "")
      : "certificate";
    const fileName = `${baseName}-${Date.now()}${ext}`;

    const s3Key = buildCertificateS3Key(safeFolder, fileName);
    const certPath = buildCertificateRelativePath(safeFolder, fileName);
    const bytes = Buffer.from(await file.arrayBuffer());
    const contentType = file.type || "application/octet-stream";

    await uploadBufferToS3(s3Key, bytes, contentType);

    const presignedViewUrl = await getPresignedGetUrl(s3Key);
    const origin = getSiteOrigin(request);
    const legacyUrl = `${origin}${buildCertificateProxyPath(certPath)}`;

    return NextResponse.json({
      s3Key,
      certPath,
      fileName,
      folderName: safeFolder,
      contentType,
      presignedViewUrl,
      legacyUrl,
      proxyPath: buildCertificateProxyPath(certPath),
    });
  } catch (error) {
    console.error("Certificate upload failed:", error);
    const message =
      error instanceof Error ? error.message : "Failed to upload certificate.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
