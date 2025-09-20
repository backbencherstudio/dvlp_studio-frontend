"use client";

import Link from "next/link";
import React from "react";
import CalenderIcon from "../icons/CalenderIcon";
import { usePathname } from "next/navigation";
import MaterialsIcon from "../icons/MaterialsIcon";
import ProfileIcon from "../icons/ProfileIcon";

const sidebarLinks = [
  {
    id: 1,
    lable: "Bookings",
    icon: <CalenderIcon />,
    slug: "/student-portal/bookings",
  },
  {
    id: 2,
    lable: "Session Materials",
    icon: <MaterialsIcon />,
    slug: "/student-portal/session-materials",
  },
  {
    id: 3,
    lable: "Profile",
    icon: <ProfileIcon />,
    slug: "/student-portal/profile",
  },
];

export default function StudentSidebar() {
  const pathName = usePathname();
  return (
    <div className=" bg-white/80 shadow-sm h-auto p-5 md:p-[25px] flex flex-col gap-3 rounded-3xl backdrop-blur-[2px] border">
      {sidebarLinks.map((item) => (
        <Link
          key={item.id}
          href={item.slug}
          className={`px-5 py-4 rounded-2xl  flex gap-3 ${
            pathName === item.slug || pathName.startsWith(item.slug + "/")
              ? "bg-gradient-to-l to-[#6366F1] from-[#A855F7] text-white font-semibold "
              : "text-gray-700 "
          }`}
        >
          <span>{item.icon}</span>
          <span> {item.lable}</span>
        </Link>
      ))}
    </div>
  );
}
//  pathname === l.href || pathname.startsWith(l.href + "/");
