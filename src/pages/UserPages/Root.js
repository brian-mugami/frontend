import React from "react";
import { Outlet, useRouteLoaderData } from "react-router-dom";

import Sidenav from "../../components/SideNav";

function RootLayout() {
  const token = useRouteLoaderData("root");

  return (
    <React.Fragment>
      {token && <Sidenav />}

      <div class="p-4 sm:ml-64">
        <Outlet />
      </div>
    </React.Fragment>
  );
}

export default RootLayout;
