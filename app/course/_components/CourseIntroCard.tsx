/* eslint-disable @typescript-eslint/no-explicit-any */
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import React from "react";

const CourseIntroCard = ({ course }: { course: any }) => {
  return (
    <div className="flex gap-5 items-center p-10 border shadow-md rounded-lg">
      <Image src={"/"} alt="course image" width={70} height={70} />
      <div>
        <h2 className="text-2xl font-bold">
          {course?.courseLayout?.courseTitle}
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          {course?.courseLayout?.courseSummary}
        </p>
        <Progress className="mt-3" />

        <h2 className="mt-3 text-sm text-blue-600">
          Total Chapters: {course?.courseLayout?.chapters?.length}
        </h2>
      </div>
    </div>
  );
};

export default CourseIntroCard;
