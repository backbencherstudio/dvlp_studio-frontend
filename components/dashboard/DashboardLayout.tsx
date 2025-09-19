"use client";

import { ReactNode, useState } from "react";
import {
  Users,
  BookOpen,
  Calendar,
  CreditCard,
  Settings,
  Headset,
  LayoutDashboard,
} from "lucide-react";

import Sidebar from "./Sidebar";
import Header from "./Header";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", slug: "/admin-dashboard" },
    { icon: BookOpen, label: "Tutors", slug: "/admin-dashboard/tutors" },
    { icon: Users, label: "Students", slug: "/admin-dashboard/students" },
    { icon: Calendar, label: "Sessions", slug: "/admin-dashboard/sessions" },
    { icon: CreditCard, label: "Payments", slug: "/admin-dashboard/payments" },
    { icon: Headset, label: "Support", slug: "/admin-dashboard/support" },
    { icon: Settings, label: "Settings", slug: "/admin-dashboard/settings" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 ">
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-70 bg-white shadow-lg fixed top-0 left-0 h-screen overflow-y-auto">
          <Sidebar
            sidebarItems={sidebarItems}
            setMobileMenuOpen={setMobileMenuOpen}
          />
        </div>
        <div className="hidden lg:block w-70"></div>

        {/* Mobile Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:hidden overflow-y-auto ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar
            sidebarItems={sidebarItems}
            setMobileMenuOpen={setMobileMenuOpen}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          <Header setMobileMenuOpen={setMobileMenuOpen} />
          <main className="flex-1 p-6 bg-gray-100">{children}</main>
        </div>
      </div>
    </div>
  );
}

