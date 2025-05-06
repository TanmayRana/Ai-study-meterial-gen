/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import FlashcardItem from "../../_components/FlashcardItem";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

const FlashCard = () => {
  const { courseId } = useParams();
  const router = useRouter();

  const [flashcards, setFlashcards] = useState<any[]>([]);
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(true);
  const [api, setApi] = useState<CarouselApi | undefined>();
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Fetch flashcards
  useEffect(() => {
    const GetFlashCard = async () => {
      try {
        const response = await axios.post("/api/study-type", {
          courseId,
          studyType: "flashcard",
        });
        setFlashcards(response?.data?.content || []);
      } catch (error: any) {
        console.error("Failed to fetch flashcard data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    if (courseId) GetFlashCard();
  }, [courseId]);

  // Sync selectedIndex with carousel and reset flip on slide change
  useEffect(() => {
    if (!api) return;

    const handleSelect = () => {
      setSelectedIndex(api.selectedScrollSnap());
      setIsFlipped(false); // Reset card flip when slide changes
    };

    api.on("select", handleSelect);

    return () => {
      api.off("select", handleSelect);
    };
  }, [api]);

  const handleStepClick = (index: number) => {
    api?.scrollTo(index);
  };

  const handleFlip = () => setIsFlipped((prev) => !prev);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Flashcards</h2>
      <p className="text-gray-500">
        Flashcards: The ultimate tool to lock in your study sessions.
      </p>

      {/* Progress Bar */}
      <div className="flex gap-5 items-center my-4">
        <div className="flex flex-1 items-center gap-1">
          {flashcards.map((_, index) => (
            <div
              key={index}
              className={`h-2 flex-1 rounded-full cursor-pointer transition-all ${
                index === selectedIndex
                  ? "bg-blue-600"
                  : index < selectedIndex
                  ? "bg-blue-400"
                  : "bg-gray-200"
              }`}
              onClick={() => handleStepClick(index)}
            />
          ))}
        </div>
      </div>

      {/* Flashcards */}
      {loading ? (
        <p className="text-center mt-10">Loading flashcards...</p>
      ) : flashcards.length === 0 ? (
        <p className="text-center mt-10 text-gray-600">No flashcards found.</p>
      ) : (
        <div className="flex items-center justify-center mt-10">
          <Carousel className="w-full max-w-xl" setApi={setApi}>
            <CarouselContent>
              {flashcards.map((item, index) => (
                <CarouselItem key={index}>
                  <FlashcardItem
                    data={item}
                    isFlipped={isFlipped}
                    handleClick={handleFlip}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="cursor-pointer" />
            <CarouselNext className="cursor-pointer" />
          </Carousel>
        </div>
      )}

      {/* End message */}
      {!loading &&
        flashcards.length > 0 &&
        selectedIndex === flashcards.length - 1 && (
          <div className="flex items-center gap-4 flex-col justify-center mt-10">
            <h2>🎉 End of Flashcards</h2>
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
    </div>
  );
};

export default FlashCard;
