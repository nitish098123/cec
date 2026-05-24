import { NextRequest, NextResponse } from "next/server";
import {
  isAdminAuthenticatedRequest,
  unauthorizedResponse,
} from "@/lib/admin-auth";
import { enrichCoursesForAdmin } from "@/lib/course-enrich";
import { createCourse, getAllCourses } from "@/lib/courses-store";
import type { CourseInput } from "@/lib/course-types";
import { getSiteOrigin } from "@/lib/site-url";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  if (!isAdminAuthenticatedRequest(request)) {
    return unauthorizedResponse();
  }

  const baseUrl = getSiteOrigin(request);
  const courses = await enrichCoursesForAdmin(await getAllCourses(), baseUrl);
  return NextResponse.json({ courses });
}

export async function POST(request: NextRequest) {
  if (!isAdminAuthenticatedRequest(request)) {
    return unauthorizedResponse();
  }

  try {
    const body = (await request.json()) as CourseInput;
    if (!body.name?.trim()) {
      return NextResponse.json({ error: "Course name is required." }, { status: 400 });
    }
    if (!body.image?.trim()) {
      return NextResponse.json({ error: "Course image is required." }, { status: 400 });
    }
    if (!body.redirectLink?.trim() && !body.redirectMediaKey?.trim()) {
      return NextResponse.json(
        { error: "Provide an external redirect link or upload redirect media to S3." },
        { status: 400 }
      );
    }

    const course = await createCourse(body);
    return NextResponse.json({ course }, { status: 201 });
  } catch (error) {
    console.error("Create course failed:", error);
    return NextResponse.json({ error: "Failed to create course." }, { status: 500 });
  }
}
