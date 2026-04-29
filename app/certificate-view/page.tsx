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
    <div className="min-h-screen bg-gradient-to-b from-[#102a43] via-black to-black px-4 pb-10 pt-28 sm:px-8 sm:pt-32">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center">
        <div className="w-full max-w-[980px] rounded-xl bg-white/95 p-4 shadow-xl sm:p-6">
          <CertificateViewerClient certPath={certPath} />
        </div>
      </div>
    </div>
  );
}
