"use client";

import { Bell } from "lucide-react";
import UserIcon from "../icons/UserIcon";
import { useAuth } from "@/context/AuthContext";
import NotificationListener from "../NotificationListener";

interface HeaderCardProps {
  type: "teacher" | "student";
  username: string;
  notificationCount: number;
}

const PortalHero: React.FC<HeaderCardProps> = ({
  type,
  username,
  notificationCount,
}) => {
  const { user } = useAuth();
  console.log("User info", user);

  // soket

  return (
    <div className="md:h-[495px] shrink-0 [background:linear-gradient(135deg,rgba(49,46,129,0.95)_0%,rgba(88,28,135,0.95)_50%,rgba(131,24,67,0.95)_100%)] relative">
      <div className="max-w-[1216px] mx-auto relative flex flex-col sm:flex-row items-center justify-between py-28 sm:pt-[182px]  z-20">
        <div className="flex flex-col sm:items-start items-center mb-6 sm:mb-0 sm:max-w-[50%] ">
          <div className="px-6 py-3 border border-white/20 bg-white/10 flex items-center justify-center gap-2 rounded-full mb-4 ">
            <span>
              <UserIcon className="text-[#C084FC]" />
            </span>
            <span className="text-sm font-medium leading-5 text-white">
              {user?.type === "teacher" ? "Tutor Portal" : "Student Portal"}
            </span>
          </div>
          <h2 className="max-w-[462.3px] mb-2.5 text-4xl sm:text-6xl font-black leading-[60px] text-white text-center sm:text-left">
            Welcome Back,{" "}
            <span className="bg-gradient-to-r from-[#FACC15] to-[#F472B6] text-transparent bg-clip-text">
              {user?.name ?? "Guest"}
            </span>
          </h2>
          <p className="text-lg sm:text-xl font-normal leading-7 text-[#D1D5DB] text-center sm:text-left">
            {user?.type === "teacher"
              ? "Here's your teaching overview and upcoming sessions."
              : "Here's your learning overview and upcoming sessions."}
          </p>
        </div>

        {/*  */}
        <NotificationListener userId={user?.id} />
        <div className="flex items-center gap-6 sm:gap-10">
          <div className="relative">
            <Bell className="w-11 h-11 text-[#D1D5DB]" />
            {notificationCount > 0 && (
              <span className="bg-[#EF4444] w-7 h-7 flex items-center justify-center rounded-full text-white font-bold absolute -top-[8px] -right-[6px]">
                {notificationCount}
              </span>
            )}
          </div>
          <div className="text-right">
            <p className="text-[#D1D5DB] text-lg sm:text-xl">Next session in</p>
            <h2 className="bg-gradient-to-r from-[#F97316] to-[#EC4899] font-black text-[32px] sm:text-[42px] bg-clip-text text-transparent">
              2 hours
            </h2>
          </div>
        </div>
      </div>

      {/* two blobs */}
      <div className="w-[25vw] sm:w-[16vw] h-[25vw] sm:h-[16vw] shrink-0 [background:rgba(168,85,247,0.20)] blur-[32px] rounded-full absolute left-10 bottom-25 sm:left-5 sm:bottom-10 z-10" />
      <div className="w-[30vw] sm:w-[20vw] h-[30vw] sm:h-[20vw] shrink-0 [background:rgba(59,130,246,0.20)] blur-[32px] rounded-full absolute right-10 bottom-10 sm:right-5 sm:bottom-5 z-10" />
    </div>
  );
};

export default PortalHero;
