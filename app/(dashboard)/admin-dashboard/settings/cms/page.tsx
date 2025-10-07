'use client'

import BlogPost from "@/components/dashboard/Setting/BlogPost";
import TeamMember from "@/components/dashboard/Setting/TeamMember";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useState } from "react";

export default function page() {
  const [activeTab, setActiveTab] = useState("blog");

  return (
    <div>
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="">
        <div className="flex  items-center justify-between">
          <TabsList className="bg-white rounded-[14px] gap-1.5 p-2 w-[312px] h-[62px]">
            <TabsTrigger
              className="px-5 py-2.5 rounded-lg data-[state=active]:bg-black data-[state=active]:text-white "
              value="blog"
            >
              Blog
            </TabsTrigger>
            <TabsTrigger
              className="px-5 py-2.5 rounded-lg data-[state=active]:bg-black data-[state=active]:text-white"
              value="team"
            >
              Team
            </TabsTrigger>
          </TabsList>

         
        </div>
        <TabsContent value={"blog"}>
          <BlogPost />
        </TabsContent>
        <TabsContent value={"team"}>
          <TeamMember/>
        </TabsContent>
      </Tabs>
    </div>
  );
}
