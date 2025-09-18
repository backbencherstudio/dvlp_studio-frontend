import { TriangleAlert } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-800 to-indigo-900">
      <div className="text-center p-8">
        <TriangleAlert
          size={64}
          className="mx-auto text-purple-100 animate-pulse"
        />
        <h1 className=" text-white mt-6">
          <span className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-l from-[#9952e1] to-[#F472B6]">
            404
          </span>
          <br />
          <span className="text-3xl font-bold">Page Not Found!</span>
        </h1>
        <p className="text-lg text-gray-200 mt-3 mb-6">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link href="/">
          <button className="w-auto py-3 px-8  border border-gray-200/30 text-white font-semibold rounded-lg hover:bg-purple-700 focus:ring-4 focus:ring-purple-300 transition duration-300 transform hover:scale-105 cursor-pointer ">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}
