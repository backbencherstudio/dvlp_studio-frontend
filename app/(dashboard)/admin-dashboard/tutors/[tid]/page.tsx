import React from "react";

export default function page({ params }: { params: { tid: string } }) {
  console.log(params.tid);
  return (
    <section className="p-6">
      Tutors {">"} <span>Tutors Details</span>
      <div className="bg-white p-4 rounded-md">
        <h3 className=" text-black [font-family:Inter] text-xl font-medium leading-[160%] tracking-[0.1px] mb-4">
          Tutor Details
        </h3>

        <div className="p-6 border rounded-lg"></div>
      </div>
    </section>
  );
}
