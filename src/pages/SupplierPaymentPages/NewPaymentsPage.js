import React, { useState } from "react";
import SupplierPaymentSearchForm from "../../components/SupplierPaymentComponents/SupplierPaymentSearchForm";
import PendingSupplierPaymentsList from "../../components/SupplierPaymentComponents/PendingSupplierPaymentsList";
import { getAuthToken } from "../../util/Auth";
import { json, useNavigate } from "react-router-dom";

function NewPaymentsPage() {
  const [results, setResults] = useState([]);
  const [supName, setSupName] = useState("");
  const navigate = useNavigate()

  async function onSearch(supplierName) {
    const token = getAuthToken();
    setSupName(supplierName);
    const response = await fetch(
      "https://inentory-test.onrender.com/payment/search/?supplier_name=" + supplierName,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    if (response.status === 404) {
        window.alert("No such supplier is available. Please try again!!")
        navigate("./")
    }
    if (!response.ok) {
      throw json({ message: "No such request" }, { status: 500 });
    }
    const resData = await response.json();
    if(resData.length === 0){
      window.alert("No such supplier has a pending payment!")
      navigate("./")
    }
    setResults(resData);
 
    return results;
  }

  return (
    <React.Fragment>
      <SupplierPaymentSearchForm onSearch={onSearch} />
      {results.length > 0 && <PendingSupplierPaymentsList results={results} supplier={supName} />}
    </React.Fragment>
  );
}

export default NewPaymentsPage;
