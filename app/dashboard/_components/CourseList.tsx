/* eslint-disable @typescript-eslint/no-unused-vars */
// "use client";

// /* eslint-disable @typescript-eslint/no-unused-expressions */
// import { useUser } from "@clerk/nextjs";
// import axios from "axios";
// import React, { useContext, useEffect, useState } from "react";
// import CourseCardItem from "./CourseCardItem";
// import { Button } from "@/components/ui/button";
// import { RefreshCw } from "lucide-react";
// import { ConrseCountContext } from "@/app/_context/ConrseCountContext";

// const CourseList = () => {
//   const { user } = useUser();
//   const [courseList, setCourseList] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const { totalCourse, setTotalCourse } = useContext(ConrseCountContext);

//   useEffect(() => {
//     user && GetCourseList();
//   }, [user]);

//   const GetCourseList = async () => {
//     setLoading(true);
//     try {
//       const result = await axios.post("/api/courses", {
//         createdBy: user?.primaryEmailAddress?.emailAddress,
//       });
//       // console.log("result course=", result.data);
//       setCourseList(result.data?.result);
//       setTotalCourse(result.data?.result?.length);
//     } catch (error) {
//       console.error("Error fetching course:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className=" mt-10">
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold">Your Study Materials</h1>
//         <Button
//           variant={"outline"}
//           className="border-blue-500 text-blue-500"
//           onClick={() => GetCourseList()}
//         >
//           <RefreshCw /> Refresh
//         </Button>
//       </div>
//       <div
//         className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-2 gap-5
//       "
//       >
//         {loading === false
//           ? courseList.map((course, index) => (
//               <CourseCardItem course={course} key={index} />
//             ))
//           : [1, 2, 3, 4, 5, 6].map((item, index) => (
//               // <div
//               //   className="h-56 w-full bg-slate-200 rounded-lg animate-pulse"
//               //   key={index}
//               // ></div>

//               <div
//                 role="status"
//                 className="flex items-center justify-center h-56 max-w-sm bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700"
//                 key={index}
//               >
//                 <span className="sr-only">Loading...</span>
//               </div>
//             ))}
//       </div>
//     </div>
//   );
// };

// export default CourseList;

"use client";

import { useUser } from "@clerk/nextjs";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import CourseCardItem from "./CourseCardItem";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { ConrseCountContext } from "@/app/_context/ConrseCountContext";

// Define a type for a Course object
interface Course {
  id: string;
  title: string;
  description?: string;
  createdAt?: string;
  // Add more properties based on your API response
}

const CourseList = () => {
  const { user } = useUser();
  const [courseList, setCourseList] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Safely use context
  const context = useContext(ConrseCountContext);
  if (!context) {
    throw new Error(
      "CourseList must be used within a ConrseCountContext.Provider"
    );
  }

  const { totalCourse, setTotalCourse } = context;

  useEffect(() => {
    if (user) {
      GetCourseList();
    }
  }, [user]);

  const GetCourseList = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/courses", {
        createdBy: user?.primaryEmailAddress?.emailAddress,
      });

      const courses: Course[] = result.data?.result ?? [];
      setCourseList(courses);
      setTotalCourse(courses.length);
    } catch (error) {
      console.error("Error fetching course:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Your Study Materials</h1>
        <Button
          variant="outline"
          className="border-blue-500 text-blue-500"
          onClick={GetCourseList}
        >
          <RefreshCw className="mr-2 h-4 w-4" /> Refresh
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-2 gap-5">
        {!loading
          ? courseList.map((course) => (
              <CourseCardItem course={course} key={course.id} />
            ))
          : Array.from({ length: 6 }).map((_, index) => (
              <div
                role="status"
                className="flex items-center justify-center h-56 max-w-sm bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700"
                key={index}
              >
                <span className="sr-only">Loading...</span>
              </div>
            ))}
      </div>
    </div>
  );
};

export default CourseList;
