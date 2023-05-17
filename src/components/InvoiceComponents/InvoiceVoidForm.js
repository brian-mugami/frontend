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
        <div>
          Are you sure you want to void invoice number{" "}
          <b>{invoice.invoice_number}</b> of amount{" "}
          <b>
            {invoice.currency} {invoice.amount}
          </b>
        </div>
        <div>
          <input required placeholder="Void Reason" name="reason"></input>
        </div>
        <button className="btn btn-primary" onClick={cancelHandler}>
          No
        </button>{" "}
        <button
          className="btn btn-secondary"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Voiding" : "Void"}
        </button>
      </Form>
    </Modal>
  );
}

export default InvoiceVoidForm;

export async function action({ request, params }) {
  const token = getAuthToken();
  const id = params.id;
  const url = "https://flask-inventory.onrender.com/invoice/void/" + id;

  const data = await request.formData()

  const voidData = {
    reason: data.get('reason')
  }
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(voidData)
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
