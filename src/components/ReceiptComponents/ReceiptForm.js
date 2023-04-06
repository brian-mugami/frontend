import React from "react";

import {
  Form,
  useNavigate,
  useNavigation,
  useActionData,
  redirect,
  json,
  useLoaderData,
} from "react-router-dom";
import { getAuthToken } from "../../util/Auth";
import { purchaseTypes } from "../../data/paymenttypes";

function ReceiptForm({ receiptData, title, method }) {
  const customers = useLoaderData()
  const navigate = useNavigate();
  const navigation = useNavigation();
  const date = new Date().toISOString().slice(0, 10);
  const data = useActionData();

  const isSubmitting = navigation.state === "submitting";
  function cancelHandler() {
    navigate("..");
  }
  return (
    <React.Fragment>
      <h1> {title}</h1>
      {data && data.errors && (
        <ul>
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      <Form method={method}>
        <p>
          <label>Receipt Number</label>
          <input
            placeholder="Receipt Number"
            name="receipt_number"
            type="text"
            disabled
            defaultValue={receiptData ? receiptData.receipt_number : ""}
          ></input>
        </p>
        <p>
          <label>Amount</label>
          <input
            placeholder="Receipt Amount"
            name="receipt_amount"
            type="number"
            step="0.0001"
            defaultValue={receiptData ? receiptData.amount : 0}
          ></input>
        </p>
        <p>
          <label>Currency</label>
          <input
            placeholder="Currency"
            name="currency"
            type="text"
            defaultValue={receiptData ? receiptData.currency : "KES"}
          ></input>
        </p>
        <p>
          <label>Description</label>
          <input
            placeholder="Description"
            name="description"
            type="text"
            defaultValue={receiptData ? receiptData.description : ""}
          ></input>
        </p>
        <p>
          <label>Customer</label>
          <select
            name="customer"
            type="text"
            required
            defaultValue={receiptData ? receiptData.customer.customer_name : ""}
          >
            {customers.map((customer) => (
              <option key={customer.id} value={customer.customer_name}>
                {" "}
                {customer.customer_name}
              </option>
            ))}
          </select>
        </p>
        <p>
          <label>Sale Type</label>
          <select
            name="sale_type"
            type="text"
            required
            defaultValue={receiptData ? receiptData.purchase_type : "cash"}
          >
            {purchaseTypes.map((type) => (
              <option key={type.id} value={type.purchase_type}>
                {" "}
                {type.purchase_type}
              </option>
            ))}
          </select>
        </p>
        <p>
          <label>Date</label>
          <input
            name="date"
            type="date"
            required
            defaultValue={receiptData ? receiptData.date : date}
          ></input>
        </p>
        <div>
          <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
            Cancel
          </button>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Save"}
          </button>
        </div>
      </Form>
    </React.Fragment>
  );
}

export default ReceiptForm;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();
  const token = getAuthToken();

  const ReceiptData = {
    currency: data.get("currency"),
    description: data.get("description"),
    date: data.get("date"),
    sale_type: data.get("sale_type"),
    customer_name: data.get("customer"),
  };

  let url = "/receipt";
  if (method === "POST") {
    const response = await fetch(url, {
      method: request.method,
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(ReceiptData),
    });
    if (!response.ok) {
      window.alert("failed");
      throw json({ message: "Failed to save the invoice" }, { status: 500 });
    }
    return redirect("/receipt");
  } else {
    const id = params.id;
    url = "/receipt/" + id;
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(ReceiptData),
    });
    if (!response.ok) {
      window.alert("failed update");
      throw json({ message: "Failed to update" }, { status: 500 });
    }

    return redirect("/receipt");
  }
}

export async function Loader(){
  const token = getAuthToken()
  const response = await fetch("/customer", {
      method:"get",
      headers:{
          "Authorization": "Bearer "+ token
      }
  })
  if(!response.ok){
      throw json({message:"Cant get customers"}, {status:500})
  }else{
      const resData = await response.json()
      return resData
  };
}
