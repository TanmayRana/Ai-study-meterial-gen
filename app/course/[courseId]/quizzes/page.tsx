/* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import axios from "axios";
// import { useParams } from "next/navigation";
// import React, { useEffect, useState } from "react";
// import QuizCardItem from "./_components/QuizCardItem";
// import { Button } from "@/components/ui/button";
// import { AlertCircle, CircleCheck, Loader2 } from "lucide-react";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// const Quizzes = () => {
//   const { courseId } = useParams();
//   const [quizData, setQuizData] = useState<any[]>([]);
//   const [currentStep, setCurrentStep] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [correctAns, setCorrectAns] = useState<null | boolean>(null);
//   const [isCorrectAnswer, setIsCorrectAnswer] = useState();

//   useEffect(() => {
//     const GetQuiz = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.post("/api/study-type", {
//           courseId,
//           studyType: "quiz",
//         });
//         setQuizData(response.data.content || []);
//       } catch (error: any) {
//         console.error("Failed to fetch quiz data:", error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (courseId) GetQuiz();
//   }, [courseId]);

//   const handleStepChange = (index: number) => {
//     setCurrentStep(index);
//     setCorrectAns(null);
//   };

//   const handleNext = () => {
//     if (currentStep < quizData.length - 1) {
//       setCurrentStep((prev) => prev + 1);
//       setCorrectAns(null);
//     }
//   };

//   const handlePrev = () => {
//     if (currentStep > 0) {
//       setCurrentStep((prev) => prev - 1);
//       setCorrectAns(null);
//     }
//   };

//   const handleOptionChange = (option: any, item: any) => {
//     const isCorrect = option.id === item.correctAnswerId;
//     setIsCorrectAnswer(option);
//     setCorrectAns(isCorrect);
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold">Quizzes</h2>
//       <p className="text-gray-500 mb-4">
//         Quizzes: The ultimate tool to lock in your study sessions.
//       </p>

//       {loading ? (
//         <div className="flex justify-center items-center h-40">
//           <Loader2 className="animate-spin" />
//         </div>
//       ) : quizData.length === 0 ? (
//         <div className="text-center text-gray-500">No quizzes found.</div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-[100px_1fr] gap-5">
//           {/* Sidebar Buttons */}
//           <div className="flex md:flex-col flex-row gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
//             {quizData.map((_, index) => (
//               <Button
//                 key={index}
//                 variant={index === currentStep ? "default" : "outline"}
//                 size="sm"
//                 onClick={() => handleStepChange(index)}
//                 className="whitespace-nowrap cursor-pointer"
//               >
//                 Q{index + 1}
//               </Button>
//             ))}
//           </div>

//           {/* Quiz Display */}
//           <div className="col-span-1">
//             <QuizCardItem
//               item={quizData[currentStep]}
//               userSelectedOption={(value) => {
//                 handleOptionChange(value, quizData[currentStep]);
//               }}
//             />

//             <div className="flex justify-between mt-6">
//               <Button
//                 onClick={handlePrev}
//                 disabled={currentStep === 0}
//                 variant="secondary"
//               >
//                 Previous
//               </Button>
//               <Button
//                 onClick={handleNext}
//                 disabled={currentStep === quizData.length - 1}
//               >
//                 Next
//               </Button>
//             </div>

//             {/* Answer Feedback */}
//             {correctAns === true && (
//               <div className="mt-4">
//                 <Alert className="border-blue-500 bg-blue-50 text-blue-800">
//                   <CircleCheck className="h-4 w-4 text-blue-500" />
//                   <AlertTitle>Congratulations!</AlertTitle>
//                   <AlertDescription>
//                     You answered the quiz question correctly.
//                   </AlertDescription>
//                 </Alert>
//               </div>
//             )}

//             {correctAns === false && (
//               <div className="mt-4">
//                 <Alert
//                   variant="destructive"
//                   className="border-red-500 bg-red-50 text-red-800"
//                 >
//                   <AlertCircle className="h-4 w-4 text-red-500" />
//                   <AlertTitle>Try Again!</AlertTitle>
//                   <AlertDescription>
//                     Your answer is incorrect. Give it another shot! The correct
//                     answer is: `{isCorrectAnswer?.id} . {isCorrectAnswer?.text}`
//                   </AlertDescription>
//                 </Alert>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Quizzes;

// "use client";

