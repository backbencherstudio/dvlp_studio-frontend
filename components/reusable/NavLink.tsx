"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { isatty } from "tty";

interface NavLinkProps {
  href: string;
  children: ReactNode;
  className?: string; // normal classes
  activeClassName?: string; // classes when active
  normalClassName?: string; // classes when active
}

export default function NavLink({
  href,
  children,
  className = "",
  activeClassName = "",
  normalClassName = "",
}: NavLinkProps) {
  const pathname = usePathname();

    // const isActive = pathname === href || pathname.startsWith(href + "/" );
  const isActive = pathname === href;
  // console.log(pathname, isActive, href)
  return (
    <Link
      href={href}
      className={`${className} ${isActive ? activeClassName : normalClassName}`}
    >
      {children}
    </Link>
  );
}
