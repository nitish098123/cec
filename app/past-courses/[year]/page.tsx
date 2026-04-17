import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPastCourses, getPastLongTermCourses, isValidPastCourseYear } from "@/lib/pastCoursesData";
import { PastCoursesClient } from "./PastCoursesClient";

type Props = { params: Promise<{ year: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { year } = await params;
  if (!isValidPastCourseYear(year)) return { title: "Past Courses | CEC" };
  return {
    title: `Courses ${year} | CEC`,
    description: "Continuing Education Centre, IIT Roorkee – List of short-term and long-term courses.",
  };
}

export default async function PastCoursesPage({ params }: Props) {
  const { year } = await params;
  if (!isValidPastCourseYear(year)) notFound();
  const courses = getPastCourses(year);
  const longTermCourses = getPastLongTermCourses(year);
  return (
    <PastCoursesClient
      year={year}
      initialCourses={courses}
      initialLongTermCourses={longTermCourses}
    />
  );
}
