import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink, Form, useRouteLoaderData } from "react-router-dom";
import "../components/Sidenav.css";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <div className="lg:hidden">
        <button
          className="fixed top-0 right-0 p-4"
          onClick={toggleSidebar}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      <div className={`sidebar fixed inset-y-0 left-0 w-64 px-8 py-4 transition duration-300 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0  lg:h-full`}
      >
          <div className="sidebar-header">
            <h2>Sidebar</h2>
          </div>
          <nav className="sidebar-nav">
            <NavLink className="sidebar-nav-link" to="/home">
              Dashboard
            </NavLink>

            <NavLink className="sidebar-nav-link" to="/user">
              Users
            </NavLink>

            <NavLink className="sidebar-nav-link" to="account">
              Accounts
            </NavLink>

            <NavLink className="sidebar-nav-link" to="item">
              Item Details
            </NavLink>

            <NavLink className="sidebar-nav-link" to="customer">
              Customers
            </NavLink>

            <NavLink className="sidebar-nav-link" to="purchase">
              Purchases
            </NavLink>

            <NavLink className="sidebar-nav-link" to="sales">
              Sales
            </NavLink>
            <NavLink className="sidebar-nav-link" to="supplier">
              Suppliers
            </NavLink>

            <Form action="logout" method="post">
              <button className="btn btn-danger">Logout</button>
            </Form>
          </nav>
        </div>
    </div>
  );
}

export default Sidebar;
