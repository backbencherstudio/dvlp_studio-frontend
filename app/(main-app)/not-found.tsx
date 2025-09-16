import { TriangleAlert } from "lucide-react";
import Link from "next/link";

export default function MainAppNotFound() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center p-6 bg-white rounded-lg shadow-lg">
        <TriangleAlert size={64} className="mx-auto text-purple-600" />
        <h1 className="text-4xl font-bold text-gray-900 mt-4">
          Page Not Found
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Oops! The page you're looking for doesn't exist in the main app
          section.
        </p>
        <Link href="/main-app/home">
          <a className="mt-6 inline-block py-2 px-6 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition duration-300">
            Back to Home
          </a>
        </Link>
      </div>
    </div>
  );
}
