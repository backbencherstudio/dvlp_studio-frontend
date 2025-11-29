import { ChevronDown } from "lucide-react";
import React, { useState, useRef } from "react";

interface AccordionItemProps {
  question: React.ReactNode ;  // <-- accepts JSX or string
  answer: React.ReactNode;    // <-- accepts JSX or string
}

const AccordionItem: React.FC<AccordionItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const contentHeight = isOpen ? contentRef.current?.scrollHeight : 0;

  return (
    <div
      className="border border-gray-100 rounded-2xl shadow-xs py-6 px-4 md:px-8 cursor-pointer"
      onClick={() => setIsOpen(!isOpen)}
    >
      <button className="w-full text-left text-lg font-semibold flex items-center justify-between cursor-pointer gap-2 focus:outline-none">
        {question}
        <ChevronDown
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      <div
        ref={contentRef}
        style={{ height: contentHeight }}
        className="overflow-hidden transition-all duration-300 ease-in-out"
      >
        <div className="pt-2.5 text-gray-600">
          {answer} {/* <-- Renders JSX directly */}
        </div>
      </div>
    </div>
  );
};

interface AccordionProps {
  items: { question: React.ReactNode; answer: React.ReactNode }[]; // <-- FIXED
}

const Accordion: React.FC<AccordionProps> = ({ items }) => {
  return (
    <div className="bg-white rounded-lg w-full mx-auto space-y-4">
      {items.map((item, index) => (
        <AccordionItem key={index} question={item.question} answer={item.answer} />
      ))}
    </div>
  );
};

export default Accordion;
