import SupportEmail from "@/components/dashboard/Support/SupportEmail";
import { Tab, Tabs } from "@/components/reusable/ReusableTab";

const tabsData: Tab[] = [
  {
    id: "support-emails",
    label: "Support Emails",
    content: (
      <div>
        <SupportEmail  />
      </div>
    ),
  },
  {
    id: "user-report",
    label: "User Report",
    content: (
      <div>
        <h2 className="text-xl font-semibold text-card-foreground mb-4">
          User Report
        </h2>
        <p className="text-muted-foreground">
          View detailed user analytics and reports here.
        </p>
      </div>
    ),
  },
];

export default function TabsPage() {
  return (
    <div className="">
      <div className="flex">
        <Tabs
          className=""
          tabs={tabsData}
          defaultTab="support-emails"
          isExtra={<div className="flex gap-2"></div>}
        />
      </div>
    </div>
  );
}


function Filter() {
    
}