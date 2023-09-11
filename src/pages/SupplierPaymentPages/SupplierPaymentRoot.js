import React from "react";
import { Outlet } from "react-router-dom";
import SupplierPaymentNav from "../../components/SupplierPaymentComponents/SupplierPaymentNav";

function SupplierPaymentRoot() {
  return (
    <React.Fragment>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Supplier Payments Overview
            </h2>
            <p className="text-muted-foreground">
              Manage and track payments made to your suppliers.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <SupplierPaymentNav />
          </div>
        </div>

        <Outlet />
      </div>
    </React.Fragment>
  );
}

export default SupplierPaymentRoot;
