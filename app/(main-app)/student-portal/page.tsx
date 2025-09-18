"use client";

import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function StudentPortalPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      redirect("/student-portal/bookings"); // Trigger the redirect after a delay
      setLoading(false);
    }, 1000); // Delay for 1 second before redirecting

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="">
      {loading ? (
        <div className="spinner">
          <div className="flex flex-col items-center justify-center  bg-gray-100 ">
            <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-6 animate-pulse">
              <h2 className="text-2xl font-bold mb-6">Upcoming Sessions</h2>
              <div className="bg-gray-200 rounded-xl p-4 flex items-center space-x-4">
                {/* Icon Placeholder */}
                <div className="w-16 h-16 bg-gray-300 rounded-xl"></div>
                <div className="flex-1 space-y-2">
                  {/* Title and subtitle placeholders */}
                  <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  {/* Date and time placeholders */}
                  <div className="h-4 bg-gray-300 rounded w-24"></div>
                  <div className="h-4 bg-gray-300 rounded w-20"></div>
                </div>
              </div>
              <div className="mt-4 flex space-x-2">
                {/* Button placeholders */}
                <div className="h-10 bg-gray-300 rounded-lg w-32"></div>
                <div className="h-10 bg-gray-300 rounded-lg w-32"></div>
                <div className="h-10 bg-gray-300 rounded-lg w-24"></div>
              </div>
            </div>
          </div>
        </div> // Custom loading indicator
      ) : null}
    </div>
  );
}
