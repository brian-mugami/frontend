import { Breadcrumbs } from "@material-tailwind/react";
import { NavLink } from "react-router-dom";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

function AccountNav() {
  return (
    <Breadcrumbs>
      <div className="flex justify">
        <PlusCircleIcon strokeWidth={3} className="h-6 w-6" />
        <NavLink to="./new">Add Account</NavLink>
      </div>
    </Breadcrumbs>
  );
}

export default AccountNav;