// import axios from "axios";
// import { useParams } from "next/navigation";
// import React, { useEffect, useState } from "react";
// import QuizCardItem from "./_components/QuizCardItem";
// import { Button } from "@/components/ui/button";
// import { AlertCircle, CircleCheck, Loader2 } from "lucide-react";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// const Quizzes = () => {
//   const { courseId } = useParams();
//   const [quizData, setQuizData] = useState<any[]>([]);
//   const [currentStep, setCurrentStep] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [correctAns, setCorrectAns] = useState<null | boolean>(null);
//   const [correctAnswer, setCorrectAnswer] = useState<any>(null);

//   useEffect(() => {
//     const GetQuiz = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.post("/api/study-type", {
//           courseId,
//           studyType: "quiz",
//         });
//         setQuizData(response.data.content || []);
//       } catch (error: any) {
//         console.error("Failed to fetch quiz data:", error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (courseId) GetQuiz();
//   }, [courseId]);

//   const handleStepChange = (index: number) => {
//     setCurrentStep(index);
//     setCorrectAns(null);
//     setCorrectAnswer(null);
//   };

//   const handleNext = () => {
//     if (currentStep < quizData.length - 1) {
//       setCurrentStep((prev) => prev + 1);
//       setCorrectAns(null);
//       setCorrectAnswer(null);
//     }
//   };

//   const handlePrev = () => {
//     if (currentStep > 0) {
//       setCurrentStep((prev) => prev - 1);
//       setCorrectAns(null);
//       setCorrectAnswer(null);
//     }
//   };

//   const handleOptionChange = (selectedOption: any, item: any) => {
//     const isCorrect = selectedOption.id === item.correctAnswerId;
//     const correct = item.options.find(
//       (opt: any) => opt.id === item.correctAnswerId
//     );

//     setCorrectAnswer(correct);
//     setCorrectAns(isCorrect);
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold">Quizzes</h2>
//       <p className="text-gray-500 mb-4">
//         Quizzes: The ultimate tool to lock in your study sessions.
//       </p>

//       {loading ? (
//         <div className="flex justify-center items-center h-40">
//           <Loader2 className="animate-spin" />
//         </div>
//       ) : quizData.length === 0 ? (
//         <div className="text-center text-gray-500">No quizzes found.</div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-[100px_1fr] gap-5">
//           {/* Sidebar Buttons */}
//           <div className="flex md:flex-col flex-row gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
//             {quizData.map((_, index) => (
//               <Button
//                 key={index}
//                 variant={index === currentStep ? "default" : "outline"}
//                 size="sm"
//                 onClick={() => handleStepChange(index)}
//                 className="whitespace-nowrap cursor-pointer"
//               >
//                 Q{index + 1}
//               </Button>
//             ))}
//           </div>

//           {/* Quiz Display */}
//           <div className="col-span-1">
//             <QuizCardItem
//               item={quizData[currentStep]}
//               userSelectedOption={(value) =>
//                 handleOptionChange(value, quizData[currentStep])
//               }
//             />

//             <div className="flex justify-between mt-6">
//               <Button
//                 onClick={handlePrev}
//                 disabled={currentStep === 0}
//                 variant="secondary"
//               >
//                 Previous
//               </Button>
//               <Button
//                 onClick={handleNext}
//                 disabled={currentStep === quizData.length - 1}
//               >
//                 Next
//               </Button>
//             </div>

//             {/* Answer Feedback */}
//             {correctAns === true && (
//               <div className="mt-4">
//                 <Alert className="border-blue-500 bg-blue-50 text-blue-800">
//                   <CircleCheck className="h-4 w-4 text-blue-500" />
//                   <AlertTitle>Congratulations!</AlertTitle>
//                   <AlertDescription>
//                     You answered the quiz question correctly.
//                   </AlertDescription>
//                 </Alert>
//               </div>
//             )}

