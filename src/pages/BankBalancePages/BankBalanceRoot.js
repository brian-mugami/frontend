import React from "react";
import BankBalanceNav from "../../components/BankBalanceComponents/BankBalanceNav";
import { Outlet } from "react-router-dom";

function BankBalanceRoot() {
  return (
    <React.Fragment>
      <BankBalanceNav />
      <Outlet />
    </React.Fragment>
  );
}

export default BankBalanceRoot;
