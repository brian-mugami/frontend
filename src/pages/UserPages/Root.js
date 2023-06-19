import React from "react";
import { Outlet, useRouteLoaderData } from "react-router-dom";
import SideNav from "../../components/SideNav";

function RootLayout() {
  const token = useRouteLoaderData("root");

  return (
    <React.Fragment>
      {token && <SideNav />}

      <div className={token ? " sm:px-2 md:px-4 lg:ml-72" : ""}>
        <Outlet />
      </div>
    </React.Fragment>
  );
}

export default RootLayout;
