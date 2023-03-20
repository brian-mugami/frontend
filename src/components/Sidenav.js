import React from "react";
import { NavLink, Form, useRouteLoaderData } from "react-router-dom";
import image from "../components/assets/intel.png"

export default function Sidebar() {
  const token = useRouteLoaderData("root");


    return (
        <div className="flex">
            <div className="flex flex-col h-screen p-3 bg-white shadow w-60">
                <div className="space-y-3">
                    <div className="flex items-center">
                        <h2 className="text-xl font-bold">Dashboard</h2>
                    </div>
                    <div className="flex-1">
                    <nav>
        <ul >
          <li>
            <NavLink to="/" end>
            <img  src={image}></img> 
            </NavLink>
            
          </li>
          {!token && (
            <li>
              <NavLink to="/auth?mode=login">Sign In</NavLink>
            </li>
          )}
          {token && (
            <li>
              <NavLink to="/user">Users</NavLink>
            </li>
          )}
          {token && (
            <li>
              <NavLink to="/home">Dashboard</NavLink>
            </li>
          )}
          {token && (
            <li>
              <NavLink to="/account">Accounts</NavLink>
            </li>
          )}
          {token &&(
            <li>
              <NavLink to="/item">Item Details</NavLink>
            </li>
          )}
          {token &&(
            <li>
              <NavLink to="/customer">Customers</NavLink>
            </li>
          )}
          {token &&(
            <li>
              <NavLink to="/supplier">Suppliers</NavLink>
            </li>
          )}
          {token && (
              <Form action="logout" method="post">
                <button className="btn btn-danger">Logout</button>
              </Form>
          )}
        </ul>
      </nav>
                    </div>
                </div>
            </div>
            
              
        </div>
    );
}