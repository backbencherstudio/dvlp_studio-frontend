import BookIcon from "@/components/icons/BookIcon";
import StarIcon from "@/components/icons/StarIcon";
import React from "react";

export default function StatsCard() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Total Sessions Card */}
      <InfoCard
        title="Total Sessions"
        number={347}
        gradientStart="#3B82F6"
        gradientEnd="#06B6D4"
        Icon={BookIcon}
      />

      {/* Total Earnings Card */}
      <InfoCard
        title="Total Earnings"
        number="$18,750"
        gradientStart="#34D399"
        gradientEnd="#10B981"
        Icon={StarIcon}
      />

      {/* Average Rating Card */}
      <InfoCard
        title="Average Rating"
        number="4.9"
        gradientStart="#F97316"
        gradientEnd="#EC4899"
        Icon={BookIcon}
      />
    </div>
  );
}

interface InfoCardProps {
  title: string;
  number: string | number;
  gradientStart: string;
  gradientEnd: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; // This is for passing an icon component
}

const InfoCard: React.FC<InfoCardProps> = ({
  title,
  number,
  gradientStart,
  gradientEnd,
  Icon,
}) => {
  return (
    <div className="flex items-center justify-between p-6 bg-white/80 border rounded-3xl shadow-xs">
      <div className="flex items-start space-x-4">
        {/* Icon */}
        <div
          className="p-[11px] rounded-[11px] text-white"
          style={{
            background: `linear-gradient(to right, ${gradientStart}, ${gradientEnd})`,
          }}
        >
          <Icon className="w-[22px] h-[22px]" />
        </div>

        {/* Info */}
        <div className="mt-2.5 space-y-1.5">
          <p className="text-sm text-gray-600 leading-5">{title}</p>
          <p className="text-slate-800 text-[27px] font-normal leading-9">
            {number}
          </p>
        </div>
      </div>
    </div>
  );
};
 