import React from "react";
import { Outlet } from "react-router-dom";
import CustomerBalanceNav from "../../components/CustomerBalancesComponents/CustomerBalanceNav";

function CustomerBalanceRoot() {
  return (
    <React.Fragment>
      <CustomerBalanceNav />
      <Outlet />
    </React.Fragment>
  );
}

export default CustomerBalanceRoot;