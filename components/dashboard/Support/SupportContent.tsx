// import SupportEmail from "@/components/dashboard/Support/SupportEmail";
// import { Tab, Tabs } from "@/components/reusable/ReusableTab";

// const tabsData: Tab[] = [
//   {
//     id: "support-emails",
//     label: "Support Emails",
//     content: (
//       <div>
//         <SupportEmail  />
//       </div>
//     ),
//   },
//   {
//     id: "user-report",
//     label: "User Report",
//     content: (
//       <div>
//         <h2 className="text-xl font-semibold text-card-foreground mb-4">
//           User Report
//         </h2>
//         <p className="text-muted-foreground">
//           View detailed user analytics and reports here.
//         </p>
//       </div>
//     ),
//   },
// ];

// export default function TabsPage() {
//   return (
//     <div className="">
//       <div className="flex">
//         <Tabs
//           className=""
//           tabs={tabsData}
//           defaultTab="support-emails"
//           isExtra={<div className="flex gap-2"></div>}
//         />
//       </div>
//     </div>
//   );
// }

// function Filter() {

// }

"use client";
import CustomSelectField from "@/components/reusable/CustomSelect";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SupportEmail from "./SupportEmail";
import { UsersReport } from "./UsersReport";

export function SupportContent() {
  return (
    <div className="flex w-full flex-col gap-6">
      <Tabs defaultValue="support-emails" className="">
        <div className="flex border items-center justify-between">
          <TabsList className="bg-white rounded-[14px] gap-1.5 p-2 w-[312px] h-[62px]">
            <TabsTrigger
              className="px-5 py-2.5 rounded-lg data-[state=active]:bg-black data-[state=active]:text-white "
              value="support-emails"
            >
              Support Emails
            </TabsTrigger>
            <TabsTrigger
              className="px-5 py-2.5 rounded-lg data-[state=active]:bg-black data-[state=active]:text-white"
              value="user-report"
            >
              User Report
            </TabsTrigger>
          </TabsList>

          <div className="flex gap-3">
            <div className="px-5 py-2.5"></div>
            <div className="px-5 py-2.5">Refresh</div>
          </div>
        </div>
        <TabsContent value="support-emails">
          <SupportEmail />
        </TabsContent>
        <TabsContent value="user-report">
          <UsersReport/>
        </TabsContent>
      </Tabs>
    </div>
  );
}
