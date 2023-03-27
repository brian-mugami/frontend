import React from "react";
import { useLoaderData, json, Link } from "react-router-dom";
import SupplierForm from "../../../components/SupplierComponents/SupplierForm";
import { getAuthToken } from "../../../util/Auth";
import { Breadcrumbs } from "@material-tailwind/react";

function NewSupplierPage() {
  const accounts = useLoaderData();

  return (
    <React.Fragment>
      <Breadcrumbs>
        <Link to="/home" className="opacity-60">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
        </Link>
        <Link to="/supplier" className="opacity-60">
          <span>Suppliers</span>
        </Link>
        <a href="#">New Supplier</a>
      </Breadcrumbs>

      <SupplierForm method="post" title="Creation" accounts={accounts} />
    </React.Fragment>
  );
}

export default NewSupplierPage;

export async function loader() {
  const token = getAuthToken();

  const response = await fetch("/supplier/account", {
    method: "get",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  if (!response.ok) {
    throw json({ message: "The response was not ok" }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData;
  }
}
