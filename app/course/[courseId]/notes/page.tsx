// "use client";

// import axios from "axios";
// import { useParams } from "next/navigation";
// import React, { useEffect, useState } from "react";

// const ViewNotes = () => {
//   const { courseId } = useParams();

//   const [notes, setNotes] = useState();

//   useEffect(() => {
//     GetNotes();
//   }, []);

//   const GetNotes = async () => {
//     const res = await axios.post(`/api/study-type`, {
//       courseId: courseId,
//       studyType: "notes",
//     });
//     console.log("res=", res.data);
//     setNotes(res.data);
//   };
//   return (
//     <div>
//       <div className="flex gap-5 items-center">
//         {notes.map((note, index) => {
//           <div className={`w-full h-2 rounded-full`} key={index}></div>;
//         })}
//       </div>
//     </div>
//   );
// };

// export default ViewNotes;

// "use client";

// import { Button } from "@/components/ui/button";
// import axios from "axios";
// import { ArrowLeft, ArrowRight } from "lucide-react";
// import { useParams } from "next/navigation";
// import React, { useEffect, useState } from "react";

// const ViewNotes = () => {
//   const { courseId } = useParams();
//   const [notes, setNotes] = useState([]);
//   const [stepCount, setStepCount] = useState(0);

//   useEffect(() => {
//     GetNotes();
//   }, []);

//   const GetNotes = async () => {
//     try {
//       const res = await axios.post(`/api/study-type`, {
//         courseId: courseId,
//         studyType: "notes",
//       });
//       console.log("res=", res.data);
//       setNotes(res.data);
//     } catch (error) {
//       console.error("Error fetching notes:", error);
//     }
//   };

//   return (
//     notes && (
//       <div>
//         <div className="flex gap-5 items-center">
//           {stepCount !== 0 && (
//             <Button
//               variant={"outline"}
//               size={"sm"}
//               className="flex gap-1 cursor-pointer"
//               onClick={() => setStepCount(stepCount - 1)}
//             >
//               <ArrowLeft />
//               Previous
//             </Button>
//           )}
//           {notes?.map((note, index) => (
//             <div
//               className={`w-full h-2 rounded-full ${
//                 index < stepCount ? "bg-blue-500 " : "bg-gray-200"
//               }`}
//               key={index}
//             ></div>
//           ))}
//           <Button
//             variant={"outline"}
//             size={"sm"}
//             className="flex gap-1 cursor-pointer"
//             onClick={() => setStepCount(stepCount + 1)}
//           >
//             Next
//             <ArrowRight />
//           </Button>
//         </div>
//         <div className="mt-10">
//           <div dangerouslySetInnerHTML={{ __html: notes[stepCount]?.notes }} />
//         </div>
//       </div>
//     )
//   );
// };

// export default ViewNotes;

// "use client";

// import { Button } from "@/components/ui/button";
// import axios from "axios";
// import { ArrowLeft, ArrowRight } from "lucide-react";
// import { useParams, useRouter } from "next/navigation";
// import React, { useEffect, useState } from "react";

// const ViewNotes = () => {
//   const { courseId } = useParams();
//   const [notes, setNotes] = useState([]);
//   const [stepCount, setStepCount] = useState(0);
//   const router = useRouter();

//   useEffect(() => {
//     GetNotes();
//   }, []);

//   const GetNotes = async () => {
//     try {
//       const res = await axios.post(`/api/study-type`, {
//         courseId: courseId,
//         studyType: "notes",
//       });
//       console.log("res=", res.data);
//       setNotes(res.data);
//     } catch (error) {
//       console.error("Error fetching notes:", error);
//     }
//   };

//   return (
//     notes && (
//       <div>
//         <div className="flex gap-5 items-center">
//           {stepCount !== 0 && (
//             <Button
//               variant={"outline"}
//               size={"sm"}
//               className="flex gap-1 cursor-pointer"
//               onClick={() => setStepCount(stepCount - 1)}
//             >
//               <ArrowLeft />
//               Previous
//             </Button>
//           )}
//           {notes?.map((note, index) => (
//             <div
//               className={`w-full h-2 rounded-full cursor-pointer ${
//                 index <= stepCount ? "bg-blue-500" : "bg-gray-200"
//               }`}
//               key={index}
//               onClick={() => setStepCount(index)}
//             ></div>
//           ))}

