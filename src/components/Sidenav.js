import { NavLink, Form, useRouteLoaderData } from "react-router-dom";
import React from "react";
import "../components/Sidenav.css";

function Sidebar() {
  const token = useRouteLoaderData("root");

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Sidebar</h2>
      </div>
      <nav className="sidebar-nav">
        {token && (
          <NavLink className="sidebar-nav-link" to="/home">
            Dashboard
          </NavLink>
        )}

        {token && (
          <NavLink className="sidebar-nav-link" to="/user">
            Users
          </NavLink>
        )}

        {token && (
          <NavLink className="sidebar-nav-link" to="account">
            Accounts
          </NavLink>
        )}
        {token && (
          <NavLink className="sidebar-nav-link" to="item">
            Item Details
          </NavLink>
        )}
        {token && (
          <NavLink className="sidebar-nav-link" to="customer">
            Customers
          </NavLink>
        )}
        {token && (
          <NavLink className="sidebar-nav-link" to="invoice">
            Invoices
          </NavLink>
        )}
        {token && ( <NavLink className="sidebar-nav-link" to="sales">Sales</NavLink>)}
        {token &&(  <NavLink  className="sidebar-nav-link" to="supplier">Suppliers</NavLink>)}
        {token && (
          <Form action="logout" method="post">
            <button className="btn btn-danger">Logout</button>
          </Form>
        )}
      </nav>
    </div>
  );
}

export default Sidebar;
