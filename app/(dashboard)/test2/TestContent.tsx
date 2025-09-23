"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function TabsDemo() {
  return (
    <div className="flex w-full flex-col gap-6">
      <Tabs defaultValue="account" className="">
        <div className="flex border items-center justify-between">
          <TabsList className="">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>

          <div>
            hb
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
