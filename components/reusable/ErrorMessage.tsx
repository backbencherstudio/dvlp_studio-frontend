// components/ErrorMessage.tsx
import React from "react";

interface ErrorMessageProps {
  error?: { message?: string };
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  if (!error?.message) return null;

  return (
    <p className="mt-2 text-[13px] text-red-500/80">
      {error.message}
    </p>
  );
};

export default ErrorMessage;
