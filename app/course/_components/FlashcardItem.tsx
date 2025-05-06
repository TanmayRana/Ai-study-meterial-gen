import React from "react";
import ReactCardFlip from "react-card-flip";

const FlashcardItem = ({ isFlipped, handleClick, data }) => {
  return (
    <div className="flex items-center justify-center">
      <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
        <div
          className="p-4 bg-blue-500 text-white flex items-center justify-center rounded-lg cursor-pointer h-[250px] w-[200px]
        md:h-[350px] md:w-[300px]  shadow-lg
        hover:shadow-xl transition-shadow duration-300 ease-in-out border
        "
          onClick={handleClick}
        >
          <h2 className="">{data.front}</h2>
        </div>

        <div
          className="p-4 bg-white shadow-lg border text-blue-500 flex items-center justify-center rounded-lg cursor-pointer h-[250px] w-[200px]
        md:h-[350px] md:w-[300px] lg:h-[400px] lg:w-[350px]
        "
          onClick={handleClick}
        >
          <h2 className="">{data.back}</h2>
        </div>
      </ReactCardFlip>
    </div>
  );
};

export default FlashcardItem;
