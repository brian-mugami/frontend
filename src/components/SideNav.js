import React, { useState } from "react";
import { Form, NavLink } from "react-router-dom";
import { useRouteLoaderData } from "react-router-dom";

import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import "./SideNav.css";
import Kd from "../components/assets/ktslogo.png";
import { getAuthToken } from "../util/Auth";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

function SideNav() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const { user, token } = useRouteLoaderData("root");

  return (
    <div>
      {" "}
      {token && (
        <div className="">
          
          <button
            type="button"
            className="-m-2.5 inline-flex ml-80 md:ml-[700px] lg:hidden  mt-4 items-center justify-center rounded-full p-2.5 text-white bg-indigo-600"
            onClick={toggleSidebar}
          >
            <span className="sr-only ">Toggle sidebar</span>
            {sidebarOpen ? (
              <XMarkIcon className="h-6 w-6 sm:animate-bounce " aria-hidden="true" />
            ) : (
              <Bars3Icon className="h-6 w-6 sm:animate-pulse " aria-hidden="true" />
            )}
          </button>
          

          <aside
            id="separator-sidebar"
            className={`fixed top-0 left-0 z-40  w-64 h-screen transition-transform ${
              sidebarOpen ? "" : "-translate-x-full lg:translate-x-0"
            }`}
            aria-label="Sidebar"
          >
            <div
              className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800"
              onClick={toggleSidebar}
            >
              <NavLink to="/home">
                <img src={Kd} alt="logo" />
              </NavLink>
              <NavLink className="sidebar-nav-link" to="/home">
                Dashboard
              </NavLink>

              {user && user.is_admin === true ? (
                <NavLink className="sidebar-nav-link" to="/user">
                  Users
                </NavLink>
              ) : null}

              <NavLink className="sidebar-nav-link" to="invoice">
                Invoices
              </NavLink>

              <NavLink className="sidebar-nav-link" to="receipt">
                Receipt
              </NavLink>

              <Menu>
                <MenuHandler>
                  <div className="sidebar-nav-link">Payments</div>
                </MenuHandler>
                <MenuList>
                  <MenuItem>
                    <NavLink className="sidebar-nav-link" to="payment">
                      Supplier Payments
                    </NavLink>
                  </MenuItem>
                  <MenuItem>
                    <NavLink className="sidebar-nav-link" to="customer-payment">
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
                    <NavLink
                      className="sidebar-nav-link"
                      to="supplier-balances"
                    >
                      Supplier Balances
                    </NavLink>
                  </MenuItem>
                  <MenuItem>
                    <NavLink
                      className="sidebar-nav-link"
                      to="customer-balances"
                    >
                      Customer Balances
                    </NavLink>
                  </MenuItem>
                  <MenuItem>
                    <NavLink
                      className="sidebar-nav-link"
                      to="inventory-balance"
                    >
                      Inventory Balances
                    </NavLink>
                  </MenuItem>
                  <MenuItem>
                    <NavLink className="sidebar-nav-link" to="expense-balance">
                      Expense Balances
                    </NavLink>
                  </MenuItem>
                  <MenuItem>
                    <NavLink className="sidebar-nav-link" to="bank-balances">
                      Bank Balances
                    </NavLink>
                  </MenuItem>
                </MenuList>
              </Menu>

              <NavLink className="sidebar-nav-link" to="reports">
                Reports
              </NavLink>

              {user && user.is_admin && (
                <Menu>
                  <MenuHandler>
                    <div className="sidebar-nav-link">Uploads</div>
                  </MenuHandler>
                  <MenuList>
                    <MenuItem>
                      <NavLink
                        className="sidebar-nav-link"
                        to="upload-itemAccounts"
                      >
                        Upload Item Accounts
                      </NavLink>
                    </MenuItem>
                    <MenuItem>
                      <NavLink
                        className="sidebar-nav-link"
                        to="upload-itemCategory"
                      >
                        Upload Item Categories
                      </NavLink>
                    </MenuItem>
                    <MenuItem>
                      <NavLink
                        className="sidebar-nav-link"
                        to="upload-inventory"
                      >
                        Upload Inventory
                      </NavLink>
                    </MenuItem>
                    <MenuItem>
                      <NavLink className="sidebar-nav-link" to="upload-item">
                        Upload Items
                      </NavLink>
                    </MenuItem>
                  </MenuList>
                </Menu>
              )}

              <Menu>
                <MenuHandler>
                  <div className="sidebar-nav-link">More...</div>
                </MenuHandler>
                <MenuList>
                  <MenuItem>
                    {" "}
                    <NavLink className="sidebar-nav-link" to="customer">
                      Customers
                    </NavLink>
                  </MenuItem>
                  <MenuItem>
                    <NavLink className="sidebar-nav-link" to="supplier">
                      Suppliers
                    </NavLink>
                  </MenuItem>
                  <Menu placement="right-start" offset={15}>
                    <MenuHandler>
                      <MenuItem>
                        <NavLink className="sidebar-nav-link" to="account">
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
                          Supplier Accounts
                        </NavLink>
                      </MenuItem>
                      <MenuItem>
                        <NavLink
                          className="sidebar-nav-link"
                          to="/account/item"
                        >
                          Category Accounts
                        </NavLink>
                      </MenuItem>
                      <MenuItem>
                        {" "}
                        <NavLink
                          className="sidebar-nav-link"
                          to="/account/customer"
                        >
                          Customer Accounts
                        </NavLink>
                      </MenuItem>
                      <MenuItem>
                        <NavLink
                          className="sidebar-nav-link"
                          to="/account/bank"
                        >
                          Bank Accounts
                        </NavLink>
                      </MenuItem>
                      <MenuItem>
                        <NavLink
                          className="sidebar-nav-link"
                          to="/account/purchase"
                        >
                          Purchase Accounts
                        </NavLink>
                      </MenuItem>
                      <MenuItem>
                        <NavLink
                          className="sidebar-nav-link"
                          to="/account/sales"
                        >
                          Sales Accounts
                        </NavLink>
                      </MenuItem>
                      <MenuItem>
                        {" "}
                        <NavLink
                          className="sidebar-nav-link"
                          to="/account/expense"
                        >
                          Expense Accounts
                        </NavLink>
                      </MenuItem>
                      <MenuItem>
                        {" "}
                        <NavLink
                          className="sidebar-nav-link"
                          to="/account/inv-adj"
                        >
                          Adjustment Accounts
                        </NavLink>
                      </MenuItem>
                    </MenuList>
                  </Menu>
                  <MenuItem>
                    {" "}
                    <NavLink className="sidebar-nav-link" to="item">
                      Inventory
                    </NavLink>
                  </MenuItem>
                </MenuList>
              </Menu>

              <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
                <li>
                  <Form action="logout" method="post">
                    <button className="btn btn-danger">Logout</button>
                  </Form>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

export default SideNav;
