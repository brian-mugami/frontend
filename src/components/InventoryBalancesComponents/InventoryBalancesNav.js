import React from "react";
import { NavLink } from "react-router-dom"; // Fixed import for Redirect

export default function InventoryBalancesNav() {
  return (
    <React.Fragment>
      <div className="nav justify-content-center">
        <NavLink to="." className="nav-link">
          All Balances
        </NavLink>

        <NavLink to="./receipt" className="nav-link">
          Misc Receipt
        </NavLink>

        <NavLink to="./issue" className="nav-link">
          Misc Issue
        </NavLink>

        <NavLink to="./search" className="nav-link">
          Search
        </NavLink>
      </div>
    </React.Fragment>
  );
}
