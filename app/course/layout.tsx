import React from "react";
import DashboardHeader from "../dashboard/_components/DashboardHeader";

export default function CourseViewlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <DashboardHeader />
      <div className="mx-10 md:mx-36 lg:mx-60 mt-10">{children}</div>
    </div>
  );
}
