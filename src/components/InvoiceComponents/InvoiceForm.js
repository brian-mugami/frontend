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
import { destinationTypes, purchaseTypes } from "../../data/paymenttypes";

function InvoiceForm({ invoiceData, title, method }) {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const date = new Date().toISOString().slice(0, 10);
  const suppliers = useLoaderData();
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
          <label>Invoice Number</label>
          <input
            placeholder="Invoice Number"
            name="inv_number"
            type="text"
            required
            defaultValue={invoiceData ? invoiceData.invoice_number : ""}
          ></input>
        </p>
        <p>
          <label>Amount</label>
          <input
            placeholder="Invoice Amount"
            name="inv_amount"
            type="number"
            step="0.0001"
            defaultValue={invoiceData ? invoiceData.amount : ""}
          ></input>
        </p>
        <p>
          <label>Currency</label>
          <input
            placeholder="Currency"
            name="currency"
            type="text"
            defaultValue={invoiceData ? invoiceData.currency : "KES"}
          ></input>
        </p>
        <p>
          <label>Description</label>
          <input
            placeholder="Description"
            name="description"
            type="text"
            defaultValue={invoiceData ? invoiceData.description : ""}
          ></input>
        </p>
        <p>
          <label>Destination Type</label>
          <select
            name="destinationType"
            type="text"
            required
            defaultValue={invoiceData ? invoiceData.destination_type : "stores"}
          >
            {destinationTypes.map((type) => (
              <option key={type.id} value={type.destination_type}>
                {" "}
                {type.destination_type}
              </option>
            ))}
          </select>
        </p>
        <p>
          <label>Supplier</label>
          <select
            name="supplier"
            type="text"
            required
            defaultValue={invoiceData ? invoiceData.supplier.supplier_name : ""}
          >
            {suppliers.map((supplier) => (
              <option key={supplier.id} value={supplier.supplier_name}>
                {" "}
                {supplier.supplier_name}
              </option>
            ))}
          </select>
        </p>
        <p>
          <label>Purchase Type</label>
          <select
            name="purchase_type"
            type="text"
            required
            defaultValue={invoiceData ? invoiceData.purchase_type : "cash"}
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
            name="inv_date"
            type="date"
            defaultValue={invoiceData ? invoiceData.date : date}
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

export default InvoiceForm;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();
  const token = getAuthToken();

  const InvoiceData = {
    invoice_number: data.get("inv_number"),
    amount: data.get("inv_amount"),
    currency: data.get("currency"),
    description: data.get("description"),
    destination_type: data.get("destinationType"),
    date: data.get("inv_date"),
    purchase_type: data.get("purchase_type"),
    supplier_name: data.get("supplier"),
  };

  let url = "/invoice";
  if (method === "POST") {
    const response = await fetch(url, {
      method: request.method,
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(InvoiceData),
    });
    if (!response.ok) {
      window.alert("failed");
      throw json({ message: "Failed to save the invoice" }, { status: 500 });
    }
    return redirect("/invoice");
  } else {
    const id = params.id;
    url = "/invoice/" + id;
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(InvoiceData),
    });
    if (!response.ok) {
      window.alert("failed update");
      throw json({ message: "Failed to update" }, { status: 500 });
    }

    return redirect("/invoice");
  }
}

export async function Loader(){
  const token = getAuthToken()
  const response = await fetch("/supplier", {
      method:"get",
      headers:{
          "Authorization": "Bearer "+ token
      }
  })
  if(!response.ok){
      throw json({message:"Cant get suppliers"}, {status:500})
  }else{
      const resData = await response.json()
      return resData
  };
}
