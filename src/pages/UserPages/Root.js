import React from "react";
<<<<<<< HEAD
import { Outlet, useLoaderData } from "react-router-dom";
=======
import { Outlet, useRouteLoaderData } from "react-router-dom";
>>>>>>> origin/mugami_frontend
import Sidebar from "../../components/Sidenav";
 

function RootLayout() {
<<<<<<< HEAD
  const token = useLoaderData();

  return (
    <React.Fragment>
      {token && (
        <div className="flex ">
          <Sidebar />
        </div>
=======
  const token = useRouteLoaderData("root")
  return (
    <React.Fragment>
      <div></div>
      {token && (
        <div className="flex ">
        <Sidebar />
      </div>
>>>>>>> origin/mugami_frontend
      )}
      <main className="flex-1 ml-60">
        <Outlet />
      </main>
    </React.Fragment>
  );
}

export default RootLayout;
