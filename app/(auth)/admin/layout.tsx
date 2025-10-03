import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className=" absolute inset-0 bg-gradient-to-r bg-white text-black">
      {children}
    </div>
  );
}
