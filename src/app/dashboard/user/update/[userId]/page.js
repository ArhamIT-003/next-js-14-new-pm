"use client";

import { GetUser } from "@/app/hooks/user/getUser";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function UpdateUserPage({ params: { userId } }) {
  const formCss =
    "p-5 border-[2px] rounded-[5px] border-[#2e374a] text-black outline-none";
  const formInput = "w-full text-black outline-none";
  const formBtn =
    "w-full p-5 border-none rounded-[5px] bg-teal-400 cursor-pointer font-bold text-base outline-none";

  const { data, loading } = GetUser(userId);

  // console.log(data);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "",
    email: "",
    isActive: null,
  });

  const router = useRouter();

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/user/${userId}`, formData);
      toast.success("User updated Successfully");
      router.push("/dashboard/user");
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
          placeholder={loading ? "loading..." : data?.username}
          name="username"
          className={`${formCss} ${formInput}`}
          value={formData.name}
          onChange={changeHandler}
        />
        <input
          name="email"
          id="email"
          type="email"
          placeholder={loading ? "loading..." : data?.email}
          className={`${formCss} w-full`}
          value={formData.email}
          onChange={changeHandler}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Change the password"
          className={`${formCss} w-full`}
          value={formData.password}
          onChange={changeHandler}
        />
        <div className="flex gap-4 w-full">
          <select
            name="isActive"
            id="isActive"
            className={`${formCss} ${formInput} flex-1`}
            onChange={changeHandler}
          >
            <option value={true}>
              Current State: {data?.isActive ? "isActive" : "not-Active"}
            </option>
            <option value={false}>No</option>
            <option value={true}>Yes</option>
          </select>
          <select
            name="role"
            id="role"
            className={`${formCss} ${formInput} flex-1`}
            onChange={changeHandler}
          >
            <option value={"Product Owner"}>Current Role : {data?.role}</option>
            <option value={"Product Owner"}>Product Owner</option>
            <option value={"Developer"}>Developer</option>
          </select>
        </div>

        <button type="submit" className={formBtn}>
          Edit User
        </button>
      </form>
    </div>
  );
}
