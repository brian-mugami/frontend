import React from "react";
import { Outlet } from "react-router-dom";
import MainNavigation from "../../components/UserComponents/MainNavigation";

function RootLayout() {
  return (
    <React.Fragment>
      <MainNavigation/>
      <Outlet />
    </React.Fragment>
  );
}

export default RootLayout;
