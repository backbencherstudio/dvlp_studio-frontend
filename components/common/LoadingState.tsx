import React from "react";

interface LoadingStateProps {
  message?: string;
  count?: number; // number of shimmer lines
  width?: string; // Tailwind width class
  height?: string; // Tailwind height class
}

const LoadingState: React.FC<LoadingStateProps> = ({
  message = "Loading...",
  count = 3,
  width = "w-full",
  height = "h-[400px]",
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center ${width} ${height} bg-gray-50 border border-gray-200 rounded-lg py-4`}
    >
      {/* Spinner */}
      <div className="w-12 h-12 border-4 border-y-transparent border-purple-500 rounded-full animate-spin " />

      {/* Message */}
      <p className="text-purple-600 font-medium mt-3">{message}</p>

      {/* Shimmer lines */}
      {/* <div className="w-full max-w-md space-y-3 mt-4 px-4">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="w-full h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse
                       dark:from-gray-700 dark:via-gray-600 dark:to-gray-700"
          />
        ))}
      </div> */}
    </div>
  );
};

export default LoadingState;
