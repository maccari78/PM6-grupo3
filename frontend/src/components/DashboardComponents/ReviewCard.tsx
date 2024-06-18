import { ReviewCardProps } from "@/interfaces/dashboard";
import React from "react";

const ReviewCard: React.FC<ReviewCardProps> = ({
  rating,
  comment,
  createdAt,
}) => {
  const fullStar = "★";
  const emptyStar = "☆";
  const maxStars = 5;

  const stars = fullStar.repeat(rating) + emptyStar.repeat(maxStars - rating);
  return (
    <>
      <div className="bg-[#2d2d2d] p-4 rounded-lg shadow my-2">
        <div className="mb-2">
          <span className=" text-amber-600">{stars}</span>
        </div>
        <p className="text-gray-300 text-sm">{comment}</p>
        <p className="text-gray-500 text-xs mt-2">
          {new Date(createdAt).toLocaleDateString()}
        </p>
      </div>
    </>
  );
};

export default ReviewCard;
