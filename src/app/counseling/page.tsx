"use client";
import CounselingList from "@/components/counseling/CounselingList";
import SeeMore from "@/components/counseling/SeeMore";
import React, { useState } from "react";

function Counseling() {
  const [seeMore, setSeeMore] = useState(null);
  return (
    <section className="mx-auto h-full w-[1084px] bg-white shadow-md">
      <div className="flex h-[570px] w-full border-b-1 border-[#E0E0E0]">
        <CounselingList />
        <SeeMore />
      </div>
      <div>pagination</div>
    </section>
  );
}

export default Counseling;
