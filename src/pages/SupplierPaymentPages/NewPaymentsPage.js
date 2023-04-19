import React, { useState } from "react";
import SupplierPaymentSearchForm from "../../components/SupplierPaymentComponents/SupplierPaymentSearchForm";
import PendingSupplierPaymentsList from "../../components/SupplierPaymentComponents/PendingSupplierPaymentsList";
import { getAuthToken } from "../../util/Auth";
import { json, redirect } from "react-router-dom";

function NewPaymentsPage() {
  const [results, setResults] = useState([]);
  const [supName, setSupName] = useState("")

  async function onSearch(supplierName) {
    const token = getAuthToken();
    setSupName(supplierName)
    const response = await fetch(
      "/payment/search/?supplier_name=" + supplierName,
      {
        method: "get",
        headers: {
          Authorization: "Bearer " + token,
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    if (!response.ok) {
      throw json({ message: "No such request" }, { status: 500 });
    }
    const resData = await response.json();
    if (resData.length === 0) {
      window.alert("No pending invoices for this supplier or supplier does not exist!!");
      return redirect("./");
    }
    setResults(resData)
    return results;
  }

  return (
    <React.Fragment>
      <SupplierPaymentSearchForm onSearch={onSearch}/>
      {results.length > 0 && <PendingSupplierPaymentsList results={results} supplier={supName} />}
    </React.Fragment>
  );
}

export default NewPaymentsPage;

