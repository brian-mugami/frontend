import { NavLink, Form} from "react-router-dom";
import React from "react";
import "../components/Sidenav.css";
import { ProSidebarProvider, Menu, MenuItem, SubMenu, SidebarHeader, SidebarContent, SidebarFooter } from "react-pro-sidebar";
import 'react-pro-sidebar/dist/'

function Sidebar() {
  

  return (
    <div className="sidebar">
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
       
       
          <NavLink className="sidebar-nav-link" to="invoice">
            Invoices
          </NavLink>
       
       
          <NavLink className="sidebar-nav-link" to="receipt">
            Receipt
          </NavLink>
       
       
          <NavLink className="sidebar-nav-link" to="supplier">
            Suppliers
          </NavLink>
        
          <NavLink className="sidebar-nav-link" to="payment">
            Supplier Payments
          </NavLink>
        
          <NavLink className="sidebar-nav-link" to="customer-payment">
            Customer Payments
          </NavLink>
        
          <NavLink className="sidebar-nav-link" to="inventory-balance">
            Inventory Balances
          </NavLink>
       
          <NavLink className="sidebar-nav-link" to="bank-balances">
            Bank Balances
          </NavLink>
      
          <NavLink className="sidebar-nav-link" to="supplier-balances">
           Supplier  Balances
          </NavLink>
       
          <NavLink className="sidebar-nav-link" to="customer-balances">
            Customer Balances
          </NavLink>
      
          <Form action="logout" method="post">
            <button className="btn btn-danger">Logout</button>
          </Form>
       
      </nav>
    </div>
  );
}

export default Sidebar;
