import React from "react";
<<<<<<< HEAD
import { Outlet, useRouteLoaderData } from "react-router-dom";
import MainNavigation from "../../components/UserComponents/MainNavigation";
=======
import { Outlet } from "react-router-dom";
>>>>>>> origin/Mugamidb
import Sidebar from "../../components/Sidenav";

function RootLayout() {
  const token = useRouteLoaderData("root");

  
  return (
    <React.Fragment>

      <div className="flex ">
      {token && (
      <Sidebar/>
      )}
      </div>
      <main className="flex-1 ml-60">
      <Outlet />
      </main>
      
    </React.Fragment>
  );
}

export default RootLayout;
