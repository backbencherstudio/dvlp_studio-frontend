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

export function SupportContent() {
  return (
    <div className="flex w-full flex-col gap-6">
      <Tabs defaultValue="account" className="">
        <div className="flex border items-center justify-between">
          <TabsList className="bg-white rounded-[14px] gap-1.5 p-2 w-[312px] h-[62px]">
            <TabsTrigger
              className="px-5 py-2.5 rounded-lg data-[state=active]:bg-black data-[state=active]:text-white "
              value="account"
            >
              Account
            </TabsTrigger>
            <TabsTrigger
              className="px-5 py-2.5 rounded-lg data-[state=active]:bg-black data-[state=active]:text-white"
              value="password"
            >
              Password
            </TabsTrigger>
          </TabsList>

          <div className="flex gap-3">
            <div className="px-5 py-2.5"></div>
            <div className="px-5 py-2.5">Refresh</div>
          </div>
        </div>
        <TabsContent value="account">
          Make changes to your account here. Make changes to your account here.
          Make changes to your account here. Make changes to your account here.
          Make changes to your account here. Make changes to your account here.
          Make changes to your account here. Make changes to your account here.
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
}
