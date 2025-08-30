import Image from "next/image";
import React from "react";
import abc from "@/public/evolve-logo.png";
import PageTag from "@/components/reusable/PageTag";
import StudentSignIn from "@/components/auth/StudentSignIn";
import BookIcon from "@/components/icons/BookIcon";
import AuthTitle from "@/components/reusable/AuthTitle";
import Link from "next/link";
import ArrowIcon from "@/components/icons/ArrowIcon";

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
          icon={<BookIcon className="text-[#C084FC]" />}
          title="Student Portal"
        />
        <AuthTitle
          title="Welcome Back, Learner"
          subTitle="Sign in to continue your learning journey"
        />

        {/* sign in form  */}
        <StudentSignIn />

        <div className=" gap-2  mt-[26px]">
          {/* already have or new comers */}
          <div className="mb-[30px]">
            <p className="leading-6  text-gray-300">
              Don't have an account?  {" "}
               <Link href={"/student/sign-up"} className="font-semibold leading-6 text-[#C084FC]">Sign up here</Link>
            </p>
            <Link className="font-semibold leading-5 text-purple-400" href="" />
          </div>

          {/* go back */}
          <Link href={"/"} className="text-sm font-normal leading-5 text-center text-gray-400 flex items-center justify-center mb-4 md:mb-0">
            <ArrowIcon className="w-4 h-4 rotate-180" /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
