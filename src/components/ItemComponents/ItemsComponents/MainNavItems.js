import { NavLink, useNavigate } from "react-router-dom";
import React from "react";
import { Outlet } from "react-router-dom";
import { Tabs, TabsHeader, Tab } from "@material-tailwind/react";

function ItemNavigation() {
  const data = [
    {
      label: "ITEMS",
      value: "ITEMS",
      desc: "./main",
    },
    {
      label: "CATEGORIES",
      value: "CATEGORIES",
      desc: "./category",
    },
    {
      label: "LOTS",
      value: "LOTS",
      desc: "./lot",
    },
  ];

  const navigate = useNavigate();

  const handleSelectChange = (event) => {
    const selectedDesc = event.target.value;
    navigate(selectedDesc);
  };

  return (
    <React.Fragment>
      <div className="sm:hidden">
        <select
          className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          onChange={handleSelectChange}
        >
          {data.map(({ label, value, desc }) => (
            <option key={label} value={desc}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <Tabs id="custom-animation" value="html" className="py-5">
          <TabsHeader>
            {data.map(({ label, value, desc }) => (
              <Tab key={label} value={value}>
                <NavLink to={desc} className="px-24">
                  {label}
                </NavLink>
              </Tab>
            ))}
          </TabsHeader>
        </Tabs>
      </div>
      <br></br>
      <Outlet />
    </React.Fragment>
  );
}

export default ItemNavigation;
