import React from "react";
import Modal from "../UIComponents/Modal";
import {
  Form,
  redirect,
  defer,
  json,
  useActionData,
  useLoaderData,
} from "react-router-dom";
import { getAuthToken } from "../../util/Auth";
import { useNavigate, useNavigation } from "react-router-dom";
import { currencyTypes } from "../../data/paymentTypes";

function InvoicePaymentForm() {
  const data = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const { accounts, invoice } = useLoaderData();
  const isSubmitting = navigation.state === "submitting";
  function cancelHandler() {
    navigate("/invoice");
  }
  return (
    <Modal>
      <h3>Payment Form</h3>
      {data && data.errors && (
        <ul>
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      {data && data.message && <p>{data.message}</p>}
      <Form method="post">
        <p>
          <label>Currency</label>
          <select name="currency" type="text" defaultValue="KES">
            {currencyTypes.map((type) => (
              <option key={type.id} value={type.currency_type}>
                {type.currency_type}
              </option>
            ))}
          </select>
        </p>
        <p>
          <label>Payment amount</label>
          <input
            type="number"
            min="0"
            name="amount"
            defaultValue={invoice.supplier_balance[0].balance}
          ></input>
        </p>
        <p>
          <label>Bank Account</label>
          <select name="account" type="text">
            {accounts.map((account) => (
              <option key={account.id} value={account.account_name}>
                {account.account_name}
              </option>
            ))}
          </select>
        </p>
        <p>
          <label>Transaction Number</label>
          <input type="text" name="transaction-number" placeholder="transaction code" required>
          </input>
        </p>
        <button type="submit" disabled={isSubmitting} className="btn btn-primary">
          Yes
        </button>
        <button type="button" className="btn btn-primary" onClick={cancelHandler}>
          Return To Invoice
        </button>
      </Form>
    </Modal>
  );
}

export default InvoicePaymentForm;

export async function action({ request, params }) {
  const token = getAuthToken();
  const id = params.id;
  let url = "/invoice/payment/" + id;
  const data = await request.formData();
  const paymentData = {
    amount: data.get("amount"),
    currency: data.get("currency"),
    bank_account: data.get("account"),
    payment_description: data.get("transaction-number")
  };
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(paymentData),
  });
  if (response.status === 400){
    return response
  }
  if(response.status === 404){
    return response
  }
  if(!response.ok){
    window.alert("Failed to pay")
    throw json({ message: "Failed to create payment" }, { status: 500 })
  }
  return redirect ("/invoice");
}

async function accountLoader() {
  const token = getAuthToken();

  const response = await fetch("/bank/account", {
    method: "get",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  if (!response.ok) {
    throw json({ message: "The response was not ok" }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData;
  }
}

async function invoiceLoader(id) {
  let url = "/invoice/";
  const token = getAuthToken();
  const response = await fetch(url + id, {
    method: "get",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    throw json({ message: "Wrong Url" }, { status: 404 });
  }
  const resData = await response.json();
  return resData;
}

export async function loader({ params, request }) {
  const id = params.id;
  return defer({
    accounts: await accountLoader(),
    invoice: await invoiceLoader(id),
  });
}
