/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

const ChapterList = ({ course }: any) => {
  const Chapters = course?.courseLayout?.chapters || []; // Default to empty array if Chapters is undefined

  console.log("Chapters =", Chapters);

  return (
    <div className="mt-5">
      <h2 className="font-medium text-xl">Chapters</h2>
      <div className="mt-3">
        {Chapters.map((chapter: any, index: any) => (
          <div
            className="flex gap-5 items-center p-4 mb-2 border shadow-md rounded-lg cursor-pointer"
            key={index}
          >
            <h2 className="text-2xl">{chapter.emoji}</h2>
            <div className="f">
              <h2 className="font-medium">{chapter.chapterTitle}</h2>
              <p className="text-sm text-gray-600">{chapter.chapterSummary}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChapterList;
