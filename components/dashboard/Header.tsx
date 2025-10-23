"use client";

import { Menu, Search, Bell, User, LogOut } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import React from "react";
import { useAuth } from "@/context/AuthContext";

interface HeaderProps {
  setMobileMenuOpen: (val: boolean) => void;
}

export default function Header({ setMobileMenuOpen }: HeaderProps) {
  const { user, logout } = useAuth();

  // Compute display name safely
  const displayName  = user?.name;

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="flex items-center justify-between py-4 md:py-[19px] px-4 lg:px-6">
        {/* Mobile menu button */}
        <div className="flex items-center">
          <button
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 mr-3"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="hidden md:block relative">
            <input
              type="text"
              placeholder="Search User"
              className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>

          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-gray-100">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center text-white font-bold">
              1
            </span>
          </button>

          {/* User Avatar + Popover */}
          <Popover>
            <PopoverTrigger asChild>
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center cursor-pointer">
                <User className="w-4 h-4 text-white" />
              </div>
            </PopoverTrigger>

            <PopoverContent className="w-36 p-2 mr-3">
              <div className="flex flex-col space-y-2">
                <p className="text-sm font-medium text-gray-800 truncate">{displayName}</p>
                <button
                  className="flex items-center gap-2 text-sm text-red-600 hover:bg-red-50 rounded-md px-2 py-1"
                  onClick={logout}
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
}
