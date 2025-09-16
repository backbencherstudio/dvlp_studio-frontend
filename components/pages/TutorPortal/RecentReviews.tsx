import StarIcon from "@/components/icons/StarIcon";
import React from "react";
const reviews = [
  {
    name: "Sarah J.",
    review:
      "Dr. Miller explains complex calculus concepts so clearly. My grades have improved dramatically!",
    date: "1/12/2024",
    rating: 5,
  },
  {
    name: "John D.",
    review:
      "The chemistry lessons were very engaging and easy to follow. Highly recommend Dr. Miller!",
    date: "2/3/2024",
    rating: 4,
  },
  {
    name: "Emma R.",
    review:
      "Math became much easier with Dr. Miller's approach. Still working on my grades, but it's going well!on my grades, but it's going well!on my grades, but it's going well!",
    date: "3/15/2024",
    rating: 4,
  },
  {
    name: "Mike T.",
    review:
      "Great teacher! The explanations were clear, but I wish there were more practice problems.",
    date: "4/22/2024",
    rating: 3,
  },
];
export default function RecentReviews() {
  return (
    <section className=" divide-y divide-[#E5E7EB] rounded-2xl border bg-white overflow-hidden">
      <div className="p-8 ">
        <h3 className="text-2xl font-semibold leading-8">Recent Reviews</h3>
      </div>

      {/* cards */}

      {reviews.map((review, index) => (
        <ReviewCard
          key={index}
          name={review.name}
          review={review.review}
          date={review.date}
          rating={review.rating}
        />
      ))}
    </section>
  );
}

interface ReviewCardProps {
  name: string;
  review: string;
  date: string;
  rating: string | number;
}

// ReviewCard component
const ReviewCard = ({ name, review, date, rating }: ReviewCardProps) => {
  const stars = Array(rating).fill("⭐");

  return (
    <div className="flex  justify-between bg-white p-8  ">
      <div className="flex  space-x-3 ">
        {/* Avatar/Initial */}
        <div className="w-12 h-12 bg-gray-300 rounded-xl flex items-center justify-center text-white font-semibold shrink-0">
          {name[0]}
        </div>

        {/* Name and Rating */}
        <div>
          <div className="flex gap-3  mb-3">
            <p className="font-semibold text-lg text-gray-800">{name}</p>
            <div>
              <div className="flex space-x-1 text-yellow-400">
                {stars.map((star, index) => (
                  <StarIcon key={index} className="w-5 h-5" />
                ))}
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-600 ">{review}</p>
        </div>
      </div>

      {/* Date */}
      <p className="text-xs text-gray-500 mt-2">{date}</p>
    </div>
  );
};
