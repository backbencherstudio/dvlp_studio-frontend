"use client";

import BookIcon from "@/components/icons/BookIcon";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import StarIcon from "@/components/icons/StarIcon";

type TestmonialProps = {
  id: string | number;
  text: string;
  name: string;
  role: string;
  grade: string;
};

const testimonials: TestmonialProps[] = [
  {
    id: 1,
    text: "My tutor made math fun and engaging. Now I actually look forward to solving problems!",
    name: "David Kim",
    role: "Middle School Student",
    grade: "C+ to A- Average",
  },
  {
    id: 2,
    text: "The tutor helped me understand concepts step by step. I gained a lot of confidence in school.",
    name: "Sophia",
    role: "High School Student",
    grade: "B to A Average",
  },
  {
    id: 3,
    text: "My tutor made math fun and engaging. Now I actually look forward to solving problems!",
    name: "David",
    role: "Middle School Student",
    grade: "C+ to A- Average",
  },
  {
    id: 4,
    text: "The tutor helped me understand concepts step by step. I gained a lot of confidence in school.",
    name: "Lee",
    role: "High School Student",
    grade: "B to A Average",
  },
  {
    id: 5,
    text: "My tutor made math fun and engaging. Now I actually look forward to solving problems!",
    name: "Kim",
    role: "Middle School Student",
    grade: "C+ to A- Average",
  },
  {
    id: 6,
    text: "The tutor helped me understand concepts step by step. I gained a lot of confidence in school.",
    name: "Sophia Lee",
    role: "High School Student",
    grade: "B to A Average",
  },
];

export default function SuccessStory() {
  return (
    <section className="relative  inset-0 shrink-0 bg-gradient-to-r from-[#581C87] via-[#1E3A8A] to-[#0F172A] ">
      {/* content */}
      <div className="max-w-[1280px] mx-auto py-[128px] px-16 ">
        {/* heading */}
        <div>
          <div className="flex items-center justify-center mb-3">
            <div className="inline-flex justify-center items-center gap-2  px-6 py-3 rounded-full bg-white/10 border border-white/20">
              <BookIcon className="text-[#F472B6] w-4 h-4" />
              <span className="text-[#FFFFFF] text-center font-arial text-sm font-bold leading-5">
                Student Success Stories
              </span>
            </div>
          </div>

          <h2 className="max-w-[729.34px] mx-auto flex flex-col justify-center items-center text-center text-6xl font-black leading-tight text-white mb-[68px]">
            Real Results,{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#F472B6] to-[#C084FC]">
              Real Impact
            </span>
          </h2>
        </div>

        {/* slider */}
        <div>
          <TestimonialsSlider />
        </div>
      </div>

      {/* gradient blobs */}
      <div className="w-64 h-64 shrink-0 bg-[#003466] opacity-20 blur-[32px] rounded-full absolute top-20 left-20" />
      <div className="w-80 h-80 shrink-0 bg-[#3B82F6] opacity-20 blur-[32px] rounded-full absolute bottom-20 right-20" />
    </section>
  );
}

const TestimonialCard = ({ text, name, role, grade }: TestmonialProps) => {
  return (
    <div className="w-auto h-[367px] shrink-0 border [background:rgba(255,255,255,0.10)] backdrop-blur-[2px] rounded-3xl border-solid border-[rgba(255,255,255,0.20)] p-12">
      <div className="flex items-center justify-center mb-[30px]">
        <div className="flex gap-1 ">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="text-[#FACC15]">
              <StarIcon />
            </span>
          ))}
        </div>
      </div>
      <p className="text-2xl font-normal leading-[39px] mb-[38px] text-white">
        "{text}"
      </p>
      <div className="flex items-center gap-3">
        <div className="w-16 h-16 rounded-full border border-gray-500 flex items-center justify-center">
          {/* Avatar Placeholder */}
        </div>
        <div>
          <h4 className="text-lg font-bold leading-7 text-white">{name}</h4>
          <p className="leading-6 text-gray-300">{role}</p>
          <p className="text-sm font-bold leading-5 text-green-400">{grade}</p>
        </div>
      </div>
    </div>
  );
};

const TestimonialsSlider = () => {
  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      spaceBetween={18} // Reduced gap between slides
      slidesPerView={2}
      pagination={{ clickable: true }}
      loop={true}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      breakpoints={{
        1024: { slidesPerView: 2 },
        0: { slidesPerView: 1 },
      }}
      className="!pb-15 "
    >
      {testimonials.map((item) => (
        <SwiperSlide key={item.id}>
          <TestimonialCard {...item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
