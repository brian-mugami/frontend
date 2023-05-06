import React from "react";
import { NavLink } from "react-router-dom"; // Fixed import for Redirect

import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";

export default function InventoryBalancesNav() {
  return (
    <div className="pb-5">
      <div className="nav justify-content-center">
        <NavLink to="." className="nav-link">
          All Balances
        </NavLink>

        <NavLink to="./search" className="nav-link flex">
          <div className="pr-2">Search</div>

        </NavLink>
        <Menu >
          <MenuHandler>
            <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 cursor-pointer text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
              Miscellaneous
            </span>
          </MenuHandler>
          <MenuList>
            <MenuItem>
              <NavLink to="./receipt" className="nav-link">
                Receipt Issue
              </NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink to="./issue" className="nav-link">
                Item Issue
              </NavLink>
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    </div>
  );
}
