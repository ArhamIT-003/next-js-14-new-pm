import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className={`mt-[10px] flex items-center justify-between`}>
      <div className={`font-bold`}>Manage-Project</div>
      <div className={`text-xs`}>All right reserved {year}.</div>
    </div>
  );
};

export default Footer;
