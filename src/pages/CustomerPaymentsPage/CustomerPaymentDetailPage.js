import React from "react";
import { getAuthToken } from "../../util/Auth";
import {
  json,
  redirect,
  useRouteLoaderData,
} from "react-router-dom";
import CustomerPaymentItem from "../../components/CustomerPaymentComponents/CustomerPaymentItem";

function CustomerPaymentDetailPage() {
  const payment  = useRouteLoaderData("customer-payment-detail");
  return (
    <CustomerPaymentItem payment={payment} />
  );
}

export default CustomerPaymentDetailPage;

export async function loader({ params, request }) {
  const id = params.id;
  const token = getAuthToken();
  let url = "https://inventory-accounting.onrender.com/customer/payment/";
  const response = await fetch(url + id, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*",
    },
  });
  if (response.status === 404) {
    window.alert("Payment does not exist");
    return redirect("/customer-payment");
  }
  if (!response.ok) {
    throw json({ message: "This is a wrong request" }, { status: 500 });
  }

  const resData = await response.json();
  return resData;
}
