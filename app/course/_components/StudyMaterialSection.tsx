/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import MateraialCardItem from "./MateraialCardItem";
import axios from "axios";
import Link from "next/link";

const StudyMaterialSection = ({ courseId, course }: any) => {
  const [studyTypeContent, setStudyTypeContent] = useState();

  const MaterialList = [
    {
      name: "Notes/Chapters",
      desc: "Read notes to prepare it",
      icon: "book-open-fill",
      link: "/notes",
      type: "notes",
    },
    {
      name: "Flashcards",
      desc: "Flashcards help you memorize information",
      icon: "book-open-fill",
      link: "/flashcards",
      type: "flashcard",
    },
    {
      name: "Quizzes",
      desc: "Quizzes help you test your knowledge",
      icon: "book-open-fill",
      link: "/quizzes",
      type: "quiz",
    },
    {
      name: "Questions/Answers",
      desc: "Questions and Answers help practice your knowledge",
      icon: "book-open-fill",
      link: "/questions",
      type: "qa",
    },
  ];

  useEffect(() => {
    GetStudyMaterial();
  }, []);

  const GetStudyMaterial = async () => {
    const result = await axios.post("/api/study-type", {
      courseId: courseId,
      studyType: "ALL",
    });
    // console.log("result=", result.data);
    setStudyTypeContent(result.data);
  };

  console.log("studyTypeContent=", studyTypeContent);

  return (
    <div className="mt-5">
      <h2 className="font-medium text-2xl ">Study Materials</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-3">
        {MaterialList.map((item, index) => (
          <MateraialCardItem
            key={index}
            item={item}
            studyTypeContent={studyTypeContent}
            course={course}
            refreshData={GetStudyMaterial}
          />
        ))}
      </div>
    </div>
  );
};

export default StudyMaterialSection;
