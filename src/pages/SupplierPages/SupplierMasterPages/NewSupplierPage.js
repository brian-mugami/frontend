import React from "react";
import { useLoaderData, json } from "react-router-dom";
import SupplierForm from "../../../components/SupplierComponents/SupplierForm";
import { getAuthToken } from "../../../util/Auth";

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

  const response = await fetch("https://flask-inventory.onrender.com/supplier/account", {
    method: "get",
    headers: {
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*",

    },
  });
  if (!response.ok) {
    throw json({ message: "The response was not ok" }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData;
  }
}