//             {correctAns === false && correctAnswer && (
//               <div className="mt-4">
//                 <Alert
//                   variant="destructive"
//                   className="border-red-500 bg-red-50 text-red-800"
//                 >
//                   <AlertCircle className="h-4 w-4 text-red-500" />
//                   <AlertTitle>Try Again!</AlertTitle>
//                   <AlertDescription>
//                     Your answer is incorrect. Give it another shot! <br />
//                     <span className="font-semibold">
//                       Correct answer: {correctAnswer.id}. {correctAnswer.text}
//                     </span>
//                   </AlertDescription>
//                 </Alert>
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {!loading &&
//         quizData.length > 0 &&
//         selectedIndex === quizData.length - 1 && (
//           <div className="flex items-center gap-4 flex-col justify-center mt-10">
//             <h2>🎉 End of Flashcards</h2>
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={() => router.back()}
//               className="cursor-pointer"
//             >
//               Go to Course Page
//             </Button>
//           </div>
//         )}
//     </div>
//   );
// };

// export default Quizzes;

"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import QuizCardItem from "./_components/QuizCardItem";
import { Button } from "@/components/ui/button";
import { AlertCircle, CircleCheck, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Quizzes = () => {
  const { courseId } = useParams();
  const router = useRouter();

  const [quizData, setQuizData] = useState<any[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [correctAns, setCorrectAns] = useState<null | boolean>(null);
  const [correctAnswer, setCorrectAnswer] = useState<any>(null);

  useEffect(() => {
    const GetQuiz = async () => {
      setLoading(true);
      try {
        const response = await axios.post("/api/study-type", {
          courseId,
          studyType: "quiz",
        });
        setQuizData(response.data.content || []);
      } catch (error: any) {
        console.error("Failed to fetch quiz data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    if (courseId) GetQuiz();
  }, [courseId]);

  const handleStepChange = (index: number) => {
    setCurrentStep(index);
    setCorrectAns(null);
    setCorrectAnswer(null);
  };

  const handleNext = () => {
    if (currentStep < quizData.length - 1) {
      setCurrentStep((prev) => prev + 1);
      setCorrectAns(null);
      setCorrectAnswer(null);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      setCorrectAns(null);
      setCorrectAnswer(null);
    }
  };

  const handleOptionChange = (selectedOption: any, item: any) => {
    const isCorrect = selectedOption.id === item.correctAnswerId;
    const correct = item.options.find(
      (opt: any) => opt.id === item.correctAnswerId
    );

    setCorrectAnswer(correct);
    setCorrectAns(isCorrect);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Quizzes</h2>
      <p className="text-gray-500 mb-4">
        Quizzes: The ultimate tool to lock in your study sessions.
      </p>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="animate-spin" />
        </div>
      ) : quizData.length === 0 ? (
        <div className="text-center text-gray-500">No quizzes found.</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-[100px_1fr] gap-5">
            {/* Sidebar Buttons */}
            <div className="flex md:flex-col flex-row gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
              {quizData.map((_, index) => (
                <Button
                  key={index}
                  variant={index === currentStep ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleStepChange(index)}
                  className="whitespace-nowrap cursor-pointer"
                >
                  Q{index + 1}
                </Button>
              ))}
            </div>

            {/* Quiz Display */}
            <div className="col-span-1">
              <QuizCardItem
                item={quizData[currentStep]}
                userSelectedOption={(value: any) =>
                  handleOptionChange(value, quizData[currentStep])
                }
              />

              <div className="flex justify-between mt-6">
                <Button
                  onClick={handlePrev}
                  disabled={currentStep === 0}
                  variant="secondary"
                >
                  Previous
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={currentStep === quizData.length - 1}
                >
                  Next
                </Button>
              </div>

              {/* Answer Feedback */}
              {correctAns === true && (
                <div className="mt-4">
                  <Alert className="border-blue-500 bg-blue-50 text-blue-800">
                    <CircleCheck className="h-4 w-4 text-blue-500" />
                    <AlertTitle>Congratulations!</AlertTitle>
                    <AlertDescription>
                      You answered the quiz question correctly.
                    </AlertDescription>
                  </Alert>
                </div>
              )}

              {correctAns === false && correctAnswer && (
                <div className="mt-4">
                  <Alert
                    variant="destructive"
                    className="border-red-500 bg-red-50 text-red-800"
                  >
                    <AlertCircle className="h-4 w-4 text-red-500" />
                    <AlertTitle>Try Again!</AlertTitle>
                    <AlertDescription>
                      Your answer is incorrect. Give it another shot! <br />
                      <span className="font-semibold">
                        Correct answer: {correctAnswer.id}. {correctAnswer.text}
                      </span>
                    </AlertDescription>
                  </Alert>
                </div>
              )}
            </div>
          </div>

          {/* End Message */}
          {currentStep === quizData.length - 1 && (
            <div className="flex items-center gap-4 flex-col justify-center mt-10">
              <h2>🎉 End of Quizzes</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.back()}
                className="cursor-pointer"
              >
                Go to Course Page
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Quizzes;
