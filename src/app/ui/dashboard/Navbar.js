"use client";
import React from "react";
import { usePathname } from "next/navigation";
import {
  MdNotifications,
  MdOutlineChat,
  MdPublic,
  MdSearch,
} from "react-icons/md";

const Navbar = () => {
  const pathName = usePathname();

  return (
    <div className={"flex items-center justify-between p-5 rounded-[10px]"}>
      <div className={"capitalize font-bold"}>{pathName.split("/").pop()}</div>
      <div className={`flex items-center gap-5`}>
        <div
          className={`flex items-center gap-[10px] bg-[#2e374a] p-[10px] rounded-[10px]`}
        >
          <MdSearch />
          <input
            type="text"
            placeholder="Search here"
            className={"bg-transparent border-none outline-none"}
          />
        </div>
        <div className={"flex gap-5"}>
          <MdOutlineChat size={20} className="cursor-pointer" />
          <MdNotifications size={20} className="cursor-pointer" />
          <MdPublic size={20} className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
