import LightIcon from "@/components/icons/LightIcon";

export default function OurMission() {
  return (
    <section className="lg:pt-[180px] lg:pb-[128px] md:pt-[100px] md:pb-[80px] pt-15 pb-10 px-4 md:px-0  bg-gradient-to-r from-[#F8FAFC]  to-[#EFF6FF] relative ">
      {/* content div */}
      <div className="max-w-[1265.34px] mx-auto flex flex-col lg:flex-row items-center justify-between lg:gap-[69.19px] gap-6 relative z-10">
        {/* Left Side: Text Content */}
        <div className="">
          {/*  tag */}
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-l from-[#E0E7FF] to-[#F3E8FF] rounded-full mb-[17.33px]">
            <span className="text-[#4F46E5] ">
              <LightIcon />
            </span>
            <span className="text-sm leading-5 font-semibold text-[#3730A3]">
              Our Mission
            </span>
          </div>
          {/* title */}
          <h2 className="max-w-[580px] text-6xl font-black leading-[60px] text-[#1F2937] mb-[21.33px] ">
            Unlocking Every{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4F46E5] to-[#9333EA]">
              Student's Potential
            </span>
          </h2>

          <div className="mb-[35px] space-y-[31px]">
            <p className="text-base text-gray-700 md:text-lg  font-normal leading-[29.25px] max-w-[573.997px] ">
              At Evolve, we believe every student has the potential to excel.
              Our mission is to unlock that potential through inspirational,
              innovative, and compassionate educational support.
            </p>
            <p className="text-base text-gray-700 md:text-lg  font-normal leading-[29.25px] max-w-[552.65px]">
              We're not just about improving grades — we're about building
              confidence, fostering critical thinking, and preparing students
              for lifelong success.
            </p>
          </div>

          {/* Bullet Points */}
          <ul className="space-y-4 text-gray-700 list-none">
            {[
              "Proven track record of success",
              "Flexible and convenient scheduling",
              "Qualified and passionate tutors",
              "Proven track record of success",
            ].map((item, idx) => (
              <li key={idx} className="flex items-center">
                <span className="text-[#4CAF50] ">{TickMark}</span>
                <span className="ml-2">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side: Image */}
        <div className="mt-8 md:mt-0 md:ml-8 flex-shrink-0 relative">
          <div className="max-w-[574.67px] h-96 shrink-0 overflow-hidden rounded-2xl ">
            <img
              src="./images/learning.png"
              alt="Mission image"
              className="w-full h-full  shadow-lg object-cover "
            />
          </div>

          <div className="mt-4 bg-linear-to-r from-[#6366F1] to-[#A855F7]  pt-8 pl-8 pr-2 pb-2 text-white py-2 px-4 rounded-br-2xl rounded-tl-2xl absolute bottom-0 right-0 z-10">
            <p className="text-4xl font-black leading-10" > 20+ </p>
            <p className="text-sm font-medium leading-5">Success Stories</p>
          </div>
        </div>
      </div>



      {/* 2 blobs */}
      <div className="w-[20vw] h-[20vw] shrink-0 [background:rgba(233,213,255,0.30)] blur-[32px] rounded-full absolute z-5 left-20 bottom-20" />
      <div className="w-[15vw] h-[15vw] shrink-0 [background:rgba(191,219,254,0.30)] blur-[32px] rounded-full absolute z-5 right-20 top-20" />
      
    </section>
  );
}

const TickMark = (
  <svg
    width="24"
    height="25"
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22 11.58V12.5C21.9988 14.6564 21.3005 16.7547 20.0093 18.4818C18.7182 20.209 16.9033 21.4725 14.8354 22.0839C12.7674 22.6953 10.5573 22.6219 8.53447 21.8746C6.51168 21.1273 4.78465 19.7461 3.61096 17.9371C2.43727 16.128 1.87979 13.9881 2.02168 11.8363C2.16356 9.68457 2.99721 7.63633 4.39828 5.99707C5.79935 4.35782 7.69279 3.21538 9.79619 2.74015C11.8996 2.26491 14.1003 2.48234 16.07 3.36"
      stroke="#22C55E"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M9 11.5L12 14.5L22 4.5"
      stroke="#22C55E"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
