import React from "react";
import Modal from "../../components/UIComponents/Modal";
import {
  useActionData,
  useNavigate,
  defer,
  json,
  Form,
  useNavigation,
  redirect,
  useLoaderData,
} from "react-router-dom";
import { getAuthToken } from "../../util/Auth";
import { currencyTypes } from "../../data/paymentTypes";

function ReceiptPaymentPage() {
  const { receipt, accounts } = useLoaderData();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const data = useActionData();
  function cancelHandler() {
    navigate("/receipt");
  }
  return (
    <React.Fragment>
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
            <label className="block text-sm my-2 font-medium leading-6 text-gray-900">
              Currency
            </label>{" "}
            <select
              name="currency"
              type="text"
              defaultValue="KES"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900  ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            >
              {currencyTypes.map((type) => (
                <option key={type.id} value={type.currency_type}>
                  {type.currency_type}
                </option>
              ))}
            </select>
          </p>
          <p>
            <label className="block text-sm my-2 font-medium leading-6 text-gray-900">
              Payment amount
            </label>{" "}
            <input
              className="block w-full rounded-md border-0 py-1.5 text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              type="number"
              min="0"
              name="amount"
              max={receipt.customer_balance[0].balance}
              defaultValue={receipt.customer_balance[0].balance}
            ></input>
          </p>
          <p>
            <label className="block text-sm font-medium my-2 leading-6 text-gray-900">
              Bank Account
            </label>{" "}
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
            </label>{" "}
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
            {isSubmitting ? "Paying": "Pay" }
          </button>
        </div>
        </Form>
      </Modal>
    </React.Fragment>
  );
}

export default ReceiptPaymentPage;

export async function action({ request, params }) {
  const token = getAuthToken();
  const id = params.id;
  let url = "/receipt/payment/" + id;
  const data = await request.formData();
  const paymentData = {
    amount: data.get("amount"),
    currency: data.get("currency"),
    receipt_account: data.get("account"),
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
    throw json({ message: "Failed to create payment" }, { status: 500 });
  }
  return redirect("/receipt");
}

async function accountLoader() {
  const token = getAuthToken();

  const response = await fetch("/bank/account", {
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

async function receiptLoader(id) {
  let url = "/receipt/";
  const token = getAuthToken();
  const response = await fetch(url + id, {
    method: "get",
    headers: {
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*",
    },
  });
  if (response.status === 404) {
    throw json({ message: "Account could not be found" });
  }
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
    receipt: await receiptLoader(id),
  });
}
