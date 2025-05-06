"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import CourseIntroCard from "../_components/CourseIntroCard";
import StudyMaterialSection from "../_components/StudyMaterialSection";
import ChapterList from "../_components/ChapterList";

const Course = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState();
  console.log("course=", course);

  useEffect(() => {
    GetCourse();
  }, []);

  const GetCourse = async () => {
    const res = await axios.get(`/api/courses?courseId=${courseId}`);
    // console.log(res.data.result);
    setCourse(res.data.result);
  };

  return (
    <div>
      <div className="">
        {/* Course Info */}
        <CourseIntroCard course={course} />

        {/* Study Materials */}
        <StudyMaterialSection courseId={courseId} course={course} />

        {/* chapter List */}
        <ChapterList course={course} />
      </div>
    </div>
  );
};

export default Course;
