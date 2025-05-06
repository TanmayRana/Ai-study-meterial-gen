/* eslint-disable @typescript-eslint/no-explicit-any */
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TopicInput = ({ SetTopic, setDiffcultyLevel }: any) => {
  return (
    <div className="w-full mt-10 flex flex-col">
      <h2 className="">
        Enter Topic or paster the content for your study material
      </h2>
      <Textarea
        placeholder="Enter Topic.... "
        className="w-full mt-5"
        onChange={(e) => {
          SetTopic(e.target.value);
        }}
      />

      <h2 className="mt-5 mb-3">Select the difficulty level</h2>
      <Select onValueChange={(value) => setDiffcultyLevel(value)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Difficulty level" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="easy">Easy</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="hard">Hard</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default TopicInput;
