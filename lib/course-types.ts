export const COURSE_CATEGORIES = [
  "Emerging Technologies",
  "Hardware & IT",
  "Management",
  "Sustainability",
  "Miscellaneous",
] as const;

export type CourseCategory = (typeof COURSE_CATEGORIES)[number];

export interface Course {
  id: number;
  name: string;
  duration: string;
  mode: string;
  students: string;
  partner: string;
  category: CourseCategory;
  /** S3 object key, or legacy http URL */
  image: string;
  /** External redirect URL (optional when redirectMediaKey is set) */
  redirectLink: string;
  /** S3 object key for uploaded PDF/image used as course link */
  redirectMediaKey?: string;
  openInNewTab: boolean;
}

export type CourseInput = Omit<Course, "id">;
