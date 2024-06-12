import React from "react";
import Image from "next/image";
import { MdPlayCircleFilled } from "react-icons/md";

const Rightbar = () => {
  return (
    <div className={`fixed`}>
      <div className={`relative px-5 rounded-[10px] mb-5 bg-[#3b7768] py-4`}>
        <div className={`absolute bottom-0 right-0 w-1/2 h-1/2`}>
          <Image
            src={""}
            alt=""
            fill
            className={`object-contain opacity-[0.2]`}
          />
        </div>
        <div className={`flex flex-col justify-center gap-5`}>
          <span className={`font-bold`}>🔥Lorem ipsum.</span>
          <h3 className={`text-xs font-medium`}>
            Lorem ipsum dolor sit amet, consectetur adipisicing.
          </h3>
          <span className={``}>Lorem ipsum dolor sit amet.</span>
          <p className={``}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam,
            harum!
          </p>
          <button
            className={`max-w-max flex items-center gap-[10px] p-[10px] mx-2 rounded-[5px] border-none bg-[#5d57c9] cursor-pointer`}
          >
            <MdPlayCircleFilled />
            Watch
          </button>
        </div>
      </div>
    </div>
  );
};

export default Rightbar;

// "/astronaut.png"
