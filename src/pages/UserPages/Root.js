import React from "react";
import { Outlet } from "react-router-dom";
import MainNavigation from "../../components/UserComponents/MainNavigation";
import Sidebar from "../../components/Sidenav";

function RootLayout() {

  
  return (
    <React.Fragment>
      <div className="flex ">
      
      <Sidebar/>
      </div>
      <main className="flex-1 ml-60">
      <Outlet />
      </main>
      
    </React.Fragment>
  );
}

export default RootLayout;
