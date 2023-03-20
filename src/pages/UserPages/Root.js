import React from "react";
import { Outlet } from "react-router-dom";
import MainNavigation from "../../components/UserComponents/Mainnavigation";
import Sidebar from "../../components/Sidenav";

function RootLayout() {
  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  );
}

export default RootLayout;
