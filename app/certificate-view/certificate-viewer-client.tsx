"use client";

import { useMemo, useState } from "react";
import { Button, message } from "antd";

type CertificateViewerClientProps = {
  certPath: string;
};

export default function CertificateViewerClient({
  certPath,
}: CertificateViewerClientProps) {
  const [downloading, setDownloading] = useState(false);

  const certImageUrl = useMemo(() => {
    if (!certPath) return "";
    return `/api/certificate-download?certPath=${encodeURIComponent(certPath)}`;
  }, [certPath]);

  const downloadAsPng = async () => {
    if (!certPath || !certImageUrl) return;

    setDownloading(true);
    try {
      const res = await fetch(certImageUrl, { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch certificate image.");

      const blob = await res.blob();

      const imgUrl = window.URL.createObjectURL(blob);
      const img = new Image();
      img.src = imgUrl;
      await img.decode();

      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas context not available.");

      ctx.drawImage(img, 0, 0);

      const pngBlob: Blob | null = await new Promise((resolve) =>
        canvas.toBlob((b) => resolve(b), "image/png")
      );
      if (!pngBlob) throw new Error("PNG conversion failed.");

      const baseName = certPath.split("/").pop() || "certificate";
      const fileName = baseName.replace(/\.[^.]+$/, ".png");

      const pngUrl = window.URL.createObjectURL(pngBlob);
      const link = document.createElement("a");
      link.href = pngUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(imgUrl);
      window.URL.revokeObjectURL(pngUrl);
    } catch {
      message.error("Unable to download certificate as PNG. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="min-h-[80vh] w-full flex flex-col items-center">
      <div className="flex-1 w-full flex items-center justify-center px-1">
        <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-neutral-100">
          {certImageUrl ? (
            // Using the same-domain API keeps the download/preview behind your app.
            <img
              src={certImageUrl}
              alt="Certificate preview"
              className="h-full w-full object-contain"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-gray-600">
              Certificate not found.
            </div>
          )}
        </div>
      </div>

      <div className="w-full flex justify-center pb-6">
        <Button
          type="primary"
          disabled={!certPath || downloading}
          loading={downloading}
          onClick={downloadAsPng}
        >
          Download
        </Button>
      </div>
    </div>
  );
}

