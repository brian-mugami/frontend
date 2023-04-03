import React from "react";
import { useLoaderData, json, Link } from "react-router-dom";
import SupplierForm from "../../../components/SupplierComponents/SupplierForm";
import { getAuthToken } from "../../../util/Auth";
import { Breadcrumbs } from "@material-tailwind/react";

function NewSupplierPage() {
  const accounts = useLoaderData();

  return (
    <React.Fragment>


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
