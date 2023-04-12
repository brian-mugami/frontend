import React from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import Sidebar from "../../components/Sidenav";

function RootLayout() {
  const token = useLoaderData();

  return (
    <React.Fragment>
      {token && (
        <div className="flex ">
          <Sidebar />
        </div>
      )}
      <main className="flex-1 ml-60">
        <Outlet />
      </main>
    </React.Fragment>
  );
}

export default RootLayout;
