import { promises as fs } from "fs";
import path from "path";
import type { CertificateInput, CertificateRecord } from "./certificate-types";
import initialCourses from "./initial-certificate-courses.json";

const DATA_DIR = path.join(process.cwd(), "data");
const CERTIFICATES_FILE = path.join(DATA_DIR, "certificates.json");
const CERTIFICATE_COURSES_FILE = path.join(DATA_DIR, "certificate-courses.json");

async function ensureDataFiles(): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });

  try {
    await fs.access(CERTIFICATE_COURSES_FILE);
  } catch {
    await fs.writeFile(
      CERTIFICATE_COURSES_FILE,
      JSON.stringify(initialCourses, null, 2),
      "utf-8"
    );
  }

  try {
    await fs.access(CERTIFICATES_FILE);
  } catch {
    await fs.writeFile(CERTIFICATES_FILE, JSON.stringify([], null, 2), "utf-8");
  }
}

export async function getCertificateCourses(): Promise<string[]> {
  await ensureDataFiles();
  const raw = await fs.readFile(CERTIFICATE_COURSES_FILE, "utf-8");
  const courses = JSON.parse(raw) as string[];
  return [...new Set(courses.map((c) => c.trim()).filter(Boolean))].sort();
}

export async function addCertificateCourse(courseName: string): Promise<string[]> {
  const trimmed = courseName.trim();
  if (!trimmed) {
    throw new Error("Course name is required.");
  }

  const courses = await getCertificateCourses();
  if (!courses.includes(trimmed)) {
    courses.push(trimmed);
    courses.sort();
    await fs.writeFile(
      CERTIFICATE_COURSES_FILE,
      JSON.stringify(courses, null, 2),
      "utf-8"
    );
  }
  return courses;
}

export async function getAllCertificates(): Promise<CertificateRecord[]> {
  await ensureDataFiles();
  const raw = await fs.readFile(CERTIFICATES_FILE, "utf-8");
  const records = JSON.parse(raw) as CertificateRecord[];
  return records.sort((a, b) => b.id - a.id);
}

export async function createCertificate(
  input: CertificateInput
): Promise<CertificateRecord> {
  const name = input.name.trim();
  const email = input.email.trim().toLowerCase();
  const courseName = input.courseName.trim();
  const folderName = input.folderName.trim();
  const s3Key = input.s3Key.trim();
  const certPath = input.certPath.trim();

  if (!name || !email || !courseName || !folderName || !s3Key || !certPath) {
    throw new Error("All required certificate fields must be provided.");
  }

  const records = await getAllCertificates();
  const nextId = records.reduce((max, item) => Math.max(max, item.id), 0) + 1;

  const record: CertificateRecord = {
    id: nextId,
    name,
    email,
    number: input.number?.trim() || undefined,
    courseName,
    s3Key,
    certPath,
    folderName,
    fileName: input.fileName,
    contentType: input.contentType,
    createdAt: new Date().toISOString(),
  };

  records.push(record);
  await fs.writeFile(CERTIFICATES_FILE, JSON.stringify(records, null, 2), "utf-8");
  await addCertificateCourse(record.courseName);
  return record;
}

export async function findCertificate(
  courseName: string,
  email: string
): Promise<CertificateRecord | undefined> {
  const records = await getAllCertificates();
  const normalizedEmail = email.trim().toLowerCase();
  const normalizedCourse = courseName.trim();

  return records.find(
    (record) =>
      record.courseName === normalizedCourse &&
      record.email === normalizedEmail
  );
}

export async function deleteCertificate(id: number): Promise<CertificateRecord | null> {
  const records = await getAllCertificates();
  const target = records.find((record) => record.id === id);
  if (!target) return null;

  const next = records.filter((record) => record.id !== id);
  await fs.writeFile(CERTIFICATES_FILE, JSON.stringify(next, null, 2), "utf-8");
  return target;
}
