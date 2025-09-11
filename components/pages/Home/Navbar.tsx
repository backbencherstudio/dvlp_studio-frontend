// components/Navbar.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import logo from "@/public/evolve-logo.png";

import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/find-tutors", label: "Find Tutors" },
  { href: "/contact", label: "Contact" },
  { href: "/student", label: "Student Portal" },
  { href: "/tutor", label: "Tutor Portal" },
];

export default function Navbar() {
  const [solid, setSolid] = useState(false);

  // Optional: turn solid after scrolling past the hero (nice UX)
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 64); // ~hero padding
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const pathname = usePathname();
  return (
    <header className={`fixed inset-x-0 top-0 z-40 transition-colors shrink-0 [background:rgba(0,0,0,0.16)] `}>
      <nav className="mx-auto container px-4 sm:px-6  ">
        <div className="flex items-center justify-between h-[103px]">
          <Link href="/">
            <Image
              className="w-[225px] h-[100px]"
              src={logo}
              alt=""
              width={225}
              height={100}
            />
          </Link>

          <div className="flex items-center gap-10">
            {/* Links */}
            <ul className="hidden md:flex items-center gap-6 text-sm">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={
                      "transition hover:text-purple-400 text-lg " +
                      (pathname === l.href
                        ? "text-purple-500 [background:rgba(147,51,234,0.21)] rounded-[5px] px-1.5 py-1"
                        : "text-gray-100")
                    }
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            <a
              href="#"
              className="rounded-lg [background:#F97316] px-6.5 py-2 text-lg font-normal text-white leading-5 hover:bg-orange-600"
            >
              Book Session
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
