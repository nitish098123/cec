import { NextRequest, NextResponse } from "next/server";
import {
  isAdminAuthenticatedRequest,
  unauthorizedResponse,
} from "@/lib/admin-auth";
import { enrichCourseForAdmin } from "@/lib/course-enrich";
import { deleteCourseS3Assets } from "@/lib/course-s3-cleanup";
import { deleteCourse, getCourseById, updateCourse } from "@/lib/courses-store";
import type { CourseInput } from "@/lib/course-types";
import { deleteFromS3, resolveStoredImageKey } from "@/lib/s3";

export const dynamic = "force-dynamic";

type RouteContext = { params: { id: string } };

export async function PUT(request: NextRequest, context: RouteContext) {
  if (!isAdminAuthenticatedRequest(request)) {
    return unauthorizedResponse();
  }

  const id = Number(context.params.id);
  if (!Number.isFinite(id)) {
    return NextResponse.json({ error: "Invalid course id." }, { status: 400 });
  }

  try {
    const body = (await request.json()) as Partial<CourseInput>;
    const existing = await getCourseById(id);
    if (!existing) {
      return NextResponse.json({ error: "Course not found." }, { status: 404 });
    }

    const course = await updateCourse(id, body);
    if (!course) {
      return NextResponse.json({ error: "Course not found." }, { status: 404 });
    }

    const oldImageKey = resolveStoredImageKey(existing.image);
    const newImageKey = resolveStoredImageKey(course.image);
    if (oldImageKey && oldImageKey !== newImageKey) {
      await deleteFromS3(oldImageKey).catch(() => undefined);
    }
    const oldMediaKey = existing.redirectMediaKey?.trim();
    const newMediaKey = course.redirectMediaKey?.trim();
    if (oldMediaKey && oldMediaKey !== newMediaKey) {
      await deleteFromS3(oldMediaKey).catch(() => undefined);
    }

    const enriched = await enrichCourseForAdmin(course, request.nextUrl.origin);
    return NextResponse.json({ course: enriched });
  } catch (error) {
    console.error("Update course failed:", error);
    return NextResponse.json({ error: "Failed to update course." }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  if (!isAdminAuthenticatedRequest(request)) {
    return unauthorizedResponse();
  }

  const id = Number(context.params.id);
  if (!Number.isFinite(id)) {
    return NextResponse.json({ error: "Invalid course id." }, { status: 400 });
  }

  const existing = await getCourseById(id);
  if (!existing) {
    return NextResponse.json({ error: "Course not found." }, { status: 404 });
  }

  await deleteCourseS3Assets(existing);
  const deleted = await deleteCourse(id);
  if (!deleted) {
    return NextResponse.json({ error: "Course not found." }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
