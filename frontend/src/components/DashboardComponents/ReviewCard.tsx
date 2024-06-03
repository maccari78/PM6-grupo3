import { ReviewCardProps } from "@/interfaces/dashboard";
import React from "react";

const ReviewCard: React.FC<ReviewCardProps> = ({ rating, text }) => {
  return (
    <>
      <div className="bg-gray-100 p-4 rounded-lg shadow">
        <div className="flex items-center">
          <span className="text-yellow-500">{rating}</span>
          <span className="ml-2 text-sm text-gray-100">{text}</span>
        </div>
      </div>
    </>
  );
};

export default ReviewCard;
