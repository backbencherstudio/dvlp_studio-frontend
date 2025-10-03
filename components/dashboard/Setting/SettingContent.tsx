"use client";

import NavLink from "@/components/reusable/NavLink";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const sidebarLinks = [
  {
    id: 1,
    lable: "General",
    slug: "/admin-dashboard/settings/general",
  },
  {
    id: 2,
    lable: "Payment",
    slug: "/admin-dashboard/settings/payment",
  },
  {
    id: 3,
    lable: "CMS",
    slug: "/admin-dashboard/settings/cms",
  },
];

export default function AdminSidebar() {
  const pathName = usePathname();
  return (
    <div className=" bg-white/80 p-2.5 flex flex-col gap-3 rounded-xl backdrop-blur-[2px] border w-[164px]">
      {sidebarLinks.map((item) => (
     
        <NavLink
          key={item.id}
          href={item.slug}
          className="px-4 py-2.5 rounded-md  flex gap-3"
          normalClassName="text-gray-700"
          activeClassName="bg-gradient-to-l to-[#6366F1] from-[#A855F7] text-white font-semibold"
        >
          {item.lable}
        </NavLink>
      ))}
    </div>
  );
}
