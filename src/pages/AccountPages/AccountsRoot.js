import React from "react";
import { Outlet } from "react-router-dom";
import AccountNavigation from "../../components/Accountcomponents/AccountNav";

function AccountRoot() {
  return (
    <React.Fragment>
      <div className="flex ">
        <AccountNavigation/>
      </div>
      <main className="flex-1 pr-5 pl-60">
        <Outlet />
      </main>
    </React.Fragment>
  );
}
export default AccountRoot;
