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
      <h2 className="text-base font-semibold leading-7 text-gray-900">
        Payment Form
      </h2>
   
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
          <label className="block text-sm my-2 font-medium leading-6 text-gray-900">
            Currency
          </label>
          <select
            name="currency"
            type="text"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900  ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            defaultValue="KES"
          >
            {currencyTypes.map((type) => (
              <option key={type.id} value={type.currency_type}>
                {type.currency_type}
              </option>
            ))}
          </select>
        </p>
        <p className="sm:col-span-2 sm:col-start-1">
          <label className="block text-sm my-2 font-medium leading-6 text-gray-900">
            Payment amount
          </label>
          <input
            className="block w-full rounded-md border-0 py-1.5 text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            type="number"
            min="0"
            name="amount"
            defaultValue={invoice.supplier_balance[0].balance}
          ></input>
        </p>
        <p>
          <label className="block text-sm font-medium my-2 leading-6 text-gray-900">
            Bank Account
          </label>
          <select
            name="account"
            type="text"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900  ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
          >
            {accounts.map((account) => (
              <option key={account.id} value={account.account_name}>
                {account.account_name}
              </option>
            ))}
          </select>
        </p>
        <p>
          <label className="block text-sm my-2 font-medium leading-6 text-gray-900">
            Transaction Number
          </label>
          <input
            className="block w-full rounded-md border-0 py-1.5 text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            type="text"
            name="transaction-number"
            placeholder="transaction code"
            required
          ></input>
        </p>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            onClick={cancelHandler}
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white  hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {isSubmitting ? "Submitting": "Submit"}
          </button>
        </div>
      </Form>
    </Modal>
  );
}

export default InvoicePaymentForm;

export async function action({ request, params }) {
  const token = getAuthToken();
  const id = params.id;
  let url = "https://flask-inventory.onrender.com/invoice/payment/" + id;
  const data = await request.formData();
  const paymentData = {
    amount: data.get("amount"),
    currency: data.get("currency"),
    bank_account: data.get("account"),
    payment_description: data.get("transaction-number"),
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
  if (response.status === 400) {
    return response;
  }
  if (response.status === 404) {
    return response;
  }
  if (!response.ok) {
    window.alert("Failed to pay");
    throw json({ message: "Failed to create payment" }, { status: 500 });
  }
  return redirect("/invoice");
}

async function accountLoader() {
  const token = getAuthToken();

  const response = await fetch("https://flask-inventory.onrender.com/bank/account", {
    method: "get",
    headers: {
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*",

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
  let url = "https://flask-inventory.onrender.com/invoice/";
  const token = getAuthToken();
  const response = await fetch(url + id, {
    method: "get",
    headers: {
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*",

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
