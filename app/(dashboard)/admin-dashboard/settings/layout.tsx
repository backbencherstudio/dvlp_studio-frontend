import AdminSidebar from "@/components/dashboard/Setting/SettingContent";
import Link from "next/link";
import React, { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <h2 className="text-2xl font-medium leading-[160%] tracking-[0.12px] mb-5">
        Settings
      </h2>
      <section className="flex  gap-4">
        <div className="shrink-0">
          <AdminSidebar />
        </div>

        <div className="flex-1">{children}</div>
      </section>
    </div>
  );
}
