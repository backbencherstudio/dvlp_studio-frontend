import Navbar from "@/components/pages/Home/Navbar";
import Hero from "@/components/pages/Home/Hero";
import React from "react";
import WhyChoose from "@/components/pages/Home/WhyChoose";

const Homepage = () => {
  return (
    <div>
      <Hero />
      <WhyChoose/>
    </div>
  );
};

export default Homepage;
