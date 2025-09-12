import ContactHero from "@/components/pages/Contact/ContactHero";
import ContactUsContent from "@/components/pages/Contact/ContactUsContent";
import FAQSection from "@/components/pages/Contact/FAQSection";
import React from "react";

export default function page() {
  return (
    <div>
      <ContactHero />
      <ContactUsContent/>
      <FAQSection/>
    </div>
  );
}
