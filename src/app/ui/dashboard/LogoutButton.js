"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { MdLogout } from "react-icons/md";

export default function LogoutButton() {
  const router = useRouter();

  const logoutHandler = async () => {
    try {
      await axios.get("/api/user/logout");
      router.push("/login");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <button
      className={`my-5 flex p-2 gap-5 items-center bg-none border-none mx-[5px] cursor-pointer rounded-xl w-full text-base hover:bg-[#2e374a]`}
      onClick={logoutHandler}
    >
      <MdLogout />
      Logout
    </button>
  );
}
