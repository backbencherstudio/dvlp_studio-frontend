import React from "react";
import StatsCard, { CardProps } from "../StatsCard";

interface StatsCardSectionProps {
  data: CardProps[];
}

export default function StatsCardSection({ data }: StatsCardSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {data.map((item, index) => (
        <StatsCard key={index} card={item} />
      ))}
    </div>
  );
}