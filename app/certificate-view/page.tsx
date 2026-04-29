import dynamic from "next/dynamic";

type CertificateViewPageProps = {
  searchParams: {
    certPath?: string;
  };
};

const CertificateViewerClient = dynamic(
  () => import("./certificate-viewer-client"),
  { ssr: false }
);

export default function CertificateViewPage({
  searchParams,
}: CertificateViewPageProps) {
  const certPath = searchParams.certPath ?? "";

  return (
    <div className="min-h-screen bg-black px-4 py-8 sm:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center">
        <div className="w-full max-w-[980px] rounded-xl bg-white p-4 shadow-xl sm:p-6">
          <div className="mb-4">
            <h1 className="text-center text-xl font-semibold text-gray-900 sm:text-2xl">
              Course Certificate
            </h1>
          </div>

          <CertificateViewerClient certPath={certPath} />
        </div>
      </div>
    </div>
  );
}
