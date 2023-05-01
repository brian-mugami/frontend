import React from "react";
import { Outlet, useRouteLoaderData } from "react-router-dom";
import Sidebar from "../../components/Sidenav";


function RootLayout() {
  const token = useRouteLoaderData("root");
  return (
    <React.Fragment>
      {token && <Sidebar />}
      <Outlet />
    </React.Fragment>
  );
}

export default RootLayout;
