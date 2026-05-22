import type { Course } from "./course-types";
import { deleteFromS3, resolveStoredImageKey } from "./s3";

export async function deleteCourseS3Assets(course: Course): Promise<void> {
  const imageKey = resolveStoredImageKey(course.image);
  const mediaKey = course.redirectMediaKey?.trim();

  const deletions: Promise<void>[] = [];
  if (imageKey) deletions.push(deleteFromS3(imageKey));
  if (mediaKey) deletions.push(deleteFromS3(mediaKey));

  await Promise.allSettled(deletions);
}
