import Image from "next/image";
import PageTag from "@/components/reusable/PageTag";
import AuthTitle from "@/components/reusable/AuthTitle";
import Link from "next/link";
import ArrowIcon from "@/components/icons/ArrowIcon";
import CapIcon from "@/components/icons/CapIcon";
import TutorSignIn from "@/components/auth/TutorSignIn";
import { Suspense } from "react";

export default function page() {



  return (
    <div className="w-full h-full flex flex-col  items-center justify-center ">
      <div className=" w-[min(448px,90vw)] mx-auto  border- red-500/50 f flex-col flex items-center justify-center ">
        {/* logo */}
        <Image
          className="w-[clamp(140px,12vw,225.055px)] h-auto"
          src="/evolve-logo.png"
          alt=""
          width={225}
          height={100}
        />

        <PageTag
          icon={<CapIcon className="text-teal-400 " />}
          title="Tutor Portal"
        />
        <AuthTitle
          title="Welcome Back, Educator!"
          subTitle="Sign in to inspire and teach students"
        />

        {/* sign in form  */}
            <Suspense fallback={<div>Loading sign in...</div>}>
              <TutorSignIn />
            </Suspense>

        <div className=" gap-2  mt-[26px]">
          {/* already have or new comers */}
          <div className="mb-[10px]">
            <p className="leading-6  text-gray-300">
              New to teaching with us?{" "}
              <Link
                href={"/tutor/sign-up"}
                className="font-semibold leading-6 text-teal-400"
              >
                Apply to teach
              </Link>
            </p>
           
          </div>

          {/* go back */}
          <Link
            href={"/"}
            className="text-sm font-normal leading-5 text-center text-gray-400 flex items-center justify-center mb-4 md:mb-0"
          >
            <ArrowIcon className="w-4 h-4 rotate-180" /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
