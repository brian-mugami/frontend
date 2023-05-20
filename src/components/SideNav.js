import React, { useState } from "react";
import { Form, NavLink } from "react-router-dom";
import { Outlet, useRouteLoaderData } from "react-router-dom";

import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import "../components/SideNav.css";
import Kd from "../components/assets/ktslogo.png"

function SideNav() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };


  const token = useRouteLoaderData("root");

  
  

  return (
   
    
    <div> {token && 
      <div className="">
        <button
          data-drawer-target="separator-sidebar"
          data-drawer-toggle="separator-sidebar"
          aria-controls="separator-sidebar"
          type="button"
          className="inline-flex items-center p-2 mt-2 ml-80 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          onClick={toggleSidebar}
        >
          <span className="sr-only">{sidebarOpen ? "Close" : "Open"} sidebar</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clip-rule="evenodd"
              fill-rule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            ></path>
          </svg>
        </button>

        <aside
          id="separator-sidebar"
          className={`fixed top-0 left-0 z-40  w-64 h-screen transition-transform ${
            sidebarOpen ? "" : "-translate-x-full sm:translate-x-0"
          }`}
          aria-label="Sidebar"
        >
          <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 " >
            <NavLink to="/home" onClick={toggleSidebar}>
            <img src={Kd} alt="logo"/>
            </NavLink>
            <NavLink className="sidebar-nav-link" to="/home" onClick={toggleSidebar}>
              Dashboard
            </NavLink>

            <NavLink className="sidebar-nav-link" to="/user" onClick={toggleSidebar}>
              Users
            </NavLink>

            <NavLink className="sidebar-nav-link" to="invoice" onClick={toggleSidebar}>
              Invoices
            </NavLink>

            <NavLink className="sidebar-nav-link" to="receipt" onClick={toggleSidebar}>
              Receipt
            </NavLink>

            <Menu>
              <MenuHandler>
                <div className="sidebar-nav-link">Payments</div>
              </MenuHandler>
              <MenuList>
                <MenuItem>
                  <NavLink className="sidebar-nav-link" to="payment" onClick={toggleSidebar}>
                    Supplier Payments
                  </NavLink>
                </MenuItem>
                <MenuItem>
                  <NavLink className="sidebar-nav-link" to="customer-payment" onClick={toggleSidebar}>
                    Customer Payments
                  </NavLink>
                </MenuItem>
              </MenuList>
            </Menu>

            <Menu>
              <MenuHandler>
                <div className="sidebar-nav-link">Balances</div>
              </MenuHandler>
              <MenuList>
                <MenuItem>
                  <NavLink className="sidebar-nav-link" to="supplier-balances" onClick={toggleSidebar}>
                    Supplier Balances
                  </NavLink>
                </MenuItem>
                <MenuItem>
                  <NavLink className="sidebar-nav-link" to="customer-balances" onClick={toggleSidebar}>
                    Customer Balances
                  </NavLink>
                </MenuItem>
                <MenuItem>
                  <NavLink className="sidebar-nav-link" to="inventory-balance" onClick={toggleSidebar}>
                    Inventory Balances
                  </NavLink>
                </MenuItem>
                <MenuItem>
                  <NavLink className="sidebar-nav-link" to="bank-balances" onClick={toggleSidebar}>
                    Bank Balances
                  </NavLink>
                </MenuItem>
              </MenuList>
            </Menu>

            <Menu>
              <MenuHandler>
                <div className="sidebar-nav-link">Edit</div>
              </MenuHandler>
              <MenuList>
                <MenuItem>
                  {" "}
                  <NavLink className="sidebar-nav-link" to="customer" onClick={toggleSidebar}>
                    Customers
                  </NavLink>
                </MenuItem>
                <MenuItem>
                  <NavLink className="sidebar-nav-link" to="supplier" onClick={toggleSidebar}>
                    Suppliers
                  </NavLink>
                </MenuItem>
                <Menu placement="right-start" offset={15}>
                  <MenuHandler>
                    <MenuItem>
                      <NavLink className="sidebar-nav-link" to="account" onClick={toggleSidebar}>
                        Accounts
                      </NavLink>
                    </MenuItem>
                  </MenuHandler>
                  <MenuList>
                    <MenuItem>
                      {" "}
                      <NavLink
                        className="sidebar-nav-link"
                        to="/account/supplier"
                      >
                        SupplierAccounts
                      </NavLink>
                    </MenuItem>
                    <MenuItem>
                      <NavLink className="sidebar-nav-link" to="/account/item" onClick={toggleSidebar}>
                        Category Accounts
                      </NavLink>
                    </MenuItem>
                    <MenuItem>
                      {" "}
                      <NavLink
                        className="sidebar-nav-link"
                        to="/account/customer"
                        onClick={toggleSidebar}
                      >
                        Customer Accounts
                      </NavLink>
                    </MenuItem>
                    <MenuItem>
                      <NavLink
                        className="sidebar-nav-link"
                        to="/account/bank"
                        onClick={toggleSidebar}
                      >
                        Bank Accounts
                      </NavLink>
                    </MenuItem>
                    <MenuItem>
                      <NavLink
                        className="sidebar-nav-link"
                        to="/account/purchase"
                        onClick={toggleSidebar}
                      >
                        Purchase Accounts
                      </NavLink>
                    </MenuItem>
                    <MenuItem>
                      <NavLink className="sidebar-nav-link" to="/account/sales" onClick={toggleSidebar}>
                        Sales Accounts
                      </NavLink>
                    </MenuItem>
                    <MenuItem>
                      {" "}
                      <NavLink
                        className="sidebar-nav-link"
                        to="/account/expense"
                        onClick={toggleSidebar}
                      >
                        Expense Accounts
                      </NavLink>
                    </MenuItem>
                    <MenuItem>
                      {" "}
                      <NavLink
                        className="sidebar-nav-link"
                        to="/account/inv-adj"
                        onClick={toggleSidebar}
                      >
                        Adjustment Accounts
                      </NavLink>
                    </MenuItem>
                  </MenuList>
                </Menu>
                <MenuItem>
                  {" "}
                  <NavLink className="sidebar-nav-link" to="item" onClick={toggleSidebar}>
                  Inventory
                  </NavLink>
                </MenuItem>
              </MenuList>
            </Menu>

            <ul class="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
              <li>
                <Form action="logout" method="post">
                  <button className="btn btn-danger">Logout</button>
                </Form>
              </li>
            </ul>
          </div>
        </aside>
      </div> }
    </div>
 
  );
}

export default SideNav;
