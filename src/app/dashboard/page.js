"use client";

import React from "react";
import Card from "../ui/dashboard/Card";
import Rightbar from "../ui/dashboard/Rightbar";
import { GetUserDetails } from "../hooks/user/getUser";
import BasicPie from "../ui/dashboard/Charts";
// import Transaction from "../ui/dashboard/Transaction/Transaction";
// import Chart from "../ui/dashboard/Charts/Chart";
// import RightBar from "../ui/dashboard/RightBar/RightBar";

const Dashboard = () => {
  const { data, loading } = GetUserDetails();

  console.log(data);

  return (
    <div className={`flex  mt-[10px] gap-5`}>
      <div className={`flex-[4] flex flex-col gap-5`}>
        <div className={`flex justify-between items-center w-full`}>
          <Card projects={data?.projects} />
        </div>
        {/*<Transaction />*/}
        {/*<Chart />*/}
        <BasicPie projects={data?.projects} loading={loading} />
      </div>
      <div className={`flex-1`}>
        {/*<RightBar />*/}
        <Rightbar />
      </div>
    </div>
  );
};

export default Dashboard;
