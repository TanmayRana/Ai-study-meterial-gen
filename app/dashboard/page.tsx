/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import WelcomeBanner from "./_components/WelcomeBanner";
import CourseList from "./_components/CourseList";

const Dashboard: any = () => {
  return (
    <div>
      <WelcomeBanner />
      <CourseList />
    </div>
  );
};

export default Dashboard;
