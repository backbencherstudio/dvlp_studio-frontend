import Link from "next/link";
import React from "react";

export default function PendingApplication({ applications }: any) {
  console.log("Pending Applications", applications);
  return (
    <div>
      <div className="bg-white rounded-lg  border border-gray-200 p-4">
        <div className=" border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Pending Tutor Applications
          </h2>
        </div>
        <div className="">
          <div className="space-y-4">
            {applications.map((application: any, index: number) => (
              <div
                key={index}
                className="flex justify-between items-start  border  [background:rgba(246,248,250,0.50)] px-4 py-3 rounded-xl border-solid border-[#ECEFF3]"
              >
                <div className="flex justify-between items-center w-full">
                  <div className="">
                    <h4 className="font-medium text-gray-900 text-sm mb-1">
                      {application.name}
                    </h4>
                    <p className="text-sm text-blue-600 mb-1">
                      {application.subject}
                    </p>
                    <p className="text-xs text-gray-500">
                      Submitted: {application.submitted}
                    </p>
                  </div>
                <Link href={`/admin-dashboard/tutors/${application.id}`}>
                  <button className="px-3 py-1 text-xs font-medium text-purple-600 hover:bg-purple-50 rounded border border-purple-200 cursor-pointer">
                    View Details
                  </button></Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
