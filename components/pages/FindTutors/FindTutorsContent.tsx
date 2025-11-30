"use client";

import React, { Suspense, useState } from "react";
import FindTutorHero from "./FindTutorHero";
import TutorList from "./TutorList";

export default function FindTutorsContent() {
  const [search, setSearch] = useState("");

  console.log("Search", search);

  return (
    <div>
      <FindTutorHero search={search} setSearch={setSearch} />

      <Suspense fallback={<div>Loading sign in...</div>}>
        <TutorList search={search} />
      </Suspense>
    </div>
  );
}
