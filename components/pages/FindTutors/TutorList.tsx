"use client";

import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Clock4, MapPin, User, Video } from "lucide-react";
import BookingFlow from "./BookingFlow";
import { useQuery } from "@tanstack/react-query";
import { privateAxios, publicAxios } from "@/lib/axios";
import { Tulpen_One } from "next/font/google";
import { format } from "date-fns";

// Define the Tutor type
interface TutorProps {
  username: string;
  avatar: string | null; // Allowing 'null' as avatar can be null
  about_me: string;
  country: string | null; // Country can also be null
  city: string;
  subjects: string[];
  modes: string[];
  priceRange: string;
  nextAvailability: string; // ISO 8601 string representation of the date
  grades: string;
  rating: number;
  reviews: number;
  sessionsCompleted: number;
}

const fetchTutors = async () => {
  const res = await publicAxios.get("/teacher/all-sessions");
  return res.data?.teacherIds;
};

const TutorList = () => {
  const {
    data: tutorList,
    isPending,
    isError,
    error,
  } = useQuery<TutorProps[], Error>({
    queryKey: ["tutor"],
    queryFn: fetchTutors,
  });

  // State to store filter values
  const [filters, setFilters] = useState({
    subject: "",
    sessionType: "",
    gradeLevel: "",
    priceRange: "",
    rating: "",
  });

  //
  const handleFilterChange = (e: any) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  console.log("Data", tutorList);

  // if (isPending) {
  //   return <div>Loading...</div>;
  // }

  // if (isError) {
  //   return <div className="text-red-500">Error: {error?.message}</div>;
  // }

  return (
    <section className="[background:linear-gradient(135deg,#F8FAFC_0%,#EFF6FF_100%)] py-16">
      <div className="max-w-[1216px] mx-auto  ">
        <div className="flex flex-col md:flex-row md:gap-8 gap-4">
          {/* Filters Sidebar */}
          <div className="w-full md:w-[280px] bg-white/80  rounded-3xl shadow-xs border-white/50 p-8 max-h-[560px]">
            <h3 className="text-2xl font-bold mb-6 leading-8 text-slate-800 ">
              Filters
            </h3>

            <div className="mb-5">
              <label className="text-sm font-medium leading-5 text-gray-700">
                Subject
              </label>
              <Select
                value={filters.subject}
                onValueChange={(value) =>
                  handleFilterChange({ target: { name: "subject", value } })
                }
              >
                <SelectTrigger className="w-full border-gray-300 rounded-md pl-[20px] py-[12px] focus:ring-0 focus:outline-0">
                  <SelectValue placeholder="All Subjects" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={" "}>All Subjects</SelectItem>
                  <SelectItem value="Math">Math</SelectItem>
                  <SelectItem value="Science">Science</SelectItem>
                  <SelectItem value="English">English</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mb-5">
              <label className="text-sm font-medium leading-5 text-gray-700">
                Session Type
              </label>
              <Select
                value={filters.sessionType}
                onValueChange={(value) =>
                  handleFilterChange({ target: { name: "sessionType", value } })
                }
              >
                <SelectTrigger className="w-full border-gray-300 rounded-md pl-[20px] py-[12px] focus:ring-0 focus:outline-0">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={" "}>All Types</SelectItem>
                  <SelectItem value="virtual">Virtual</SelectItem>
                  <SelectItem value="in-person">In-person</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mb-5">
              <label className="text-sm font-medium leading-5 text-gray-700">
                Price Range
              </label>
              <Select
                value={filters.priceRange}
                onValueChange={(value) =>
                  handleFilterChange({ target: { name: "priceRange", value } })
                }
              >
                <SelectTrigger className="w-full border-gray-300 rounded-md pl-[20px] py-[12px] focus:ring-0 focus:outline-0">
                  <SelectValue placeholder="All Prices" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value=" ">All Prices</SelectItem>
                  <SelectItem value="$30-$50">$30-$50</SelectItem>
                  <SelectItem value="$50-$75">$50-$75</SelectItem>
                  <SelectItem value="$75+">$75+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mb-5">
              <label className="text-sm font-medium leading-5 text-gray-700">
                Minimum Rating
              </label>
              <Select
                value={filters.rating}
                onValueChange={(value) =>
                  handleFilterChange({ target: { name: "rating", value } })
                }
              >
                <SelectTrigger className="w-full border-gray-300 rounded-md pl-[20px] py-[12px] focus:ring-0 focus:outline-0">
                  <SelectValue placeholder="All Rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value=" ">All Rating</SelectItem>
                  <SelectItem value="5">5 Stars</SelectItem>
                  <SelectItem value="4">4 and above</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mb-5">
              <label className="text-sm font-medium leading-5 text-gray-700">
                Grade Level
              </label>
              <Select
                value={filters.gradeLevel}
                onValueChange={(value) =>
                  handleFilterChange({ target: { name: "gradeLevel", value } })
                }
              >
                <SelectTrigger className="w-full border-gray-300 rounded-md pl-[20px] py-[12px] focus:ring-0 focus:outline-0">
                  <SelectValue placeholder="All Levels" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value=" ">All Levels</SelectItem>
                  <SelectItem value="a-level">A level</SelectItem>
                  <SelectItem value="o-level">O level</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <button
              onClick={fetchTutors}
              className="backdrop-blur-[2px] px-[21px] py-[13px] rounded-xl bg-[#F6F8FA] w-full font-semibold text-[#070707] leading-[19.33px]"
            >
              Apply Filter
            </button>
          </div>

          {/* Available Tutors List */}
          <div className="">
            <div className="flex justify-between items-center mb-6 px-4 md:px-0">
              <div>
                <h2 className="text-2xl font-bold">Available Tutors</h2>
                <p className="text-gray-600 leading-6">
                  Showing 6 of {tutorList?.length} tutors
                </p>
              </div>
              <button className="bg-white/50 py-3  rounded-3xl pl-[20.66px] pr-[32.67px] backdrop-blur-[2px] border-gray-300">
                Sort by Rating
              </button>
            </div>

            {/* all tutors */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-8 gap-4 place-items-center p-4">
              {isPending ? (
                <>
                  <TutorLoaderCard />
                  <TutorLoaderCard />
                  <TutorLoaderCard />
                  <TutorLoaderCard />
                </>
              ) : (
                tutors?.map((tutor, index) => (
                  <TutorCard key={index} tutor={tutor} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TutorList;

const TutorCard = ({ tutor }: { tutor: TutorProps }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-5 max-w-[436px] flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start mb-6">
          {/* Info */}
          <div className="flex">
            <div className="bg-gray-300 rounded-2xl w-16 h-16 md:w-20 md:h-20 mr-5 shrink-0 overflow-hidden">
              <img className="w-full h-full object-cover" src={tutor.avatar || ""} alt={tutor.username} />
            </div>
            <div>
              <h2 className="text-xl font-bold mb-2">{tutor.username}</h2>
              <div className="text-sm text-yellow-500 mt-1">
                <span>★</span>{" "}
                <span className="text-black font-medium text-sm leading-5">
                  {tutor?.rating}
                </span>{" "}
                <span className="text-sm text-gray-500">
                  ({tutor.reviews} reviews)
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {tutor?.sessionsCompleted} sessions completed
              </p>
            </div>
          </div>

          {/* Hourly Rate */}
          <h3 className="text-xl font-bold leading-7 text-[#6366F1] text-nowrap">
            {tutor.priceRange}
          </h3>
        </div>

        {/* Subjects */}
        <div className="mb-4">
          <p className="text-gray-700 text-sm font-medium mb-2">Subjects:</p>

          <div className="flex flex-wrap gap-2">
            {tutor.subjects.map((subject: string, index: number) => (
              <span
                key={index}
                className="bg-[#EEF2FF] text-[#4338CA] px-3 py-1.5 rounded-full text-sm font-medium"
              >
                {subject}
              </span>
            ))}
          </div>
        </div>

        {/* Intro */}
        <p className="text-sm font-normal leading-[22.75px] text-gray-600 mb-4">
          {tutor.about_me}
        </p>

        <div className="text-sm text-gray-600 flex items-center justify-between">
          <p className="flex gap-1 items-center">
            <MapPin className="w-4 h-4" />
            <span>{tutor.country || "N / A"}</span>
          </p>

          <p className="flex gap-1 items-center">
            <Clock4 className="w-4 h-4" /> Grade: <span>{tutor.grades}</span>
          </p>
        </div>

        <div className="flex gap-2 mt-4">
          {tutor?.modes.map((type: string, index: number) => (
            <div
              key={index}
              className={`flex items-center gap-1 ${
                type === "Virtual"
                  ? "bg-[#EFF6FF] text-[#1D4ED8]"
                  : "bg-[#F0FDF4] text-[#15803D]"
              } px-3 py-1 rounded-full`}
            >
              <Video className="w-3 h-3" />
              <span className="text-sm font-medium">{type}</span>
            </div>
          ))}
        </div>

        <p className="text-sm text-green-500 mt-4 font-medium">
          Next availability:{"   "}
          {tutor?.nextAvailability
            ? format(new Date(tutor.nextAvailability), "MMM dd, yyyy h:mm a")
            : "N/A"}
        </p>
      </div>

      <div className="mt-5 flex justify-between gap-3">
        <BookingFlow tutor={tutor} />
        {/* <div className="border w-full"> hi</div> */}
        <button className="border border-gray-300 text-gray-700 px-5 py-3.5 rounded-xl font-medium hover:opacity-80 text-nowrap cursor-pointer ">
          View Profile
        </button>
      </div>
    </div>
  );
};

function TutorLoaderCard() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-[486px] flex flex-col justify-between">
      <div className="flex justify-between items-start mb-6">
        <div className="flex">
          <div className="bg-gray-300 rounded-2xl w-16 h-16 md:w-20 md:h-20 mr-5 shrink-0 animate-pulse"></div>
          <div>
            <div className="bg-gray-300 w-32 h-6 mb-2 animate-pulse"></div>
            <div className="bg-gray-300 w-24 h-4 mb-4 animate-pulse"></div>
          </div>
        </div>
        <div className="bg-gray-300 w-20 h-6 animate-pulse"></div>
      </div>

      {/* Subjects */}
      <div className="mb-4">
        <div className="bg-gray-300 w-24 h-4 mb-2 animate-pulse"></div>
        <div className="flex flex-wrap gap-2">
          <div className="bg-gray-300 w-24 h-6 rounded-full animate-pulse"></div>
          <div className="bg-gray-300 w-24 h-6 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Intro */}
      <div className="bg-gray-300 w-full h-4 mb-4 animate-pulse"></div>

      {/* Location and Grades */}
      <div className="flex gap-2 mt-4">
        <div className="bg-gray-300 w-24 h-4 animate-pulse"></div>
        <div className="bg-gray-300 w-24 h-4 animate-pulse"></div>
      </div>

      {/* Availability */}
      <div className="bg-gray-300 w-32 h-4 mt-4 animate-pulse"></div>

      {/* Button */}
      <div className="mt-5 flex justify-between gap-3">
        <div className="bg-gray-300 w-32 h-8 rounded-xl animate-pulse"></div>
        <div className="bg-gray-300 w-32 h-8 rounded-xl animate-pulse"></div>
      </div>
    </div>
  );
}










const tutors: TutorProps[] = [
  {
    username: "sarah_j",
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
    about_me: "Passionate English tutor with 5+ years of experience helping students improve writing and speaking skills.",
    country: "USA",
    city: "New York",
    subjects: ["English", "Literature", "Creative Writing"],
    modes: ["Online", "In-Person"],
    priceRange: "$20 - $30/hr",
    nextAvailability: "2025-10-05T10:00:00Z",
    grades: "6-12",
    rating: 4.8,
    reviews: 120,
    sessionsCompleted: 540,
  },
  {
    username: "ahmed_math",
    avatar: null, // No avatar
    about_me: "Mathematics specialist focusing on algebra, calculus, and SAT preparation. I make math simple and fun!",
    country: "Egypt",
    city: "Cairo",
    subjects: ["Mathematics", "Algebra", "Calculus"],
    modes: ["Online"],
    priceRange: "$15 - $25/hr",
    nextAvailability: "2025-10-07T14:00:00Z",
    grades: "9-12",
    rating: 4.6,
    reviews: 85,
    sessionsCompleted: 310,
  },
  {
    username: "maria_sci",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    about_me: "Science tutor with expertise in biology and chemistry. Love to engage students with experiments and real-world examples.",
    country: "Spain",
    city: "Madrid",
    subjects: ["Biology", "Chemistry"],
    modes: ["In-Person"],
    priceRange: "$18 - $28/hr",
    nextAvailability: "2025-10-06T09:30:00Z",
    grades: "7-10",
    rating: 4.9,
    reviews: 150,
    sessionsCompleted: 600,
  },
  {
    username: "john_coding",
    avatar: "https://randomuser.me/api/portraits/men/18.jpg",
    about_me: "Software developer and tutor with a focus on teaching Python, JavaScript, and web development.",
    country: "UK",
    city: "London",
    subjects: ["Python", "JavaScript", "Web Development"],
    modes: ["Online", "In-Person"],
    priceRange: "$25 - $40/hr",
    nextAvailability: "2025-10-08T16:00:00Z",
    grades: "College/University",
    rating: 4.7,
    reviews: 95,
    sessionsCompleted: 420,
  },
];
