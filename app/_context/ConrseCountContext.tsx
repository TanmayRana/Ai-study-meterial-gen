// import { createContext } from "react";

// export const ConrseCountContext = createContext(null);

// app/_context/ConrseCountContext.tsx
"use client";

import { createContext, useContext } from "react";

export interface CourseCountContextType {
  totalCourse: number;
  setTotalCourse: React.Dispatch<React.SetStateAction<number>>;
}

// Create context with initial value as null
export const ConrseCountContext = createContext<CourseCountContextType | null>(
  null
);

// Optional custom hook to use the context safely
export const useCourseCount = () => {
  const context = useContext(ConrseCountContext);
  if (!context) {
    throw new Error("useCourseCount must be used within a ConrseCountProvider");
  }
  return context;
};
