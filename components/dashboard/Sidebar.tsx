"use client";

import { PanelRightOpen } from "lucide-react";
import NavLink from "../reusable/NavLink";

export default function Sidebar({
  sidebarItems,
  setMobileMenuOpen,
}: {
  sidebarItems: any[];
  setMobileMenuOpen: (val: boolean) => void;
}) {
  return (
    <>
      {/* sidebar logo */}
      <div className="flex items-center justify-between md:py-[19px] px-4 lg:px-6   ">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 via-purple-600 to-blue-600 rounded-lg flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-lg">E</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-gray-800 leading-none">
              VOLVE
            </span>
            <span className="text-xs text-gray-500 uppercase tracking-wider leading-none">
              TUTORING
            </span>
          </div>
        </div>
        <button
          className="lg:hidden p-1 rounded-md hover:bg-gray-100 cursor-pointer "
          onClick={() => setMobileMenuOpen(false)}
        >
          <PanelRightOpen className="text-gray-600 w-[22px]" />
        </button>
      </div>

      {/* nav items */}
      <nav className="mt-6 pl-6 pr-5 ">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3">
          Main Menu
        </div>
        <div className="space-y-2">
          {sidebarItems.map((item, index) => (
            <NavLink
              key={index}
              href={item?.slug}
              className="flex items-center px-3 py-3.5   rounded-lg transition-all duration-200 gap-2.5"
              activeClassName="bg-gradient-to-r from-[#6366F1] to-[#A855F7] text-white shadow-sm font-medium"
              normalClassName="text-[#4A4C56] hover:bg-gray-100 hover:text-gray-800 "
            >
              <item.icon className="w-5 h-5 " />
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </>
  );
}
