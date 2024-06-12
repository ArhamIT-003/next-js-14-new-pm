"use client";
import { ChevronDownIcon } from "@/app/assets/ChevronDownIcon";
import { GetAllUser, GetUserDetails } from "@/app/hooks/user/getUser";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { capitalize } from "@/lib/helper";

export default function AddProjectPage() {
  const formCss =
    "p-5 border-[2px] rounded-[5px] border-[#2e374a] text-black outline-none";
  const formInput = "w-full text-black outline-none";
  const formBtn =
    "w-full p-5 border-none rounded-[5px] bg-teal-400 cursor-pointer font-bold text-base outline-none";

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    state: "",
  });

  const [assignedUsers, setAssignedUsers] = useState(new Set());

  const { data } = GetAllUser();
  const { data: currentUser } = GetUserDetails();

  const assignedTo = Array.from(assignedUsers);
  const router = useRouter();

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      const data = {
        ...formData,
        assignedTo, // Use the extracted array
        createdBy: currentUser.username,
      };
      await axios.post("/api/project/add", data);
      toast.success("Project created Successfully");
      router.push("/dashboard/project");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`mt-5 rounded-[10px] p-5`}>
      <form
        className={`flex justify-between gap-5 flex-wrap`}
        onSubmit={submitHandler}
      >
        <input
          type="text"
          placeholder="Project name"
          name="name"
          className={`${formCss} ${formInput}`}
          value={formData.name}
          onChange={changeHandler}
        />
        <textarea
          name="description"
          id="description"
          type="text"
          placeholder="Project description"
          className={`${formCss} w-full`}
          value={formData.description}
          onChange={changeHandler}
          rows={10}
        ></textarea>
        <input
          type="text"
          name="createdBy"
          id="createdBy"
          placeholder="user name"
          className={`${formCss} w-full`}
          value={currentUser.username}
          onChange={changeHandler}
        />
        <div className="flex gap-4 w-full">
          <select
            name="state"
            id="state"
            className={`${formCss} ${formInput} flex-1`}
            onChange={changeHandler}
          >
            <option value={"--"}>Current Priority</option>
            <option value={"todo"}>To-Do</option>
            <option value={"in progress"}>In Progress</option>
            <option value={"completed"}>Completed</option>
          </select>
          <Dropdown>
            <DropdownTrigger className="hidden sm:flex text-default">
              <Button
                endContent={<ChevronDownIcon className="text-small" />}
                variant="flat"
                className="flex-1 p-10"
              >
                Assigned To
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              closeOnSelect={false}
              selectedKeys={assignedUsers}
              selectionMode="multiple"
              onSelectionChange={(keys) => setAssignedUsers(keys)}
            >
              {data?.map((users) => (
                <DropdownItem key={users._id} className="capitalize text-black">
                  {capitalize(users.username)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>

        <button type="submit" className={formBtn}>
          Add
        </button>
      </form>
    </div>
  );
}
