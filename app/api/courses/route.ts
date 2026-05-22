import { NextResponse } from "next/server";
import { enrichCoursesForPublic } from "@/lib/course-enrich";
import { getAllCourses } from "@/lib/courses-store";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const courses = enrichCoursesForPublic(await getAllCourses());
    return NextResponse.json({ courses });
  } catch (error) {
    console.error("Failed to load courses:", error);
    return NextResponse.json(
      { error: "Failed to load courses." },
      { status: 500 }
    );
  }
}
