"use client";

import React, { useState } from "react";
import {
  BarChart3,
  Users,
  BookOpen,
  Calendar,
  CreditCard,
  HelpCircle,
  Settings,
  Menu,
  X,
  Search,
  Bell,
  User,
  TrendingDown,
  TrendingUp,
  Eye,
  MoreHorizontal,
  PanelLeftOpen,
  PanelRightOpen,
} from "lucide-react";

const Dashboard = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const sidebarItems = [
    { icon: BarChart3, label: "Dashboard", active: true },
    { icon: BookOpen, label: "Tutors" },
    { icon: Users, label: "Students" },
    { icon: Calendar, label: "Sessions" },
    { icon: CreditCard, label: "Payments" },
    { icon: HelpCircle, label: "Support" },
    { icon: Settings, label: "Settings" },
  ];

  const statsCards = [
    {
      title: "Total Tutor",
      value: "127",
      change: "-12.5%",
      changeType: "decrease",
      period: "vs last month",
      icon: BookOpen,
      color: "bg-purple-100",
    },
    {
      title: "Total Students",
      value: "453",
      change: "+12.5%",
      changeType: "increase",
      period: "vs last month",
      icon: Users,
      color: "bg-blue-100",
    },
    {
      title: "Upcoming Sessions",
      value: "5",
      change: "-12.5%",
      changeType: "decrease",
      period: "Today",
      icon: Calendar,
      color: "bg-orange-100",
    },
    {
      title: "Revenue",
      value: "$2000",
      change: "+12.5%",
      changeType: "increase",
      period: "vs last 7 Days",
      icon: CreditCard,
      color: "bg-green-100",
    },
  ];

  const recentSessions = [
    {
      student: "John Doe",
      tutor: "Alice Brown",
      date: "2025-08-25",
      location: "Asia/Dhaka",
    },
    {
      student: "John Doe",
      tutor: "Alice Brown",
      date: "2025-08-25",
      location: "Asia/Dhaka",
    },
    {
      student: "John Doe",
      tutor: "Alice Brown",
      date: "2025-08-25",
      location: "Asia/Dhaka",
    },
    {
      student: "John Doe",
      tutor: "Alice Brown",
      date: "2025-08-25",
      location: "Asia/Dhaka",
    },
    {
      student: "John Doe",
      tutor: "Alice Brown",
      date: "2025-08-25",
      location: "Asia/Dhaka",
    },
  ];

  const pendingApplications = [
    { name: "Jane Smith", subject: "Physics", submitted: "2025-08-18" },
    { name: "Jane Smith", subject: "Physics", submitted: "2025-08-18" },
    { name: "Jane Smith", subject: "Physics", submitted: "2025-08-18" },
    { name: "Jane Smith", subject: "Physics", submitted: "2025-08-18" },
  ];

  const SidebarContent = () => (
    <>
      <div className="flex items-center justify-between h-16 px-3  border-b border-gray-200 ">
        <div className="flex items-center space-x-3 ">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 via-purple-600 to-blue-600 rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">E</span>
            </div>
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
          className="lg:hidden p-1 rounded-md hover:bg-gray-100"
          onClick={() => setMobileMenuOpen(false)}
        >

          <PanelRightOpen />
        </button>
      </div>

      <nav className="mt-6 px-4">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3">
          Main Menu
        </div>
        <div className="space-y-1">
          {sidebarItems.map((item, index) => (
            <a
              key={index}
              href="#"
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                item.active
                  ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <div className="flex">
        {/* Desktop Sidebar - Always visible on lg+ screens */}
        <div className="hidden lg:block w-64 bg-white shadow-lg fixed top-0 left-0 h-screen overflow-y-auto">
          <SidebarContent />
        </div>
        {/* // Add a padding div to offset the main content */}
        <div className="hidden lg:block  w-64"></div>

        {/* Mobile Sidebar - Only visible when toggled */}
        <div
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:hidden overflow-y-auto ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <SidebarContent />
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top navbar */}
          <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
            <div className="flex items-center justify-between h-16 px-4 lg:px-6">
              <div className="flex items-center">
                <button
                  className="lg:hidden p-2 rounded-md hover:bg-gray-100 mr-3"
                  onClick={() => setMobileMenuOpen(true)}
                >
                  <Menu className="w-5 h-5" />
                </button>
                <div className="text-sm text-gray-500">
                  <span className="font-medium text-gray-900">Dashboard</span>
                  <span className="mx-1">/</span>
                  
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="hidden md:block relative">
                  <input
                    type="text"
                    placeholder="Search User"
                    className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50"
                  />
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                </div>

                <button className="relative p-2 rounded-lg hover:bg-gray-100">
                  <Bell className="w-5 h-5 text-gray-600" />
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center text-white font-bold">
                    1
                  </span>
                </button>

                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </header>

          {/* Dashboard content */}
          <main className="flex-1 p-6 bg-gray-100">
            {/* Stats cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {statsCards.map((card, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-gray-600">
                      {card.title}
                    </h3>
                    <div
                      className={`w-12 h-12 rounded-lg ${card.color} flex items-center justify-center`}
                    >
                      <card.icon className="w-6 h-6 text-gray-600" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-3xl font-bold text-gray-900">
                      {card.value}
                    </p>
                    <div className="flex items-center text-sm">
                      <span
                        className={`flex items-center font-medium ${
                          card.changeType === "increase"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {card.change}
                      </span>
                      <span className="text-gray-500 ml-2">{card.period}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Content sections */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {/* Recent Sessions */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Recent Sessions
                  </h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {recentSessions.map((session, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-medium text-gray-900 text-sm">
                              {session.student}
                            </span>
                            <span className="text-gray-400 text-sm">→</span>
                            <span className="font-medium text-gray-900 text-sm">
                              {session.tutor}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500">
                            {session.date} • {session.location}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="px-3 py-1 text-xs font-medium text-purple-600 hover:bg-purple-50 rounded border border-purple-200">
                            View
                          </button>
                          <button className="p-1 hover:bg-gray-100 rounded">
                            <MoreHorizontal className="w-4 h-4 text-gray-400" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pending Applications */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Pending Tutor Applications
                  </h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {pendingApplications?.map((application, index) => (
                      <div
                        key={index}
                        className="py-3 border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 text-sm mb-1">
                              {application.name}
                            </h4>
                            <p className="text-sm text-blue-600 mb-1">
                              {application.subject}
                            </p>
                            <p className="text-xs text-gray-500">
                              Submitted: {application.submitted}
                            </p>
                          </div>
                          <button className="px-3 py-1 text-xs font-medium text-purple-600 hover:bg-purple-50 rounded border border-purple-200">
                            View Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
