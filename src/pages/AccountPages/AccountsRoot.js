import React from "react";
import { Outlet } from "react-router-dom";
import AccountNavigation from "../../components/AccountComponents/AccountNav";

function AccountRoot() {
  return (
    <React.Fragment>
      
      <main className="">
        <Outlet />
      </main>
    </React.Fragment>
  );
}
export default AccountRoot;