// components/Navbar.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import logo from "@/public/evolve-logo.png";

import { usePathname } from "next/navigation";
import { useAuth, User } from "@/context/AuthContext";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/find-tutors", label: "Find Tutors" },
  { href: "/contact", label: "Contact" },
  // { href: "/student-portal", label: "Student Login" },
  // { href: "/tutor-portal", label: "Tutor Portal" },
];

export default function Navbar() {
  const [solid, setSolid] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout, loading } = useAuth();

  console.log(user?.type);

  // Optional: turn solid after scrolling past the hero (nice UX)
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 64); // ~hero padding
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest("nav") && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [mobileMenuOpen]);

  const pathname = usePathname();

  return (
    <header
      className={`fixed inset-x-0 top-0 z-100 transition-all duration-300 ease-in-out ${
        solid
          ? "bg-gradient-to-r from-[#2a0261]/90 via-[#2c0f54]/90 to-[#0f172a]/90 backdrop-blur-sm"
          : "bg-[rgba(0,0,0,0.16)]"
      }`}
    >
      <nav className="mx-auto container px-4 sm:px-6">
        <div className="flex items-center justify-between md:h-[103px]">
          <Link href="/">
            <Image
              className="w-[180px] h-[80px] sm:w-[225px] sm:h-[100px]"
              src={logo}
              alt="Evolve Logo"
              width={225}
              height={100}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            {/* Links */}
            <ul className="flex items-center gap-6 text-sm">
              {links.map((l) => {
                const isActive =
                  pathname === l.href || pathname.startsWith(l.href + "/");
                return (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className={
                        "transition hover:text-purple-400 text-lg " +
                        (isActive
                          ? "text-purple-500 [background:rgba(147,51,234,0.21)] rounded-[5px] px-1.5 py-1"
                          : "text-gray-100")
                      }
                    >
                      {l.label}
                    </Link>
                  </li>
                );
              })}
              {/*  */}

              {renderUser(user)}
            </ul>

            {/* Conditional Link for Tutor/Student */}

            <div className="flex gap-2 items-center">
              <a
                href="#"
                className="rounded-lg [background:#F97316] px-6.5 py-2 text-lg font-normal text-white leading-5 hover:bg-orange-600 transition-colors"
              >
                Book Session
              </a>
              {user && (
                <button
                  onClick={logout}
                  className="rounded-lg [background:#F97316] px-6.5 py-2 text-lg font-normal text-white leading-5 hover:bg-orange-600 transition-colors"
                >
                  Logout
                </button>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-4">
            <a
              href="#"
              className="rounded-lg [background:#F97316] px-4 py-2 text-sm font-normal text-white leading-5 hover:bg-orange-600 transition-colors"
            >
              Book Session
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:text-purple-400 transition-colors cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            mobileMenuOpen ? "max-h-96 opacity-100 pb-6" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-black/40 backdrop-blur-md rounded-lg mt-4 border border-white/10">
            <ul className="py-4">
              {links.map((l, index) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={
                      "block px-6 py-3 text-lg transition-colors border-b border-white/10 last:border-b-0 " +
                      (pathname === l.href || pathname.startsWith(l.href + "/")
                        ? "text-purple-500 bg-purple-500/10"
                        : "text-gray-100 hover:text-purple-400 hover:bg-white/5")
                    }
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

// Login private router
function renderUser(user: User | null) {
  if (!user) {
    return (
      <>
        <li className="transition hover:text-purple-400 text-lg text-gray-100">
          <Link href="/student/sign-in">Student Login</Link>
        </li>
        <li className="transition hover:text-purple-400 text-lg text-gray-100">
          <Link href="/tutor/sign-in">Tutor Login</Link>
        </li>
      </>
    );
  }

  switch (user.type) {
    case "teacher":
      return (
        <li className="transition hover:text-purple-400 text-lg text-gray-100">
          <Link href="/tutor-portal/profile">Teacher Portal</Link>
        </li>
      );
    case "student":
      return (
        <li className="transition hover:text-purple-400 text-lg text-gray-100">
          <Link href="/student-portal">Student Portal</Link>
        </li>
      );
    default:
      return null;
  }
}
