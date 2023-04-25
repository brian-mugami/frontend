import React from "react";
import SupplierBalanceNav from "../../components/SupplierBalanceComponents/SupplierBalanceNav";
import { Outlet } from "react-router-dom";

function SupplierBalanceRoot() {
  return (
    <React.Fragment>
      <SupplierBalanceNav />
      <Outlet />
    </React.Fragment>
  );
}

export default SupplierBalanceRoot;