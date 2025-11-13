"use client";

import ErrorState from "@/components/common/ErrorState";
import LoadingState from "@/components/common/LoadingState";
import { useTutorApplicationActions } from "@/components/dashboard/Tutors/useApplication";
import Breadcrumb from "@/components/reusable/Breadcrumb";
import { Button } from "@/components/ui/button";
import { privateAxios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const getApplicationDetails = async (aid: string) => {
  const res = await privateAxios.get(`/tutor/application/${aid}`);
  return res.data;
};

export default function ApplicatonDeatailsPage() {
  const params = useParams();
  // const { aid } = params;
  const aid = params.aid as string;

  const {
    data: applicationData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["tutor-applications"],
    queryFn: () => getApplicationDetails(aid),
  });
  const { approveMutation, rejectMutation } = useTutorApplicationActions();

  const handleActionClick = (action: string) => {
    console.log(action, "adfsd");
    // do your API calls or logic here
    if (action === "approve") {
      // approveMutation.mutate(rowData.application_id);
      approveMutation.mutate(aid);
    } else if (action === "reject") {
      // rejectMutation.mutate(rowData.application_id);
      rejectMutation.mutate(aid);
    }
  };

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState />;

  console.log(applicationData);

  return (
    <div>
      <Breadcrumb customLabel="Application Details" />

      <div className="p-4 md:p-6 bg-white rounded-lg">
        <div className=" mb-4 flex flex-wrap justify-between items-center">
          <h3 className="text-lg font-medium leading-[160%] tracking-[0.1px]">
            Application Details
          </h3>
          {applicationData?.data?.is_accepted === "pending" ? (
            <div className=" space-x-2">
              <Button
                onClick={() => handleActionClick("approve")}
                className=" cursor-pointer"
              >
                Approve
              </Button>
              <Button
                onClick={() => handleActionClick("reject")}
                className=" cursor-pointer"
                variant="destructive"
              >
                Reject
              </Button>
            </div>
          ) : (
            <>
            </>
          )}
        </div>
        <div>
          {applicationData && (
            <pre>{JSON.stringify(applicationData, null, 2)}</pre>
          )}
        </div>

        {/* Basic informaiton */}
        <div className="border py-5 rounded-lg divide-y divide-gray-200 space-y-6 mt-6">
          <div className="px-6 ">
            <h4 className="text-md font-medium mb-4">Basic Information</h4>
          </div>
          <div className="px-6">
            <InfoRow label="Name" value={`${applicationData.data.name}`} />
            <InfoRow
              label="Email"
              value={applicationData.data.email || "N/A"}
            />
            {/* <InfoRow label="Phone" value={applicationData.data.phone || "N/A"} /> */}
          </div>
        </div>
        {/* Professionals informaiton */}
        <div className="border py-5 rounded-lg divide-y divide-gray-200 space-y-6 mt-6">
          <div className="px-6 ">
            <h4 className="text-md font-medium mb-4">
              Professional Information
            </h4>
          </div>
          <div className="px-6">
            <InfoRow
              label="Highest Education Level:"
              value={`${applicationData.data.name}`}
            />
            <InfoRow
              label="Teaching Experience"
              value={applicationData.data.teching_experience || "N/A"}
            />
            <InfoRow
              label="Teaching Subjects"
              value={applicationData.data.phone || "N/A"}
            />
            <InfoRow
              label="Desired Hourly Rate ($)"
              value={applicationData.data.hourly_rate}
            />
            <InfoRow
              label="Location/City"
              value={
                ` ${applicationData.data.city} , ${applicationData.data.country ?? "N/A"} ` ||
                "N/A"
              }
            />
          </div>
        </div>
        {/* Others informaiton */}
        <div className="border py-5 rounded-lg divide-y divide-gray-200 space-y-6 mt-6">
          <div className="px-6 ">
            <h4 className="text-md font-medium mb-4">Basic Information</h4>
          </div>
          <div className="px-6">
            <InfoRow
              label="About Info"
              value={`${applicationData.data.name}`}
            />
            <div className="flex py-2">
              <div className="w-1/3 text-gray-500 font-medium">
                {/* Label column: fixed width (w-1/3) and medium gray text (text-gray-500) */}
                Resume/CV:
              </div>
              <div className="w-2/3 text-gray-800">
                {/* Value column: remaining width (w-2/3) and darker text (text-gray-800) */}
              </div>
            </div>

            <CertificateDisplay
              certificateUrl={applicationData?.data?.certifications_urls}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Component to display a single information row
const InfoRow: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <div className="flex py-2">
    <div className="w-1/3 text-gray-500 font-medium">
      {/* Label column: fixed width (w-1/3) and medium gray text (text-gray-500) */}
      {label}:
    </div>
    <div className="w-2/3 text-gray-800">
      {/* Value column: remaining width (w-2/3) and darker text (text-gray-800) */}
      {value}
    </div>
  </div>
);

const getFileType = (url: string): "image" | "pdf" | "unknown" => {
  // Check if url is actually a string
  if (typeof url !== "string") return "unknown";

  // Use a regular expression to find the file extension at the end of the string
  const match = url.match(/\.([a-z0-9]+)$/i);
  if (!match) return "unknown";

  const extension = match[1].toLowerCase();

  if (["jpeg", "jpg", "png", "gif", "webp", "svg"].includes(extension)) {
    return "image";
  } else if (extension === "pdf") {
    return "pdf";
  }
  return "unknown";
};

interface CertificateDisplayProps {
  certificateUrl: string | string[] | undefined;
}

const CertificateDisplay: React.FC<CertificateDisplayProps> = ({
  certificateUrl,
}) => {
  // Handle undefined or null
  if (!certificateUrl) {
    return (
      <div className="mx-auto bg-white space-y-4">
        <p className="text-gray-500">No certificate available</p>
      </div>
    );
  }

  // Handle array of URLs
  if (Array.isArray(certificateUrl)) {
    return (
      <div className="mx-auto bg-white space-y-6">
        {certificateUrl.map((url, index) => (
          <CertificateItem key={index} url={url} />
        ))}
      </div>
    );
  }

  // Handle single URL
  return <CertificateItem url={certificateUrl} />;
};

// Helper component for individual certificate items
const CertificateItem: React.FC<{ url: string }> = ({ url }) => {
  const fileType = getFileType(url);

  const isImage = fileType === "image";
  const isPdf = fileType === "pdf";

  return (
    <div className="bg-white space-y-4">
      {/* 🖼️ Conditional Rendering Logic */}
      {isImage && (
        <div className="">
          <img
            src={url}
            alt="Certification Document"
            className="w-full h-auto rounded-md object-cover"
            onError={(e) => {
              // Fallback if image fails to load
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
            }}
          />
        </div>
      )}

      {isPdf && (
        <div className="space-y-3">
          <p className="text-sm text-gray-600">Document Type: PDF</p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.707-8.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L5.414 12H17a1 1 0 100-2H5.414l2.293-2.293z"
                clipRule="evenodd"
              />
            </svg>
            Download / View PDF
          </a>
        </div>
      )}

      {fileType === "unknown" && (
        <div className="space-y-3">
          <p className="text-sm text-gray-600">Document Type: Unknown</p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            Download File
          </a>
        </div>
      )}
    </div>
  );
};
