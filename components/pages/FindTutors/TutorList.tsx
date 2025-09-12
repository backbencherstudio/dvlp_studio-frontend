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

const TutorList = () => {
  // State to store filter values
  const [filters, setFilters] = useState({
    subject: "",
    sessionType: "",
    gradeLevel: "",
    priceRange: "",
    rating: "",
  });

  // Define the Tutor type
interface TutorProps  {
  name: string;
  rating: number;
  reviews: number;
  sessionsCompleted: number;
  hourlyRate: string;
  subjects: string[]; // Array of strings
  intro: string;
  location: string;
  grades: string;
  availability: string;
  sessionTypes: string[]; // Array of session types like "Virtual" or "In-person"
};
  const fakeTutors: TutorProps[] = [
    {
      name: "Dr. Jessica Miller",
      rating: 4.9,
      reviews: 127,
      sessionsCompleted: 350,
      hourlyRate: "$50-$75/hr",
      subjects: ["Mathematics", "Algebra", "Calculus"],
      intro:
        "PhD in Mathematics with 15+ years of teaching experience. Specializes in making complex concepts simple and engaging.",
      location: "New York, NY",
      grades: "Grades 9-12, College",
      availability: "Today",
      sessionTypes: ["Virtual", "In-person"],
    },
    {
      name: "Prof. David Kim",
      rating: 4.8,
      reviews: 98,
      sessionsCompleted: 280,
      hourlyRate: "$45-$65/hr",
      subjects: ["Physics", "Chemistry", "Biology"],
      intro:
        "Former university professor with expertise in STEM subjects. Passionate about helping students discover their love for science.",
      location: "Virtual Only",
      grades: "Grades 6-12",
      availability: "Tomorrow",
      sessionTypes: ["Virtual"],
    },
    {
      name: "Ms. Rachel Adams",
      rating: 5.0,
      reviews: 156,
      sessionsCompleted: 420,
      hourlyRate: "$40-$60/hr",
      subjects: ["English", "Literature", "Writing"],
      intro:
        "Master's in English Literature. Helps students develop strong writing skills and critical thinking abilities.",
      location: "Los Angeles, CA",
      grades: "Grades K-12",
      availability: "Today",
      sessionTypes: ["In-person"],
    },
    {
      name: "Dr. Michael Torres",
      rating: 4.7,
      reviews: 89,
      sessionsCompleted: 195,
      hourlyRate: "$35-$55/hr",
      subjects: ["Spanish", "French", "ESL"],
      intro:
        "Native Spanish speaker with PhD in Linguistics. Makes language learning fun and culturally immersive.",
      location: "Miami, FL",
      grades: "Grades 6-12, College",
      availability: "Monday",
      sessionTypes: ["Virtual", "In-person"],
    },
  ];

  // State to store the tutors' data
  const [tutors, setTutors] = useState([]);

  // API call to fetch tutors based on filters
  const fetchTutors = async () => {
    const response = await fetch("/api/tutors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filters),
    });
    const data = await response.json();
    setTutors(data);
  };

  // Fetch tutors when filters are updated
  useEffect(() => {
    fetchTutors();
  }, [filters]);

  const handleFilterChange = (e: any) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

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
                <p className="text-gray-600 leading-6">Showing 6 of 6 tutors</p>
              </div>
              <button className="bg-white/50 py-3  rounded-3xl pl-[20.66px] pr-[32.67px] backdrop-blur-[2px] border-gray-300">
                Sort by Rating
              </button>
            </div>

            {/* all tutors */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-8 gap-4 place-items-center p-4">
              {fakeTutors.map((tutor, index) => (
                <TutorCard key={index} tutor={tutor} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TutorList;

type TutorProps = {
  name: string;
  rating: number;
  reviews: number;
  sessionsCompleted: number;
  hourlyRate: string;
  subjects: string[];
  intro: string;
  location: string;
  grades: string;
  availability: string;
  sessionTypes: string[];
};

const TutorCard = ({ tutor }: { tutor: TutorProps }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-5 max-w-[436px] flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start mb-6">
          {/* Info */}
          <div className="flex">
            <div className="bg-gray-300 rounded-2xl w-16 h-16 md:w-20 md:h-20 mr-5 shrink-0"></div>
            <div>
              <h2 className="text-xl font-bold mb-2">{tutor.name}</h2>
              <div className="text-sm text-yellow-500 mt-1">
                <span>★</span>{" "}
                <span className="text-black font-medium text-sm leading-5">
                  {tutor.rating}
                </span>{" "}
                <span className="text-sm text-gray-500">
                  ({tutor.reviews} reviews)
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {tutor.sessionsCompleted} sessions completed
              </p>
            </div>
          </div>

          {/* Hourly Rate */}
          <h3 className="text-xl font-bold leading-7 text-[#6366F1] text-nowrap">
            {tutor.hourlyRate}
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
          {tutor.intro}
        </p>

        <div className="text-sm text-gray-600 flex items-center justify-between">
          <p className="flex gap-1 items-center">
            <MapPin className="w-4 h-4" />
            <span>{tutor.location}</span>
          </p>

          <p className="flex gap-1 items-center">
            <Clock4 className="w-4 h-4" /> <span>{tutor.grades}</span>
          </p>
        </div>

        <div className="flex gap-2 mt-4">
          {tutor.sessionTypes.map((type: string, index: number) => (
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
          Next availability: {tutor.availability}
        </p>
      </div>

      <div className="mt-5 flex justify-between gap-3">
        {/* <button className="bg-gradient-to-r from-indigo-600 to-purple-500 text-white px-5 py-2 rounded-xl hover:opacity-80 w-[60%] cursor-pointer">
          Book Session
        </button> */}
        <BookingFlow tutor={tutor}/>
        <button className="border border-gray-300 text-gray-700 px-5 py-3.5 rounded-xl font-medium hover:opacity-80 w-[40%] cursor-pointer">
          View Profile
        </button>
      </div>
    </div>
  );
};
