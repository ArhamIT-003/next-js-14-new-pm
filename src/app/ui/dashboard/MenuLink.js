"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MenuLink = ({ item }) => {
  const pathName = usePathname();

  return (
    <Link
      href={item.path}
      className={`flex p-2 items-center gap-5 mx-1 rounded-lg hover:bg-[#2e374a] ${
        pathName === item.path && "hover:bg-[#2e374a]"
      }`}
    >
      {item.icon}
      {item.title}
    </Link>
  );
};

export default MenuLink;
