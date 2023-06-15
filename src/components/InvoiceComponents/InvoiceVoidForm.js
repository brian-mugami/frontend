import React from "react";
import Modal from "../UIComponents/Modal";
import {
  Form,
  json,
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
} from "react-router-dom/dist/umd/react-router-dom.development";
import { getAuthToken } from "../../util/Auth";

function InvoiceVoidForm({ invoice }) {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const data = useActionData();

  const isSubmitting = navigation.state === "submitting";
  function cancelHandler() {
    navigate("..");
  }
  return (
    <Modal>
      {data && data.errors && (
        <ul>
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      {data && data.message && <p>{data.message}</p>}
      <Form method="post">
        <div className="pb-4">
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Are you sure you want to void invoice number{" "}
            <b>{invoice.invoice_number}</b> of amount{" "}
            <b>
              {invoice.currency} {invoice.amount}
            </b>
          </p>
        </div>
        <div className="pb-2">
          <input
            required
            placeholder="Void Reason"
            name="reason"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:px-4 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          ></input>
        </div>
        <div className="space-x-4">
          <button
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Voiding" : "Void"}
          </button>
          <button
            className="text-sm font-semibold leading-6 text-gray-900"
            onClick={cancelHandler}
          >
            Cancel
          </button>{" "}
        </div>
      </Form>
    </Modal>
  );
}

export default InvoiceVoidForm;

export async function action({ request, params }) {
  const token = getAuthToken();
  const id = params.id;
  const url = "https://flask-inventory.onrender.com/invoice/void/" + id;

  const data = await request.formData();

  const voidData = {
    reason: data.get("reason"),
  };
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(voidData),
  });

  if (response.status === 400) {
    return response;
  }
  if (response.status === 404) {
    return response;
  }
  if (!response.ok) {
    throw json({ message: "Failed to void invoice" }, { status: 500 });
  }
  return redirect("/invoice");
}
