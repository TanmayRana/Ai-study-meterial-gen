// "use client";

// import React, { useState } from "react";
// import SelectOption from "./_components/SelectOption";
// import { Button } from "@/components/ui/button";
// import TopicInput from "./_components/TopicInput";

// const Create = () => {
//   const [step, setStep] = useState(0);
//   const [formData, setFormData] = useState([]);

//   const handleUserInput = (fielName, fielValue) => {
//     console.log(fielName, fielValue);
//     setFormData((prevData) => ({
//       ...prevData,
//       [fielName]: fielValue,
//     }));
//     console.log(formData);
//   };

//   const handleNext = () => {
//     setStep(step + 1);
//   };

//   const handlePrevious = () => {
//     setStep(step - 1);
//   };

//   return (
//     <div className="flex flex-col items-center p-5 md:px-24 lg:px-36 mt-20">
//       <h2 className="font-bold text-4xl text-blue-600">
//         Start Building Your Study Material
//       </h2>
//       <p className="text-gray-500 text-lg">
//         Fill all details in order to create your study material.
//       </p>
//       <div className="mt-10">
//         {step === 0 ? (
//           <SelectOption
//             selectedStudyType={(value) => handleUserInput("studyType", value)}
//           />
//         ) : (
//           <TopicInput
//             SetTopic={(value) => handleUserInput("topic", value)}
//             setDiffcultyLevel={(value) =>
//               handleUserInput("difficultyLevel", value)
//             }
//           />
//         )}
//         {/* Add more steps here as needed */}
//       </div>

//       <div className="flex justify-between w-full mt-32">
//         {step !== 0 && (
//           <Button variant="outline" onClick={handlePrevious}>
//             Previous
//           </Button>
//         )}
//         {step === 0 ? (
//           <Button className="bg-blue-500 text-white" onClick={handleNext}>
//             Next
//           </Button>
//         ) : (
//           <Button>Generate</Button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Create;

"use client";

import React, { useState } from "react";
import SelectOption from "./_components/SelectOption";
import { Button } from "@/components/ui/button";
import TopicInput from "./_components/TopicInput";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type FormData = {
  studyType?: string;
  topic?: string;
  difficultyLevel?: string;
};

const Create = () => {
  const [step, setStep] = useState<number>(0);
  const [formData, setFormData] = useState<FormData>({});
  const { user } = useUser();

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUserInput = (fieldName: keyof FormData, fieldValue: string) => {
    // console.log(fieldName, fieldValue);
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: fieldValue,
    }));
  };
  // console.log("formData", formData);

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setStep((prev) => prev - 1);
  };

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const courseId = uuidv4();
      const data = {
        ...formData,
        courseId,
        createdBy: user?.primaryEmailAddress?.emailAddress,
      };
      await axios.post("/api/ai-model/generate-course-outline", {
        formData: data,
      });
      // console.log("client response=", result.data);
      router.replace("/dashboard");
      toast("Your course content is generated, Click on Refresh Button");
    } catch (error) {
      console.error("Error generating course outline:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-5 md:px-24 lg:px-36 mt-20">
      <h2 className="font-bold text-4xl text-blue-600">
        Start Building Your Study Material
      </h2>
      <p className="text-gray-500 text-lg">
        Fill all details in order to create your study material.
      </p>
      <div className="mt-10">
        {step === 0 ? (
          <SelectOption
            selectedStudyType={(value: string) =>
              handleUserInput("studyType", value)
            }
          />
        ) : (
          <TopicInput
            SetTopic={(value: string) => handleUserInput("topic", value)}
            setDiffcultyLevel={(value: string) =>
              handleUserInput("difficultyLevel", value)
            }
          />
        )}
      </div>

      <div className="flex justify-between w-full mt-32">
        {step !== 0 && (
          <Button variant="outline" onClick={handlePrevious}>
            Previous
          </Button>
        )}
        {step === 0 ? (
          <Button className="bg-blue-500 text-white" onClick={handleNext}>
            Next
          </Button>
        ) : (
          <Button onClick={() => handleGenerate()} disabled={loading}>
            {loading ? <Loader className="animate-spin" /> : "Generate"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Create;
