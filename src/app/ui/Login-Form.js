"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function LoginForm() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const input =
    "p-2 rounded-md outline placeholder:text-xs text-black outline-none";

  function onChangeHandler(e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }

  async function submitHandler(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post("/api/user/login", user);
      setLoading(false);
      router.push("/dashboard");
      console.log(data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submitHandler}>
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="font-bold">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="text"
          className={input}
          placeholder="user@email.com"
          onChange={onChangeHandler}
          value={user.email}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="font-bold">
          Password
        </label>
        <input
          id="password"
          type="password"
          name="password"
          className={input}
          placeholder="*********"
          onChange={onChangeHandler}
          value={user.password}
        />
      </div>

      <button
        type="submit"
        className="mt-4 w-full text-lg font-semibold text-white bg-teal-700 px-4 py-2 rounded-lg"
      >
        {loading ? "Loading" : "Login"}
      </button>
    </form>
  );
}
