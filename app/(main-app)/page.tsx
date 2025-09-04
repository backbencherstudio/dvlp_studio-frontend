import Navbar from "@/components/pages/Home/Navbar";
import Hero from "@/components/pages/Home/Hero";
import React from "react";
import WhyChoose from "@/components/pages/Home/WhyChoose";
import SubjectMastery from "@/components/pages/Home/SubjectMastery";
import LearnAnywhere from "@/components/pages/Home/LearnAnywhere";
import WhyTeach from "@/components/pages/Home/WhyTeach";

const Homepage = () => {
  return (
    <div>
      <Hero />
      <WhyChoose/>
      <SubjectMastery/>
      <LearnAnywhere/>
      <WhyTeach/>
    </div>
  );
};

export default Homepage;
