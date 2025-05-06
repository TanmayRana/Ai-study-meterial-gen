/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, RefreshCcw } from "lucide-react";
import Link from "next/link";
import React from "react";

const CourseCardItem = ({ course }: { course: any }) => {
  // console.log("course=", course);

  return (
    <div className="w-full max-w-sm p-5 bg-white border border-gray-200 rounded-2xl shadow-md dark:bg-gray-900 dark:border-gray-700 transition-all hover:shadow-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-blue-600 dark:text-blue-400">
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M18 5h-.7c.229-.467.349-.98.351-1.5a3.5 3.5 0 0 0-3.5-3.5c-1.717 0-3.215 1.2-4.331 2.481C8.4.842 6.949 0 5.5 0A3.5 3.5 0 0 0 2 3.5c.003.52.123 1.033.351 1.5H2a2 2 0 0 0-2 2v3a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a2 2 0 0 0-2-2ZM8.058 5H5.5a1.5 1.5 0 0 1 0-3c.9 0 2 .754 3.092 2.122-.219.337-.392.635-.534.878Zm6.1 0h-3.742c.933-1.368 2.371-3 3.739-3a1.5 1.5 0 0 1 0 3h.003ZM11 13H9v7h2v-7Zm-4 0H2v5a2 2 0 0 0 2 2h3v-7Zm6 0v7h3a2 2 0 0 0 2-2v-5h-5Z" />
          </svg>
        </div>
        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-white">
          00:00:00
        </span>
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
        {course?.courseLayout?.courseTitle || "Untitled Course"}
      </h3>

      {/* Summary */}
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
        {course?.courseLayout?.courseSummary || "No description available."}
      </p>

      {/* Progress */}
      <div className="mb-4">
        <Progress value={50} />
      </div>

      {/* Footer Button */}
      <div className="flex justify-end items-center">
        {course?.status === "Generating" ? (
          <span className="text-xs px-3 py-1 rounded-full bg-gray-400 text-white flex items-center gap-2">
            <RefreshCcw className="w-4 h-4 animate-spin" />
            Generating...
          </span>
        ) : (
          <Link href={`/course/${course?.courseId}`}>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 cursor-pointer">
              View <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default CourseCardItem;
