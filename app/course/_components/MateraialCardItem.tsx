/* eslint-disable @typescript-eslint/no-explicit-any */
// import { Button } from "@/components/ui/button";
// import Image from "next/image";
// import React from "react";

// const MateraialCardItem = ({ item, studyTypeContent }) => {
//   return (
//     <div
//       className={`border shadow-md rounded-lg p-5 flex flex-col items-center
//     ${studyTypeContent?.[item.type]?.length === null && "grayscale"}
//     `}
//     >
//       <h2 className="p-1 px-2 bg-green-500 text-white rounded-full text-[10px] mb-2">
//         Ready
//       </h2>
//       <Image src={"/"} alt={item.name} width={50} height={50} />
//       <h2 className="font-medium mt-3">{item.name}</h2>
//       <p className="text-sm text-gray-600 text-center">{item.desc}</p>

//       <Button className="mt-3 w-full cursor-pointer" variant={"outline"}>
//         View
//       </Button>
//     </div>
//   );
// };

// export default MateraialCardItem;

"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { RefreshCcw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";

const MateraialCardItem = ({
  item,
  studyTypeContent,
  course,
  refreshData,
}: any) => {
  const [loading, setLoading] = useState(false);

  const isEmpty =
    !studyTypeContent?.[item.type] || studyTypeContent[item.type].length === 0;

  const GenerateContent = async () => {
    toast("Generating content, please wait...");
    setLoading(true);
    try {
      let chapters = "";
      if (course?.courseLayout?.chapters) {
        chapters = course.courseLayout.chapters
          .map((chapter: any) => chapter.chapterTitle)
          .join(", ");
      }

      const response = await axios.post(`/api/generate-study-type-content`, {
        courseId: course?.courseId,
        type: item.type,
        chapters: chapters,
      });
      // console.log("response=", response.data);
      refreshData(true);
      toast("Content generated successfully");
    } catch (error) {
      console.error("Error generating content:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`border shadow-md rounded-lg p-5 flex flex-col items-center transition
      ${isEmpty ? "grayscale opacity-70" : ""}`}
    >
      {isEmpty ? (
        <h2 className="p-1 px-2 bg-gray-500 text-white rounded-full text-[10px] mb-2">
          Generate
        </h2>
      ) : (
        <h2 className="p-1 px-2 bg-green-500 text-white rounded-full text-[10px] mb-2">
          Ready
        </h2>
      )}

      {/* Replace '/' with actual image path */}
      <Image
        src={item.image || "/placeholder.png"} // Add fallback image if item.image is undefined
        alt={item.name}
        width={50}
        height={50}
        className="rounded-full"
      />

      <h2 className="font-medium mt-3 text-center">{item.name}</h2>
      <p className="text-sm text-gray-600 text-center">
        {item.desc || "No description available"}
      </p>

      {isEmpty ? (
        <Button
          className="mt-3 w-full flex items-center justify-center cursor-pointer"
          variant={"outline"}
          onClick={() => GenerateContent()}
        >
          {loading && <RefreshCcw className="animate-spin" />}
          Generate
        </Button>
      ) : (
        <Link
          href={`/course/${course?.courseId}/${item.link}`}
          className="w-full "
        >
          <Button className="mt-3 w-full cursor-pointer" variant={"outline"}>
            View
          </Button>
        </Link>
      )}
    </div>
  );
};

export default MateraialCardItem;
