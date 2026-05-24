export interface CertificateRecord {
  id: number;
  name: string;
  email: string;
  number?: string;
  courseName: string;
  s3Key: string;
  certPath: string;
  folderName: string;
  fileName: string;
  contentType: string;
  createdAt: string;
}

export type CertificateInput = Omit<
  CertificateRecord,
  "id" | "createdAt" | "s3Key" | "certPath" | "fileName" | "contentType"
> & {
  s3Key: string;
  certPath: string;
  fileName: string;
  contentType: string;
};
