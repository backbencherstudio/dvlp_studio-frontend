import React from "react";

interface ErrorStateProps {
  message?: string;
  width?: string;
  height?: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({
  message = "Something went wrong!",
  width = "w-full",
  height = "h-[200px]",
}) => {
  return (
    <div
      className={`flex flex-col justify-center items-center ${width} ${height} bg-purple-50 border border-purple-200 rounded-lg`}
    >
      <div className="flex flex-col items-center space-y-2 text-center px-4">
        <span className="text-purple-600 text-4xl">⚠️</span>
        <p className="text-red-600 font-semibold text-lg">{message}</p>
      </div>
    </div>
  );
};

export default ErrorState;
