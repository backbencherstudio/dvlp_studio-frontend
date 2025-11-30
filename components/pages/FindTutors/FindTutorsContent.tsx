"use client"

import React, { useState } from "react";
import FindTutorHero from "./FindTutorHero";
import TutorList from "./TutorList";

export default function FindTutorsContent() {

  const [search, setSearch] = useState("");

  console.log("Search", search)

  return (
    <div>
     <FindTutorHero search={search} setSearch={setSearch} />
      <TutorList search={search} />
    </div>
  );
}
