"use client";
import { GetUserDetails } from "@/app/hooks/user/getUser";
import { Select, SelectItem } from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function SettingsForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [active, setActive] = useState("");

  const { mutate } = GetUserDetails();

  const router = useRouter();

  const roles = [
    { key: "Product Owner", label: "Product Owner" },
    { key: "Developer", label: "Developer" },
  ];

  const activeState = [
    { key: true, label: "is-Active" },
    { key: false, label: "not-Active" },
  ];

  const data = {
    username: username,
    email: email,
    password: password,
    role: role,
    active: Boolean(active),
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log(data);

    try {
      const res = await axios.put("/api/user/updateSingleUser", data);
      console.log(res);

      setUsername("");
      setEmail("");
      setPassword("");
      setRole("");
      setActive("");
      mutate();
      router.push("/dashboard");
      toast.success(res.data.message);
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={submitHandler} className="space-y-4">
      <div>
        <label htmlFor="username" className="block text-gray-200">
          Username:
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-3 text-black py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-gray-200">
          Email:
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-gray-200">
          Password (optional):
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>

      <div className="flex gap-4">
        <Select
          label="Your Role"
          placeholder="Select your role"
          onSelectionChange={(event) => {
            const selectedKey = event.currentKey;
            setRole(selectedKey);
          }}
          className="flex-1"
          color="default"
        >
          {roles.map((role) => (
            <SelectItem key={role.key} color="primary" className="bg-black">
              {role.label}
            </SelectItem>
          ))}
        </Select>

        <Select
          label="Your Current State"
          placeholder="Select your state"
          onSelectionChange={(event) => {
            const selectedKey = event.currentKey; // Extract the selected key
            setActive(selectedKey);
          }}
          className="flex-1"
          color="default"
        >
          {activeState.map((active) => (
            <SelectItem key={active.key} color="primary" className="bg-black">
              {active.label}
            </SelectItem>
          ))}
        </Select>
      </div>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Save Settings
      </button>

      {/* ... Display loading or success message ... */}
    </form>
  );
}

// {errors.email && <p className="text-red-500">{errors.email}</p>}
// {errors.username && <p className="text-red-500">{errors.username}</p>}
// {errors.password && <p className="text-red-500">{errors.password}</p>}
// {errors.role && <p className="text-red-500">{errors.role}</p>}
// {errors.active && <p className="text-red-500">{errors.active}</p>}
