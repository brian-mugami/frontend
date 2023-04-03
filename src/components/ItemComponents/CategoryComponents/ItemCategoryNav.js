import { Breadcrumbs } from "@material-tailwind/react";
import React from "react";
import { NavLink } from "react-router-dom";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

function ItemCatNav(){
    return(
        <React.Fragment>
      <Breadcrumbs>
        <div className="flex justify">
          <PlusCircleIcon strokeWidth={3} className="h-6 w-6" />
          <NavLink to="./new">Add Categories</NavLink>
        </div>
      </Breadcrumbs>
        </React.Fragment>
    )
}

export default ItemCatNav