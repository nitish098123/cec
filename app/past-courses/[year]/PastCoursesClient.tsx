"use client";

import React, { useMemo, useState } from "react";
import type { LongTermCourse, PastCourse } from "@/lib/pastCoursesData";

export function PastCoursesClient({
  year,
  initialCourses,
  initialLongTermCourses = [],
}: {
  year: string;
  initialCourses: PastCourse[];
  initialLongTermCourses?: LongTermCourse[];
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCourses = useMemo(() => {
    if (!searchTerm.trim()) return initialCourses;
    const term = searchTerm.toLowerCase().trim();
    return initialCourses.filter(
      (c) =>
        c.department.toLowerCase().includes(term) ||
        c.course.toLowerCase().includes(term) ||
        c.coordinator.toLowerCase().includes(term) ||
        c.duration.toLowerCase().includes(term) ||
        c.sponsor.toLowerCase().includes(term)
    );
  }, [initialCourses, searchTerm]);

  const filteredLongTermCourses = useMemo(() => {
    if (!searchTerm.trim()) return initialLongTermCourses;
    const term = searchTerm.toLowerCase().trim();
    return initialLongTermCourses.filter(
      (c) =>
        c.courseName.toLowerCase().includes(term) ||
        c.batchNo.toLowerCase().includes(term) ||
        c.durationStatus.toLowerCase().includes(term) ||
        c.from.toLowerCase().includes(term) ||
        c.to.toLowerCase().includes(term) ||
        c.partnerInstitute.toLowerCase().includes(term) ||
        c.coordinator.toLowerCase().includes(term)
    );
  }, [initialLongTermCourses, searchTerm]);

  const hasPlaceholderOnly =
    initialCourses.length === 1 &&
    initialCourses[0].course === "—" &&
    initialCourses[0].department === "—";

  const totalShort = initialCourses.length;
  const totalLong = initialLongTermCourses.length;
  const showCount =
    searchTerm &&
    (totalShort > 0 || totalLong > 0) &&
    (filteredCourses.length !== totalShort || filteredLongTermCourses.length !== totalLong);
  const totalFiltered = filteredCourses.length + filteredLongTermCourses.length;
  const totalAll = totalShort + totalLong;

  return (
    <div className="bg-white min-h-screen font-inter">
      {/* Hero */}
      <div className="relative w-full h-[30vh] md:h-[40vh] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-[url('/gallery_background.jpeg')] bg-cover bg-center brightness-[0.5]"
          aria-hidden="true"
        />
        <div className="relative flex items-center z-20 px-4">
          <div className="text-white text-center">
            <h1 className="text-3xl md:text-4xl font-bold tracking-wide">
              Courses {year}
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-semibold text-center text-[#102a43] mb-6 md:mb-8">
          List of short-term courses conducted during {year}
        </h2>

        {/* Search */}
        <div className="max-w-xl mx-auto mb-8">
          <label htmlFor="course-search" className="sr-only">
            Search courses
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </span>
            <input
              id="course-search"
              type="text"
              placeholder="Search by department, course name, coordinator, duration or sponsor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFAE0E] focus:border-[#FFAE0E] outline-none text-gray-800 placeholder-gray-500"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="Clear search"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          {showCount && (
            <p className="mt-2 text-sm text-gray-500 text-center">
              Showing {totalFiltered} of {totalAll} course{totalAll !== 1 ? "s" : ""}
            </p>
          )}
        </div>

        {/* Table */}
        <div className="overflow-x-auto shadow-md sm:rounded-lg border border-gray-200 rounded-lg">
          {hasPlaceholderOnly && !searchTerm ? (
            <div className="bg-[#FFFAF1] border border-[#FFAE0E]/30 rounded-lg p-8 text-center">
              <p className="text-gray-600 mb-1">
                Course list for {year} will be updated here soon.
              </p>
              <p className="text-sm text-gray-500">
                Data can be added in <code className="bg-white px-1 rounded">lib/pastCoursesData.ts</code>.
              </p>
            </div>
          ) : filteredCourses.length === 0 ? (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <p className="text-gray-600">
                No courses match &quot;{searchTerm}&quot;. Try a different search.
              </p>
            </div>
          ) : (
            <table className="min-w-full bg-white">
              <thead className="bg-[#102a43] text-white">
                <tr>
                  <th className="py-3 px-4 sm:px-6 text-left text-xs font-medium uppercase tracking-wider">
                    S.No.
                  </th>
                  <th className="py-3 px-4 sm:px-6 text-left text-xs font-medium uppercase tracking-wider">
                    Department
                  </th>
                  <th className="py-3 px-4 sm:px-6 text-left text-xs font-medium uppercase tracking-wider">
                    Course Name
                  </th>
                  <th className="py-3 px-4 sm:px-6 text-left text-xs font-medium uppercase tracking-wider">
                    Course Coordinator
                  </th>
                  <th className="py-3 px-4 sm:px-6 text-left text-xs font-medium uppercase tracking-wider whitespace-nowrap">
                    Duration
                  </th>
                  <th className="py-3 px-4 sm:px-6 text-left text-xs font-medium uppercase tracking-wider">
                    Sponsoring Agency
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredCourses.map((course) => (
                  <tr
                    key={`${course.sno}-${course.course}-${course.duration}`}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-4 sm:px-6 whitespace-nowrap text-gray-700">
                      {course.sno}
                    </td>
                    <td className="py-4 px-4 sm:px-6 whitespace-nowrap text-gray-700">
                      {course.department}
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-gray-700">
                      {course.course}
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-gray-700">
                      {course.coordinator}
                    </td>
                    <td className="py-4 px-4 sm:px-6 whitespace-nowrap text-gray-700">
                      {course.duration}
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-gray-700">
                      {course.sponsor}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Long-term online open participation courses */}
        {initialLongTermCourses.length > 0 && (
          <>
            <h2 className="text-2xl md:text-3xl font-semibold text-center text-[#102a43] mt-16 mb-6 md:mb-8">
              List of long-term online open participation courses from April {year.split("-")[0]} to March 20{year.split("-")[1]}
            </h2>
            <div className="overflow-x-auto shadow-md sm:rounded-lg border border-gray-200 rounded-lg">
              {filteredLongTermCourses.length === 0 ? (
                <div className="bg-gray-50 rounded-lg p-8 text-center">
                  <p className="text-gray-600">
                    {searchTerm
                      ? `No long-term courses match "${searchTerm}". Try a different search.`
                      : "No long-term courses for this year."}
                  </p>
                </div>
              ) : (
                <table className="min-w-full bg-white">
                  <thead className="bg-[#102a43] text-white">
                    <tr>
                      <th className="py-3 px-4 sm:px-6 text-left text-xs font-medium uppercase tracking-wider">
                        S.No.
                      </th>
                      <th className="py-3 px-4 sm:px-6 text-left text-xs font-medium uppercase tracking-wider">
                        Course Name
                      </th>
                      <th className="py-3 px-4 sm:px-6 text-left text-xs font-medium uppercase tracking-wider whitespace-nowrap">
                        Batch No.
                      </th>
                      <th className="py-3 px-4 sm:px-6 text-left text-xs font-medium uppercase tracking-wider">
                        Duration / Status
                      </th>
                      <th className="py-3 px-4 sm:px-6 text-left text-xs font-medium uppercase tracking-wider">
                        From
                      </th>
                      <th className="py-3 px-4 sm:px-6 text-left text-xs font-medium uppercase tracking-wider">
                        To
                      </th>
                      <th className="py-3 px-4 sm:px-6 text-left text-xs font-medium uppercase tracking-wider">
                        Partner Institute
                      </th>
                      <th className="py-3 px-4 sm:px-6 text-left text-xs font-medium uppercase tracking-wider">
                        Coordinator(s)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredLongTermCourses.map((course) => (
                      <tr
                        key={`lt-${course.sno}-${course.courseName}-${course.batchNo}`}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-4 px-4 sm:px-6 whitespace-nowrap text-gray-700">
                          {course.sno}
                        </td>
                        <td className="py-4 px-4 sm:px-6 text-gray-700">
                          {course.courseName}
                        </td>
                        <td className="py-4 px-4 sm:px-6 whitespace-nowrap text-gray-700">
                          {course.batchNo}
                        </td>
                        <td className="py-4 px-4 sm:px-6 whitespace-nowrap text-gray-700">
                          {course.durationStatus}
                        </td>
                        <td className="py-4 px-4 sm:px-6 whitespace-nowrap text-gray-700">
                          {course.from}
                        </td>
                        <td className="py-4 px-4 sm:px-6 whitespace-nowrap text-gray-700">
                          {course.to}
                        </td>
                        <td className="py-4 px-4 sm:px-6 text-gray-700">
                          {course.partnerInstitute}
                        </td>
                        <td className="py-4 px-4 sm:px-6 text-gray-700">
                          {course.coordinator}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
