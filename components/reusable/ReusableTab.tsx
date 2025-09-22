"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface Tab {
  id: string;
  label: string;
  content: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  className?: string;
  isExtra?: ReactNode;
}

export function Tabs({ tabs, defaultTab, className, isExtra="hi" }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const activeTabContent = tabs.find((tab) => tab.id === activeTab)?.content;

  return (
    <div className={cn("w-full", className)}>
      {/* Tab Navigation */}
      <div className="flex items-center justify-between" >
        <div className=" inline-flex gap-1.5 mb-6 border border-gray-100/50 p-2 rounded-xl bg-white">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-6 py-3 text-sm font-medium rounded-lg transition-all duration-200",
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* If extra info */}
        {isExtra && <div>{isExtra}</div>}
      </div>
      {/* Tab Content */}
      <div className="">{activeTabContent}</div>
    </div>
  );
}
