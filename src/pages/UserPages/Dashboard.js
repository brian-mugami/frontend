import React from "react";
import DashboardComps from "../../components/DashboardComps";
import Sidebar from "../../components/Sidenav";

function Dashboard() {
  return (
    <div className="flex">
      <aside className="h-screen sticky top-0">
        <Sidebar />
      </aside>
      <main className="pl-5 pr-5">
        <DashboardComps />
      </main>
    </div>
  );
}

export default Dashboard;
