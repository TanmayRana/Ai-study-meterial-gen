/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const QuizCardItem = ({ item, userSelectedOption }: any) => {
  if (!item) return null;
  console.log("item=", item);

  const [optionid, setLocalOptionId] = useState("");

  // Reset selected option when question changes
  useEffect(() => {
    setLocalOptionId("");
  }, [item.index]);

  const handleChange = (value: any) => {
    setLocalOptionId(value);
    const selectedOption = item.options.find((opt: any) => opt.id === value);
    if (selectedOption) {
      userSelectedOption(selectedOption);
    }
  };

  return (
    <div className="shadow-md rounded-lg p-5 flex flex-col border">
      <h2 className="text-2xl font-bold">{item.question}</h2>
      <div className="mt-5 space-y-3">
        <RadioGroup
          value={optionid}
          onValueChange={handleChange}
          defaultValue=""
        >
          {item.options.map((option: any, index: any) => (
            <div
              key={index}
              className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-150 ${
                optionid === option.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100"
              }`}
            >
              <RadioGroupItem
                value={option.id}
                id={option.id}
                className="peer hidden"
              />
              <Label
                htmlFor={option.id}
                className="w-full cursor-pointer flex items-center"
              >
                <span className="text-sm font-medium">{option.id}. </span>
                {option.text}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};

export default QuizCardItem;