//           <Button
//             variant={"outline"}
//             size={"sm"}
//             className="flex gap-1 cursor-pointer"
//             onClick={() => setStepCount(stepCount + 1)}
//           >
//             Next
//             <ArrowRight />
//           </Button>
//         </div>

//         <div className="mt-10 prose max-w-none">
//           <div
//             dangerouslySetInnerHTML={{ __html: notes[stepCount]?.notes }}
//             className="prose-code-styled"
//           />

//           {notes?.length === stepCount && (
//             <div className="flex items-center gap-10 flex-col justify-center">
//               <h2 className="">End of Notes</h2>
//               <Button
//                 variant={"outline"}
//                 size={"sm"}
//                 onClick={() => router.back()}
//               >
//                 Go to Course Page
//               </Button>
//             </div>
//           )}
//         </div>

//         <style jsx global>{`
//           .prose-code-styled pre {
//             background-color: #1e293b; /* slate-800 */
//             color: #f8fafc; /* slate-50 */
//             padding: 1rem;
//             border-radius: 0.5rem;
//             overflow-x: auto;
//           }

//           // .prose-code-styled code {
//           //   background-color: #1e293b;
//           //   color: #f8fafc;
//           //   padding: 0.25rem 0.5rem;
//           //   border-radius: 0.25rem;
//           // }
//         `}</style>
//       </div>
//     )
//   );
// };

// export default ViewNotes;

"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type Note = {
  id: string;
  notes: string;
  title?: string;
};

const ViewNotes = () => {
  const { courseId } = useParams();
  const [notes, setNotes] = useState<Note[]>([]);
  const [stepCount, setStepCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    GetNotes();
  }, []);

  const GetNotes = async () => {
    try {
      const res = await axios.post(`/api/study-type`, {
        courseId: courseId,
        studyType: "notes",
      });
      console.log("res=", res.data);
      setNotes(res.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  console.log("Notes=", notes);

  return (
    notes &&
    notes.length > 0 && (
      <div>
        <div className="flex gap-5 items-center my-4">
          {stepCount !== 0 && (
            <Button
              variant={"outline"}
              size={"sm"}
              className="flex gap-1 cursor-pointer"
              onClick={() => setStepCount(stepCount - 1)}
            >
              <ArrowLeft />
              Previous
            </Button>
          )}

          <div className="flex flex-1 items-center gap-1">
            {notes.map((_, index) => (
              <div
                key={index}
                className={`h-2 flex-1 rounded-full cursor-pointer ${
                  index === stepCount
                    ? "bg-blue-600"
                    : index < stepCount
                    ? "bg-blue-400"
                    : "bg-gray-200"
                }`}
                onClick={() => setStepCount(index)}
              ></div>
            ))}
          </div>

          <Button
            variant={"outline"}
            size={"sm"}
            className="flex gap-1 cursor-pointer"
            onClick={() => {
              if (stepCount < notes.length - 1) {
                setStepCount(stepCount + 1);
              }
            }}
            disabled={stepCount >= notes.length - 1}
          >
            Next
            <ArrowRight />
          </Button>
        </div>
        <div className="mt-10 mb-10 prose max-w-none">
          <div
            dangerouslySetInnerHTML={{ __html: notes[stepCount]?.notes }}
            className="prose-code-styled"
          />

          {stepCount === notes.length - 1 && (
            <div className="flex items-center gap-10 flex-col justify-center mt-10">
              <h2 className="">🎉 End of Notes</h2>
              <Button
                variant={"outline"}
                size={"sm"}
                onClick={() => router.back()}
                className="cursor-pointer"
              >
                Go to Course Page
              </Button>
            </div>
          )}
        </div>

        <style jsx global>{`
          .prose-code-styled pre {
            background-color: #1e293b; /* slate-800 */
            color: #f8fafc; /* slate-50 */
            padding: 1rem;
            border-radius: 0.5rem;
            overflow-x: auto;
          }

          // .prose-code-styled code {
          //   background-color: #1e293b;
          //   color: #f8fafc;
          //   padding: 0.25rem 0.5rem;
          //   border-radius: 0.25rem;
          // }
        `}</style>
      </div>
    )
  );
};

export default ViewNotes;
