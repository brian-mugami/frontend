import React, { useState } from "react";
import { getAuthToken } from "../../util/Auth";
import { json, useNavigate } from "react-router-dom";
import CustomerSearchPaymentForm from "../../components/CustomerPaymentComponents/CustomerSearchPaymentForm";
import CustomerPaymentsResultList from "../../components/CustomerPaymentComponents/CustomerPaymentsResultList";

function NewCustomerPaymentPage() {
  const [results, setResults] = useState([]);
  const [cusName, setCusName] = useState("");
  const navigate = useNavigate();

  async function onSearch(customerName) {
    const token = getAuthToken();
    setCusName(customerName);
    const response = await fetch(
      "https://inentory-test.onrender.com/customer/payment/search/?customer_name=" + customerName,
      {
        method: "get",
        headers: {
          Authorization: "Bearer " + token,
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    if (response.status === 404) {
      window.alert("No such customer is available. Please try again!!");
      navigate("./");
    }
    if (!response.ok) {
      throw json({ message: "No such request" }, { status: 500 });
    }
    const resData = await response.json();
    setResults(resData);
    if (resData.length === 0) {
      window.alert("That customer has no payments!!");
      navigate("./");
    }
    return results;
  }
  return (
    <React.Fragment>
      <CustomerSearchPaymentForm onSearch={onSearch} />
      {results && (
        <CustomerPaymentsResultList results={results} customer={cusName} />
      )}
    </React.Fragment>
  );
}

export default NewCustomerPaymentPage;
