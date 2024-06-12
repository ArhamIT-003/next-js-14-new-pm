"use client";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function AddBacklogsPage() {
  const formCss =
    "p-5 border-[2px] rounded-[5px] border-[#2e374a] text-black outline-none";
  const formInput = "w-full text-black outline-none";
  const formBtn =
    "w-full p-5 border-none rounded-[5px] bg-teal-400 cursor-pointer font-bold text-base outline-none";

  const [formData, setFormData] = useState({
    name: "",
    requirement: "",
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
      await axios.post("/api/backlogs/add", formData);
      router.push("/dashboard/backlogs");
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
          placeholder="Enter project Name"
          name="name"
          className={`${formCss} ${formInput}`}
          value={formData.name}
          onChange={changeHandler}
        />
        <textarea
          name="requirement"
          id="requirement"
          rows="16"
          placeholder="Enter the requirements"
          className={`${formCss} w-full`}
          value={formData.requirement}
          onChange={changeHandler}
        ></textarea>
        <select
          name="isActive"
          id="isActive"
          className={`${formCss} ${formInput}`}
          onChange={changeHandler}
        >
          <option value={true}>isActive</option>
          <option value={false}>No</option>
          <option value={true}>Yes</option>
        </select>
        <button type="submit" className={formBtn}>
          Add
        </button>
      </form>
    </div>
  );
}
