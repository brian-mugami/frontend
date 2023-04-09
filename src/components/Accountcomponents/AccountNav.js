import { NavLink, useRouteLoaderData } from "react-router-dom";
import React from "react";
import "../Accountcomponents/AccountNav.css";

function AccountNavigation() {
  const token = useRouteLoaderData("root");

  return (
    <React.Fragment>
      <div className="accsidebar ">
        <div className="accsidebar-header">
          <h2>Accounts</h2>
        </div>

        <nav className="accsidebar-nav">
          
                  <NavLink className="sidebar-nav-link" to="/account/supplier">SupplierAccounts</NavLink>
                
                  <NavLink className="sidebar-nav-link" to="/account/item">Category Accounts</NavLink>

                  <NavLink className="sidebar-nav-link" to="/account/customer">Customer Accounts</NavLink>

                  <NavLink className="sidebar-nav-link" to="/account/payment">Payment Accounts</NavLink>

                  <NavLink className="sidebar-nav-link" to="/account/purchase">Purchase Accounts</NavLink>

                  <NavLink className="sidebar-nav-link" to="/account/sales">Sales Accounts</NavLink>

                  <NavLink className="sidebar-nav-link" to="/account/expense">Expense Accounts</NavLink>

        </nav>
      </div>
    </React.Fragment>
  );
}

export default AccountNavigation;
