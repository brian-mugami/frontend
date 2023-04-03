import React from "react";
import { NavLink } from "react-router-dom";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { Breadcrumbs } from "@material-tailwind/react";

function ItemNav(){
    return(
        <React.Fragment>
      <Breadcrumbs>
        <div className="flex justify">
          <PlusCircleIcon strokeWidth={3} className="h-6 w-6" />
          <NavLink to="./new">Add Item</NavLink>
        </div>
      </Breadcrumbs>
      
        </React.Fragment>
    )
}

export default ItemNav