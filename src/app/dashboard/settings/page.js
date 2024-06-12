import SettiingsForm from "@/app/ui/dashboard/SettiingsForm";
import React, { Fragment } from "react";

export default function SettingsPage() {
  return (
    <Fragment>
      <div className="container mx-auto max-w-7xl p-8 bg-slate-600 rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-6">My Profile</h2>
        <SettiingsForm />
      </div>
    </Fragment>
  );
}
