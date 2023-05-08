import React from "react";
import { Outlet, useRouteLoaderData } from "react-router-dom";
import SideNav from "../../components/SideNav";

function RootLayout() {
  const token = useRouteLoaderData("root");

  return (
    <React.Fragment>
      {token && <SideNav />}

      <div className={token ? "p-4 sm:ml-64" : ""}>
        <Outlet />
      </div>
    </React.Fragment>
  );
}

export default RootLayout;
