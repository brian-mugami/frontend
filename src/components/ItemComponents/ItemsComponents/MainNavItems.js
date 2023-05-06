import { Link, NavLink } from "react-router-dom";
import React from "react";
import { Outlet } from "react-router-dom";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { useState } from "react";

function ItemNavigation() {
  const data = [
    {
      label: "ITEMS",
      value: "ITEMS",
      desc: "./main",
    },
    {
      label: "ITEM CATEGORIES",
      value: "ITEM CATEGORIES",
      desc: "./category",
    },

    {
      label: "ITEM LOTS",
      value: "ITEM LOTS",
      desc: "./lot",
    },
  ];

  return (
    <React.Fragment>
      <Tabs id="custom-animation" value="html" className="py-5">
        <TabsHeader>
          {data.map(({ label, value, desc }) => (
            
            <Tab key={label} value={value}>
              <NavLink to={desc} className=" px-24">{label}</NavLink>
            </Tab>
          ))}
        </TabsHeader>
      </Tabs>
      <br></br>
      <Outlet />
    </React.Fragment>
  );
}

export default ItemNavigation;
