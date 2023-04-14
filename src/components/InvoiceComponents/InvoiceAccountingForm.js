import Modal from "../UIComponents/Modal";
import { Form, redirect, json, useActionData } from "react-router-dom";
import { getAuthToken } from "../../util/Auth";
import { useNavigate, useNavigation } from "react-router-dom";

function InvoiceAccountForm() {
  const data = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  function cancelHandler() {
    navigate("/invoice");
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
        <p>Are you sure you want to create accounting for this invoice?</p>
        <button type="submit" disabled={isSubmitting}>
          {" "}
          Yes{" "}
        </button>
        <button type="button" onClick={cancelHandler}>
          No
        </button>
      </Form>
    </Modal>
  );
}

export default InvoiceAccountForm;

export async function action({ request, params }) {
  const token = getAuthToken();
  const id = params.id;
  const url = "/invoice/account/" + id;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*",
    },
  });

  if (!response.ok) {
    throw json({ message: "Failed to create accounting" }, { status: 500 });
  }
  return redirect("/invoice");
}
