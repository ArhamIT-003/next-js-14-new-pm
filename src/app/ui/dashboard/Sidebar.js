"use client";
import React from "react";
import MenuLink from "./MenuLink";
// import Image from "next/image";
import { GetUserDetails } from "@/app/hooks/user/getUser";
import LogoutButton from "./LogoutButton";
import { menuItems } from "@/helpers/data";
import { Spinner } from "@nextui-org/react";

const Sidebar = () => {
  const { data, loading } = GetUserDetails();

  // console.log(data);

  return (
    <div className="sticky top-10">
      <div className="flex items-center gap-5 mb-5">
        {/*<Image
          src={""}
          alt=""
          width={50}
          height={50}
          className="rounded-[50%] object-cover"
  />*/}
        <div className="flex flex-col ml-10 gap-2">
          <span className="font-bold capitalize">
            {loading ? <Spinner size="md"/> : data.username}
          </span>
          <span className={`text-xs`}>
            {loading ? <Spinner size="sm" /> : data?.role}
          </span>
        </div>
      </div>
      <ul>
        {menuItems.map((cat) => (
          <li key={cat.title} className={"flex flex-col gap-4 list-none"}>
            <span className={`font-bold mx-[10px] text-xs my-5`}>
              {cat.title}
            </span>
            {cat.list.map((items) => (
              <MenuLink item={items} key={items.title} />
            ))}
          </li>
        ))}
      </ul>
      <LogoutButton />
    </div>
  );
};

export default Sidebar;
