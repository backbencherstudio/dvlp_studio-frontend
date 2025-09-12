"use client";
import SparkIcon from "@/components/icons/SparkIcon";
import React from "react";
import Accordion from "./Accordion";

const faqItems = [
  {
    question: "How do I book a tutoring session?",
    answer: "You can book a session through our website or app.",
  },
  {
    question: "What subjects do you offer tutoring for?",
    answer: "We offer tutoring in Math, Science, English, and more.",
  },
  {
    question: "Do you offer both online and in-person tutoring?",
    answer: "Yes, we offer both online and in-person sessions.",
  },
  {
    question: "How are your tutors qualified?",
    answer:
      "Our tutors are highly qualified with degrees in their respective fields.",
  },
  {
    question: "What if I'm not satisfied with my session?",
    answer:
      "We offer a satisfaction guarantee and will work to resolve any issues.",
  },
  {
    question: "How far in advance do I need to book?",
    answer: "It's best to book at least 24 hours in advance.",
  },
];

export default function FAQSection() {
  return (
    <section className="lg:py-[128px] md:py-25 sm:py-20 py-15">
      <div
        className="max-w-[896px] md:px-8 px-4 mx-auto "
      >
        {/* title */}
        <div className="mb-[80px]  space-y-4.5 flex flex-col items-center  ">
          <div className="inline-flex items-center gap-2 [background:linear-gradient(90deg,#DBEAFE_0%,#CFFAFE_100%)] px-6 py-3 rounded-full">
            <span className="w-4 h-4 text-[#2563EB]">
              <SparkIcon />
            </span>
            <span className="text-sm font-semibold leading-5 text-[#1E40AF]">
              FAQ
            </span>
          </div>

          <h2 className="max-w-[598.213px] text-center text-6xl font-black text-[#1E293B]">
            <span>Frequently Asked </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2563EB] to-[#0891B2]">
              Questions
            </span>
          </h2>

          <p className="text-xl font-normal leading-7 text-[#4B5563] text-center">
            Find answers to common questions about our tutoring services
          </p>
        </div>

        {/* Timeline */}
        <Accordion items={faqItems} />
      </div>
    </section>
  );
}
