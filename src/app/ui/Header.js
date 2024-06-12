import React from "react";

export default async function Header() {
  return (
    <div
      className={`pl-32 bg-gray-500 h-12 flex items-center transition-all ease-in-out px-20`}
    >
      <div className="w-full flex items-center justify-between">
        <h1 className="text-sm md:text-base lg:text-lg font-semibold text-white">
          Hi, Faisal Jawaid
        </h1>

        <div className="flex gap-2 ">
          <form className="py-2 px-4 bg-violet-500 rounded-lg hover:bg-purple-100">
            <button type="submit" className="text-sm text-white font-semibold">
              Logout
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
