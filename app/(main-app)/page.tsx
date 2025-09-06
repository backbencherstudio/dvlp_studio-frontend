import Navbar from "@/components/pages/Home/Navbar";
import Hero from "@/components/pages/Home/Hero";
import React from "react";
import WhyChoose from "@/components/pages/Home/WhyChoose";
import SubjectMastery from "@/components/pages/Home/SubjectMastery";
import LearnAnywhere from "@/components/pages/Home/LearnAnywhere";
import WhyTeach from "@/components/pages/Home/WhyTeach";
import SuccessStory from "@/components/pages/Home/SuccessStory";
import ReadyToTransform from "@/components/pages/Home/ReadyToTransform";

const Homepage = () => {
  return (
    <div>
      <Hero />
      <WhyChoose/>
      <SubjectMastery/>
      <LearnAnywhere/>
      <WhyTeach/>
      <SuccessStory/>
      <ReadyToTransform/>
    </div>
  );
};

export default Homepage;
