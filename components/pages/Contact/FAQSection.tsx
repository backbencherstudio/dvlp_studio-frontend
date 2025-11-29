"use client";
import SparkIcon from "@/components/icons/SparkIcon";
import React from "react";
import Accordion from "./Accordion";

export default function FAQSection() {
const TutorTag = () => (
  <span className="ml-2 px-2 py-0.5 text-[10px] font-semibold bg-blue-100 text-blue-600 rounded">
    Tutor Only
  </span>
);

const faqItems = [
  {
    question: (
      <>
        How do I book a tutoring session?
      </>
    ),
    answer: (
      <div className="space-y-2">
        <p>You can book a session through our website in four steps:</p>
        <ul className="list-decimal ml-6 space-y-1">
          <li>Input your needs</li>
          <li>Choose your tutor</li>
          <li>Choose a time slot</li>
          <li>Send a request to your tutor</li>
        </ul>
      </div>
    ),
  },
  {
    question: "What subjects do you offer tutoring for?",
    answer: (
      <p>
       Please refer to the Subjects Catalog to find all of the services currently being offered on Evolve. The catalog is constantly being updated. If you don't see your desired subject, you can sign up to be alerted once it is added to the catalog.
      </p>
    ),
  },
  {
    question: "Do you offer both online and in-person tutoring?",
    answer: <p>Yes, we offer both online and in-person sessions.</p>,
  },
  {
    question: "How are your tutors qualified?",
    answer: (
      <p>
        Our tutors go through a thorough vetting process. They need to show a
        high level of proficiency in the subjects they want to teach by passing an
        advanced exam. They are also required to pass a thorough background check
        before they are allowed on the platform.
      </p>
    ),
  },
  {
    question: "What if I'm not satisfied with my session?",
    answer: (
      <p>
        We offer a satisfaction guarantee and will work with you to resolve any
        issues or find a better match.
      </p>
    ),
  },
  {
    question: "How far in advance do I need to book?",
    answer: (
      <div className="space-y-3">
        <p>
          The earlier the better. You can book up to{" "}
          <strong>1 hour before the session</strong>. However, if you send any
          requests after <strong>11AM on the day of the session</strong>, you
          forfeit your free cancellation window.
        </p>

        <p>We recommend booking recurring sessions in advance for two reasons:</p>

        <ul className="list-disc ml-6 space-y-1">
          <li>You secure your time slot with the tutor you love</li>
          <li>You get a discounted price</li>
        </ul>
      </div>
    ),
  },

  // ----------------------------------------
  // 🚀 Tutor-Only Questions
  // ----------------------------------------

  {
    question: (
      <p className="w-full flex items-center justify-between">
        How much will I get paid? <TutorTag />
      </p>
    ),
    answer: (
      <p>
        You set your own rates. We believe you should earn what you are worth, so
        we leave that up to you!
      </p>
    ),
  },
  {
    question: (
     <p className="w-full flex items-center justify-between">
        What are the qualifications to become a tutor? <TutorTag />
      </p>
    ),
    answer: (
      <p>
        You must show proof of identity, pass a proficiency exam for any subject
        you wish to teach, and pass a background check.
      </p>
    ),
  },
  {
    question: (
      <p className="w-full flex items-center justify-between">
        How soon can I start working? <TutorTag />
      </p>
    ),
    answer: (
      <p>
        As soon as your results are confirmed for your proficiency test and
        background check, you can begin accepting session requests.
      </p>
    ),
  },
  {
    question: (
      <p className="w-full flex items-center justify-between">
        What are my responsibilities as a tutor? <TutorTag />
      </p>
    ),
    answer: (
      <ul className="list-disc ml-6 space-y-1">
        <li>Guide students to better understand the topics they bring</li>
        <li>Encourage students to continue learning outside sessions</li>
        <li>Promote self-discipline to help students stay on track</li>
        <li>
          Help students persevere through challenges to build confidence
        </li>
        <li>
          Develop personalized action plans based on learning styles
        </li>
        <li>Practice patience and provide supportive instruction</li>
      </ul>
    ),
  },
];

  return (
    <section id="faq" className="lg:py-[128px] md:py-25 sm:py-20 py-15">
      <div className="max-w-[896px] md:px-8 px-4 mx-auto">
        {/* Section Header */}
        <div className="mb-[80px] space-y-4.5 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 [background:linear-gradient(90deg,#DBEAFE_0%,#CFFAFE_100%)] px-6 py-3 rounded-full">
            <span className="w-4 h-4 text-[#2563EB]">
              <SparkIcon />
            </span>
            <span className="text-sm font-semibold leading-5 text-[#1E40AF]">
              FAQ
            </span>
          </div>

          <h2 className="max-w-[598px] text-center text-4xl md:text-6xl font-black text-[#1E293B] leading-12 md:leading-20">
            <span>Frequently Asked </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2563EB] to-[#0891B2]">
              Questions
            </span>
          </h2>

          <p className="text-xl font-normal leading-7 text-[#4B5563] text-center">
            Find answers to common questions about our tutoring services
          </p>
        </div>

        {/* FAQ Accordion */}
        <Accordion items={faqItems} />
      </div>
    </section>
  );
}
