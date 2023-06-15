import React from "react";
import { Outlet, useRouteLoaderData } from "react-router-dom";
import SideNav from "../../components/SideNav";

function RootLayout() {
  const token = useRouteLoaderData("root");

  return (
    <React.Fragment>
      {token && <SideNav />}

      <div className={token ? " sm:ml-0 md:ml-0 lg:ml-72" : ""}>
        <Outlet />
      </div>
    </React.Fragment>
  );
}

export default RootLayout;
