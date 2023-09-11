import React from "react";
import { Outlet } from "react-router-dom";
import CustomerPaymentNav from "../../components/CustomerPaymentComponents/CustomerPaymentNav";

function AllCustomerPaymentRoot() {
  return (
    <React.Fragment>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Customer Payments Overview
            </h2>
            <p className="text-muted-foreground">
              Manage and track payments made to your customers.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <CustomerPaymentNav />
          </div>
        </div>

        <Outlet />
      </div>
    </React.Fragment>
  );
}

export default AllCustomerPaymentRoot;
