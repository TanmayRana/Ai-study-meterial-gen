// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import React, { useState } from "react";

// const SelectOption = ({ selectedStudyType }: any) => {
//   const Options = [
//     {
//       name: "Exam",
//       icon: "/",
//     },
//     {
//       name: "Job interview",
//       icon: "/",
//     },
//     {
//       name: "Practice",
//       icon: "/",
//     },
//     {
//       name: "Coding",
//       icon: "/",
//     },
//     {
//       name: "Others",
//       icon: "/",
//     },
//   ];

//   const [selectedOption, setSelectedOption] = useState();

//   return (
//     <div>
//       <h2 className="text-center mb-2 text-lg ">
//         For Which you want to create your personal study material?
//       </h2>
//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-5  gap-5 ">
//         {Options.map((option, index) => (
//           <div
//             className={`p-4 flex flex-col items-center justify-center border rounded-xl hover:border-blue-500
//             cursor-pointer transition-all duration-200 ease-linear
//             ${option.name === selectedOption && "border-blue-500"}
//             `}
//             key={index}
//             onClick={() => {
//               setSelectedOption(option.name);
//               selectedStudyType(option.name);
//             }}
//           >
//             {/* TODO:let's add image */}
//             {/* <Image src={option.icon} alt={option.name} width={50} height={50} /> */}
//             <h2 className="text-center text-sm mt-2">{option.name}</h2>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SelectOption;

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";

interface Props {
  selectedStudyType: (type: string) => void;
}

const SelectOption: React.FC<Props> = ({ selectedStudyType }) => {
  const Options = [
    {
      name: "Exam",
      icon: "/", // Replace with actual icon path
    },
    {
      name: "Job interview",
      icon: "/", // Replace with actual icon path
    },
    {
      name: "Practice",
      icon: "/", // Replace with actual icon path
    },
    {
      name: "Coding",
      icon: "/", // Replace with actual icon path
    },
    {
      name: "Others",
      icon: "/", // Replace with actual icon path
    },
  ];

  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  return (
    <div>
      <h2 className="text-center mb-2 text-lg">
        For which purpose do you want to create your personal study material?
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-5 gap-5">
        {Options.map((option, index) => (
          <div
            className={`p-4 flex flex-col items-center justify-center border rounded-xl hover:border-blue-500
              cursor-pointer transition-all duration-200 ease-linear
              ${option.name === selectedOption && "border-blue-500"}
            `}
            key={index}
            onClick={() => {
              setSelectedOption(option.name);
              selectedStudyType(option.name);
            }}
          >
            {/* TODO: Add image */}
            {/* <Image src={option.icon} alt={option.name} width={50} height={50} /> */}
            <h2 className="text-center text-sm mt-2">{option.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectOption;
