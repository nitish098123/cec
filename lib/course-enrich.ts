import type { Course } from "./course-types";
import {
  buildCourseImageProxyPath,
  buildCourseMediaProxyPath,
  getPresignedGetUrl,
  isHttpUrl,
  resolveStoredImageKey,
} from "./s3";

export type PublicCourse = Course & {
  imageUrl: string;
  redirectHref: string;
};

export function enrichCourseForPublic(course: Course): PublicCourse {
  const imageKey = resolveStoredImageKey(course.image);
  const imageUrl = imageKey
    ? buildCourseImageProxyPath(imageKey)
    : course.image || "/course.jpeg";

  const redirectMediaKey = course.redirectMediaKey?.trim();
  const externalRedirect = course.redirectLink?.trim();

  let redirectHref = "#";
  if (redirectMediaKey) {
    redirectHref = buildCourseMediaProxyPath(redirectMediaKey);
  } else if (externalRedirect) {
    redirectHref = externalRedirect;
  }

  return {
    ...course,
    imageUrl,
    redirectHref,
  };
}

export function enrichCoursesForPublic(courses: Course[]): PublicCourse[] {
  return courses.map(enrichCourseForPublic);
}

export type AdminCourse = Course & {
  imagePreviewUrl: string;
  redirectCopyUrl: string;
};

export async function enrichCourseForAdmin(
  course: Course,
  baseUrl: string
): Promise<AdminCourse> {
  const imageKey = resolveStoredImageKey(course.image);
  let imagePreviewUrl = course.image || "/course.jpeg";
  if (imageKey) {
    try {
      imagePreviewUrl = await getPresignedGetUrl(imageKey);
    } catch {
      imagePreviewUrl = buildCourseImageProxyPath(imageKey);
    }
  }

  const redirectCopyUrl = course.redirectMediaKey?.trim()
    ? `${baseUrl}${buildCourseMediaProxyPath(course.redirectMediaKey.trim())}`
    : course.redirectLink?.trim() || "";

  return {
    ...course,
    imagePreviewUrl,
    redirectCopyUrl,
  };
}

export async function enrichCoursesForAdmin(
  courses: Course[],
  baseUrl: string
): Promise<AdminCourse[]> {
  return Promise.all(courses.map((course) => enrichCourseForAdmin(course, baseUrl)));
}

export async function getPresignedPreviewUrl(
  storedValue: string
): Promise<string | null> {
  const value = storedValue.trim();
  if (!value) return null;
  if (isHttpUrl(value)) return value;
  try {
    return await getPresignedGetUrl(value);
  } catch {
    return null;
  }
}
