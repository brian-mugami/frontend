import React, { Suspense } from "react";
import CustomerPaymentsList from "../../components/CustomerPaymentComponents/CustomerPaymentsList";
import { getAuthToken } from "../../util/Auth";
import { Await, defer, json, useRouteLoaderData } from "react-router-dom";

function AllCustomerPayments() {
    const {payments} = useRouteLoaderData("customer-payments")
  return (
    <Suspense fallback={<p>Loading....</p>}>
        <Await resolve={payments}>
        {(loadedPayments) => <CustomerPaymentsList payments={loadedPayments} />}
        </Await>
  </Suspense>);
}
export default AllCustomerPayments;

async function AllCustomerPaymentsLoader() {
  const token = getAuthToken();
  const response = await fetch("/customer/payment", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    throw json({ message: "No payments loaded" }, { status: 500 });
  }

  const resData = await response.json();
  return resData;
}

export async function loader(){
    return defer({
        payments : AllCustomerPaymentsLoader()
    })
}