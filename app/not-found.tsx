// Importing the warning icon from Lucide
import { TriangleAlert } from 'lucide-react';
import Link from 'next/link'; // Next.js Link for navigation

export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center p-6 bg-white rounded-lg shadow-lg">
        <TriangleAlert size={64} className="mx-auto text-purple-600" />
        <h1 className="text-4xl font-bold text-gray-900 mt-4">Page Not Found</h1>
        <p className="text-lg text-gray-600 mt-2">Oops! The page you're looking for doesn't exist.</p>
        <Link href="/">
          <button className="mt-6 inline-block py-2 px-6 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition duration-300">
            Back to Homee
          </button>
        </Link>
      </div>
    </div>
  );
}
