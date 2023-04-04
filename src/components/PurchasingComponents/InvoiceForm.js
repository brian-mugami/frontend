import React from "react";
import { useState } from "react";
import {
  Form,
  useNavigate,
  useNavigation,
  redirect,
  json,
} from "react-router-dom";
import { getAuthToken } from "../../util/Auth";
import { destinationTypes, purchaseTypes } from "../../data/paymenttypes";


function InvoiceForm({invoiceData, title}) {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  const isSubmitting = navigation.state === "submitting";
  function cancelHandler() {
    navigate("..");
  }
  return (
    <React.Fragment>
        <h1>Invoice {title}</h1>
      <Form>
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
          <label>Accounted</label>
          <input
            name="accounted"
            type="text"
            defaultValue={invoiceData ? invoiceData.accounted : "false"}
          ></input>
        </p>
        <p>
          <label>Matched</label>
          <input
            name="matched"
            type="text"
            defaultValue={invoiceData ? invoiceData.matched_to_lines : "unmatched"}
          ></input>
        </p>
        <p>
          <label>Date</label>
          <input
            name="inv_date"
            type="date"
            value={date}
            defaultValue={invoiceData ? invoiceData.date : {date}}
          ></input>
        </p>
        <div>
          <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
            Cancel
          </button>
          <button disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Save"}
          </button>
        </div>
      </Form>
    </React.Fragment>
  );
}

export default InvoiceForm;

export async function action({request, params}){
    const method = request.method;
    const data = await request.formData();
    const token = getAuthToken()

    const ItemData = {
        invoice_number: data.get("inv_number"),
        amount: data.get("inv_amount"),
        currency: data.get("currency"),
        description: data.get("description"),
        destination_type: data.get("destinationType"),
        date: data.get("inv_date"),
        purchase_type: data.get("purchase_type"),
    }

    let url = '/invoices'
    if(method==="POST"){
        const response = await fetch(url,{
            method: method,
            headers: {
                'Content-Type':'application/json',
                'Authorization': "Bearer " + token,
                'Access-Control-Allow-Origin': '*'
            },
            body:JSON.stringify(ItemData)
        });
        if (!response.ok){
            window.alert("failed")
            throw json ({message: "Failed to save the invoice"}, {status: 500})
        }

        return redirect("/invoice")
    }else{
        const id = params.id
        url = '/invoices/'+id
        const response = await fetch(url,{
            method: method,
            headers: {
                'Content-Type':'application/json',
                'Authorization': "Bearer " + token,
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(ItemData)
        });
        if (!response.ok){
            window.alert("failed update")
            throw json ({message: "Failed to update"}, {status: 500})
        }

        return redirect("/invoice")
    }
}
