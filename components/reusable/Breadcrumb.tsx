"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Breadcrumb({ customLabel }: { customLabel?: string }) {
  const pathname = usePathname();
  const pathParts = pathname
    .split("/")
    .filter(Boolean)
    .filter((part, i) => !(i === 0 && part === "admin-dashboard"));


  return (
    <div className="flex items-center gap-2 text-sm">
      {pathParts.map((part, idx) => {
        const href = "/admin-dashboard/" + pathParts.slice(0, idx + 1).join("/");
        const isLast = idx === pathParts.length - 1;

        // show custom label only for last segment

        const label = isLast
          ? customLabel || decodeURIComponent(part)
          : decodeURIComponent(part.replace(/-/g, " "));

        return (
          <div key={href} className="flex items-center gap-2 mb-4">
            <Link
              href={href}
              className={
                isLast
                  ? "text-gray-500 font-medium capitalize"
                  : "text-gray-900 hover:underline capitalize"
              }
            >
              {label}
            </Link>
            {!isLast && (
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            )}
          </div>
        );
      })}
    </div>
  );
}
