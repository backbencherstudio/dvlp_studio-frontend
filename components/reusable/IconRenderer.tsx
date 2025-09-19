import React from "react";

interface IconRendererProps {
  icon: React.ElementType | React.ReactElement;
  className?: string;
}

export function IconRenderer({ icon, className }: IconRendererProps) {
  // If it's already a React element → render directly
  if (React.isValidElement(icon)) {
    return icon;
  }

  // Otherwise assume it's a component → render with className
  const Icon = icon as React.ElementType;
  return <Icon className={className} />;
}
