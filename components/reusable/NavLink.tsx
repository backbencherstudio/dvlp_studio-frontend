"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface NavLinkProps {
  href: string;
  children: ReactNode;
  className?: string; // common classes
  activeClassName?: string; // when active
  normalClassName?: string; // when not active
  exact?: boolean; // true = strict match, false = startsWith match
}

export default function NavLink({
  href,
  children,
  className = "",
  activeClassName = "",
  normalClassName = "",
  exact = false, // default is flexible
}: NavLinkProps) {
  const pathname = usePathname();

  const isActive = exact
    ? pathname === href
    : pathname === href || pathname.startsWith(href + "/");

  return (
    <Link
      href={href}
      className={`${className} ${isActive ? activeClassName : normalClassName}`}
    >
      {children}
    </Link>
  );
}
