import React from "react";
import Sidebar from "../ui/dashboard/Sidebar";
import Navbar from "../ui/dashboard/Navbar";
import Footer from "../ui/dashboard/Footer";

export default function layout({ children }) {
  return (
    <div className="flex">
      <div className="flex-[1] min-h-[100vh] p-5">
        <Sidebar />
      </div>
      <div className="flex-[6] p-5">
        <Navbar />
        {children}
        <Footer />
      </div>
    </div>
  );
}
