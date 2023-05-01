import Modal from "../UIComponents/Modal";
import { Form, redirect, json } from "react-router-dom";
import { getAuthToken } from "../../util/Auth";
import { useNavigate, useNavigation } from "react-router-dom";

function InvoiceAccountForm() {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  function cancelHandler() {
    navigate("/invoice");
  }
  return (
    <Modal>
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

  if (response.status === 400) {
    return response;
  }
  if (response.status === 404) {  
    return response;
  }
  if (!response.ok) {
    throw json({ message: "Failed to create accounting" }, { status: 500 });
  }
  return redirect("/invoice");
}
