import Link from "next/link";

type CertificateViewPageProps = {
  searchParams: {
    certPath?: string;
  };
};

export default function CertificateViewPage({ searchParams }: CertificateViewPageProps) {
  const certPath = searchParams.certPath ?? "";
  const certUrl = certPath
    ? `/api/certificate-download?certPath=${encodeURIComponent(certPath)}`
    : "";
  const downloadUrl = `/api/certificate-download?certPath=${encodeURIComponent(certPath)}&download=1`;

  return (
    <div className="min-h-screen bg-black px-4 py-8 sm:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6">
        <div className="w-full max-w-[980px] rounded-xl bg-white p-4 shadow-xl">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
              Course Certificate
            </h1>
            <Link
              href={downloadUrl}
              className="rounded-md bg-blue-600 px-5 py-2 font-medium text-white transition-colors hover:bg-blue-700"
            >
              Download
            </Link>
          </div>

          <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-neutral-100">
            {certUrl ? (
              <img
                src={certUrl}
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
      </div>
    </div>
  );
}
