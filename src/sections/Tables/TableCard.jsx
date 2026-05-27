import { useEffect, useState } from "react";
export default function TableCard() {
  const user = JSON.parse(localStorage.getItem("user")) || {};


  return (
    <>
      <h1 className="text-2xl sm:text-3xl font-bold text-[#0F766E] mb-6">
        welcome , {user.first_name} {user.last_name}
      </h1>
    </>
  );
}