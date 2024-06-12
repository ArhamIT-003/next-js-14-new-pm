"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

export default function RegisterForm() {
  const input =
    "p-2 rounded-md outline placeholder:text-xs text-black outline-none";

  const router = useRouter();

  const [user, setUser] = React.useState({
    username: "",
    email: "",
    password: "",
    role: "Product Owner",
    isActive: true,
  });

  const [loading, setLoading] = React.useState(false);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!user.username || !user.email || !user.password) {
      throw new Error("All credientials should be added!");
    }
    setLoading(true);

    try {
      setLoading(true);
      const { data } = await axios.post("/api/user/signup", user);
      router.push("/login");
      console.log(data.message);
    } catch (error) {
      setLoading(false);
      console.log(error.response.data.message);
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="flex flex-col gap-1 mb-2">
        <label htmlFor="name" className="font-bold">
          Username
        </label>
        <input
          id="name"
          name="username"
          type="text"
          className={input}
          placeholder="username"
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-1 mb-2">
        <label htmlFor="email" className="font-bold">
          Email
        </label>
        <input
          id="email"
          type="email"
          className={input}
          placeholder="user@email.com"
          name="email"
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-1 mb-2">
        <label htmlFor="password" className="font-bold">
          Password
        </label>
        <input
          id="password"
          type="password"
          className={input}
          placeholder="******"
          name="password"
          onChange={handleChange}
        />
      </div>

      {/*<div className="w-full my-4">
        <select className={`${input} w-full`} name="role">
          <option>Role</option>
          <option value={"Product Owner"}>Product Owner</option>
          <option value={"Developer"}>Developer</option>
          <option value={"pm"}>Project Manager</option>
          <option value={"Q/A"}>Q/A</option>
        </select>
      </div>*/}

      <button
        type="submit"
        className=" w-full text-lg font-semibold text-white bg-teal-700 px-4 py-2 rounded-lg"
      >
        {loading ? "Signing up" : "Sign-Up"}
      </button>
    </form>
  );
}
