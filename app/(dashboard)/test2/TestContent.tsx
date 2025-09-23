"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function TabsDemo() {
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

          <div>hb</div>
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
