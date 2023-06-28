import React from "react";
import {
  defer,
  json,
  useActionData,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import Modal from "../../components/UIComponents/Modal";
import { getAuthToken } from "../../util/Auth";

function ViewSupplierPaymentAccountingPage() {
  const navigate = useNavigate();
  const data = useActionData();
  function cancelHandler() {
    navigate("/payment");
  }

  const { accounting } = useLoaderData();
  return (
    <React.Fragment>
      <Modal>
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Transactions
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          These are the transactions that occured{" "}
        </p>
        {data && data.errors && (
          <ul>
            {Object.values(data.errors).map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}
        {data && data.message && <p>{data.message}</p>}
        <div>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Credit Account:{" "}
            <strong>
              {accounting.credit_account}
              <span></span> <span></span>
              <p className="font-semibold">{accounting.credit_amount}</p>
            </strong>
          </p>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Debit Account:{" "}
            <strong>
              {accounting.debit_account}
              <span></span> <span></span>{" "}
              <p className="font-semibold"> {accounting.debit_amount}</p>
            </strong>
          </p>
        </div>
        <div className="pt-2 flex justify-end">
        <button
          type="button"
          onClick={cancelHandler}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
          Close
        </button>{" "}
        </div>
      </Modal>
    </React.Fragment>
  );
}

export default ViewSupplierPaymentAccountingPage;
async function accountingLoader(id) {
  let url = "https://inentory-test.onrender.com/payment/";
  const token = getAuthToken();
  const response = await fetch(url + id + "/account", {
    method: "get",
    headers: {
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*",
    },
  });
  if (response.status === 404) {
    return response;
  }
  if (response.status === 400) {
    return response;
  }
  if (!response.ok) {
    throw json({ message: "Not gotten accounting" }, { status: 404 });
  }
  const resData = await response.json();
  return resData.accounting[0];
}

export async function loader({ params, request }) {
  const id = params.id;
  return defer({
    accounting: await accountingLoader(id),
  });
}
