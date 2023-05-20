import Modal from "../UIComponents/Modal";
import { Form, redirect, json } from "react-router-dom";
import { getAuthToken } from "../../util/Auth";
import { useNavigate, useNavigation } from "react-router-dom";
import { useActionData } from "react-router-dom/dist/umd/react-router-dom.development";

function InvoiceAccountForm() {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const data = useActionData()
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
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Accounting Confirmation
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Are you sure you want to create accounting for this invoice?
        </p>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            onClick={cancelHandler}
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {isSubmitting ? "Accounting...":"Account" }
          </button>
        </div>
      </Form>
    </Modal>
  );
}

export default InvoiceAccountForm;

export async function action({ request, params }) {
  const token = getAuthToken();
  const id = params.id;
  const url = "https://flask-inventory.onrender.com/invoice/account/" + id;

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
