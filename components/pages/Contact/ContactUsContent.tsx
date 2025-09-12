import LightIcon from "@/components/icons/LightIcon";
import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";

export default function ContactUsContent() {
  return (
    <section className="[background:linear-gradient(135deg,#F8FAFC_0%,#EFF6FF_100%)]  py-14 md:py-[128px] relative">
      {/* main content */}
      <div className="max-w-[1280px] mx-auto px-8">
        {/* title */}
        <div>
          <div className="flex items-center justify-center mb-3">
            <div className="inline-flex justify-center items-center gap-2 bg-gradient-to-r from-[#F3E8FF] to-[#FCE7F3] px-6 py-3 rounded-full">
              <span>
                <LightIcon className="text-[#003466]" />
              </span>
              <span className="text-purple-800 text-center font-arial text-sm font-bold leading-5">
                Why Choose Evolve
              </span>
            </div>
          </div>

          <h2 className=" max-w-[729.34px] mx-auto flex flex-col justify-center items-center text-center text-6xl font-black leading-tight text-[#1E293B] mb-[15px]">
            The Future of{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#9333EA] to-[#DB2777]">
              Personalized Learning
            </span>
          </h2>
        </div>

        {/*  */}

        <div className="mt-[74px] flex flex-col md:flex-row gap-8 md:gap-16  md:pb-20 pb-10">
          <ContactForm />
          <div>
            <ContactInfo />
          </div>
        </div>
      </div>

      {/* blog circle */}
      <div className="w-[16.2vw] h-[16.2vw] shrink-0 [background:rgba(191,219,254,0.30)] blur-[32px] rounded-full absolute right-20 top-20"></div>
      <div className="w-[20.25vw] h-[20.25vw] shrink-0 [background:rgba(233,213,255,0.30)] blur-[32px] rounded-full absolute left-20 bottom-20"></div>
    </section>
  );
}
