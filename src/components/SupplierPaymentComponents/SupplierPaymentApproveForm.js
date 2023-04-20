import React from "react";
import { Form, useActionData, useNavigate, useNavigation, json, redirect } from "react-router-dom";
import Modal from "../UIComponents/Modal";
import { getAuthToken } from "../../util/Auth";

function SupplierPaymentApproveForm({ bank, amount, supplier, currency }) {
    const data = useActionData()
  const navigation = useNavigation();
  const navigate = useNavigate();
  const isSubmitting = navigation.state === "submitting";
  function cancelHandler() {
    navigate("/payment");
  }
  return (
    <Modal>
      <h3>Payment Approval Form</h3>
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
          Are you sure you want to approve this payment of {currency} {amount}{" "}
        </p>
        <p>
          To <strong>supplier</strong>:{supplier} from <strong>bank</strong> :
          {bank}
        </p>
        <button type="submit" disabled={isSubmitting}>
          Yes
        </button>
        <button type="button" onClick={cancelHandler}>
          No
        </button>
      </Form>
    </Modal>
  );
}

export default SupplierPaymentApproveForm;

export async function action({ request, params }) {
  const token = getAuthToken();
  const id = params.id;
  let url = "/payment/approve/" + id;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*",
    },
  });
  if (response.status === 400){
    return response
  }
  if (response.status === 404){
    return response
  }
  if (!response.ok) {
    window.alert("Failed to approve payment");
    throw json({ message: "Failed to approve payment" }, { status: 500 });
  }
  return redirect("/payment");
}
