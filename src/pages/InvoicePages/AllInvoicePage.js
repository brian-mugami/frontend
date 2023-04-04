import React from "react";
import { Suspense } from "react";
import { Await, json, defer, useRouteLoaderData } from "react-router";
import { getAuthToken } from "../../util/Auth";
import InvoiceList from "../../components/PurchasingComponents/InvoiceList";

function AllInvoicesPage() {
  const { invoices } = useRouteLoaderData("invoices");
  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading....</p>}>
      <Await resolve={invoices}>
        {(loadedInvoices) => (
          <InvoiceList invoices={loadedInvoices} title="Invoices" />
        )}
      </Await>
    </Suspense>
  );
}

export default AllInvoicesPage;

async function InvoiceLoader() {
  const token = getAuthToken();

  const response = await fetch("/invoices", {
    method: "get",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  if (!response.ok) {
    throw json({ message: "Could not fetch users" }, { status: 500 });
  } else {
    const resData = await response.json();
    if (resData.status === 401) {
      throw json({ message: "You are not authorized" }, { status: 401 });
    }
    console.log(resData);
    return resData;
  }
}

export async function loader() {
  return defer({
    invoices: await InvoiceLoader(),
  });
}