import React from "react";
import { Outlet, useRouteLoaderData } from "react-router-dom";
import Sidebar from "../../components/Sidenav";

function RootLayout() {
  const token = useRouteLoaderData("root")
  return (
    <React.Fragment>
      <div></div>
      {token && (
        <Sidebar/>
      )}
      <main className="flex-0.5 ml-60">
        <Outlet />
      </main>
    </React.Fragment>
  );
}

export default RootLayout;
