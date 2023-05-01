import React from "react";
import { Outlet, useRouteLoaderData } from "react-router-dom";
<<<<<<< HEAD
import Sidebar from "../../components/Sidenav";


function RootLayout() {
  const token = useRouteLoaderData("root");
  return (
    <React.Fragment>
      {token && <Sidebar />}
      <Outlet />
=======

import Sidenav from "../../components/SideNav";

function RootLayout() {
  const token = useRouteLoaderData("root");

  return (
    <React.Fragment>
      {token && <Sidenav />}

      <div class="p-4 sm:ml-64">
        <Outlet />
      </div>
>>>>>>> c8977a5f4a6723b934fef64bd0d25a60e113bf2e
    </React.Fragment>
  );
}

export default RootLayout;
