import BacklogsTable from "@/app/ui/dashboard/BacklogsTable";
import { Button } from "@nextui-org/react";
import React from "react";
import Link from "next/link";

export default function Backlogs() {
  return (
    <div>
      <div className="flex justify-end mb-10">
        <Button as={Link} href="/dashboard/backlogs/add" color="primary">
          Add Backlogs
        </Button>
      </div>
      <BacklogsTable />
    </div>
  );
}
