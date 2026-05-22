import { promises as fs } from "fs";
import path from "path";
import type { Course, CourseCategory, CourseInput } from "./course-types";
import { COURSE_CATEGORIES } from "./course-types";
import { INITIAL_COURSES } from "./initial-courses";

const DATA_DIR = path.join(process.cwd(), "data");
const COURSES_FILE = path.join(DATA_DIR, "courses.json");

async function ensureCoursesFile(): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(COURSES_FILE);
  } catch {
    await fs.writeFile(
      COURSES_FILE,
      JSON.stringify(INITIAL_COURSES, null, 2),
      "utf-8"
    );
  }
}

export async function getAllCourses(): Promise<Course[]> {
  await ensureCoursesFile();
  const raw = await fs.readFile(COURSES_FILE, "utf-8");
  const courses = JSON.parse(raw) as Course[];
  return courses.sort((a, b) => a.id - b.id);
}

export async function saveCourses(courses: Course[]): Promise<void> {
  await ensureCoursesFile();
  await fs.writeFile(COURSES_FILE, JSON.stringify(courses, null, 2), "utf-8");
}

export async function getCourseById(id: number): Promise<Course | undefined> {
  const courses = await getAllCourses();
  return courses.find((course) => course.id === id);
}

export async function createCourse(input: CourseInput): Promise<Course> {
  const courses = await getAllCourses();
  const nextId = courses.reduce((max, course) => Math.max(max, course.id), 0) + 1;
  const newCourse: Course = { id: nextId, ...normalizeCourseInput(input) };
  courses.push(newCourse);
  await saveCourses(courses);
  return newCourse;
}

export async function updateCourse(
  id: number,
  input: Partial<CourseInput>
): Promise<Course | null> {
  const courses = await getAllCourses();
  const index = courses.findIndex((course) => course.id === id);
  if (index === -1) return null;

  const updated: Course = {
    ...courses[index],
    ...normalizeCourseInput({ ...courses[index], ...input }),
    id,
  };
  courses[index] = updated;
  await saveCourses(courses);
  return updated;
}

export async function deleteCourse(id: number): Promise<boolean> {
  const courses = await getAllCourses();
  const next = courses.filter((course) => course.id !== id);
  if (next.length === courses.length) return false;
  await saveCourses(next);
  return true;
}

function normalizeCourseInput(input: CourseInput): CourseInput {
  const category = COURSE_CATEGORIES.includes(input.category as CourseCategory)
    ? (input.category as CourseCategory)
    : "Miscellaneous";

  const redirectMediaKey = input.redirectMediaKey?.trim() || undefined;
  const redirectLink = input.redirectLink?.trim() || "";

  return {
    name: input.name.trim(),
    duration: input.duration.trim(),
    mode: input.mode.trim(),
    students: input.students.trim(),
    partner: input.partner.trim(),
    category,
    image: input.image.trim(),
    redirectLink,
    redirectMediaKey,
    openInNewTab: Boolean(input.openInNewTab),
  };
}
