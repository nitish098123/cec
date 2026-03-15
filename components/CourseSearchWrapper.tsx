"use client";

import React, { useMemo, useState } from "react";

export type CourseTableColumn = {
  key: string;
  label: string;
  headerClassName?: string;
  cellClassName?: string;
};

export function CourseSearchWrapper({
  courses,
  columns,
  tableClassName = "min-w-full bg-white border border-gray-200",
  theadClassName = "bg-gray-800 text-white",
}: {
  courses: Record<string, unknown>[];
  columns: CourseTableColumn[];
  tableClassName?: string;
  theadClassName?: string;
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = useMemo(() => {
    if (!searchTerm.trim()) return courses;
    const term = searchTerm.toLowerCase().trim();
    return courses.filter((c) =>
      Object.values(c).some((v) => String(v ?? "").toLowerCase().includes(term))
    );
  }, [courses, searchTerm]);

  return (
    <>
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
            placeholder="Search courses..."
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
        {searchTerm && (
          <p className="mt-2 text-sm text-gray-500 text-center">
            Showing {filtered.length} of {courses.length} course
            {courses.length !== 1 ? "s" : ""}
          </p>
        )}
      </div>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className={tableClassName}>
          <thead className={theadClassName}>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`py-3 px-4 sm:px-6 text-left text-xs font-medium uppercase tracking-wider ${col.headerClassName ?? ""}`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filtered.map((course) => (
              <tr key={String(course.sno ?? course.name ?? Math.random())} className="border-b hover:bg-gray-100">
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`py-4 px-4 sm:px-6 ${col.cellClassName ?? ""}`}
                  >
                    {String(course[col.key] ?? "")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
