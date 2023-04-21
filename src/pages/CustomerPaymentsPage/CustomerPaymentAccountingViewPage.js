import React from "react";
import {
  json,
  useActionData,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import Modal from "../../components/UIComponents/Modal";
import { getAuthToken } from "../../util/Auth";

function CustomerPaymentAccountingViewPage() {
  const navigate = useNavigate();
  const data = useActionData();
  function cancelHandler() {
    navigate("/customer-payment");
  }

  const accounting = useLoaderData();
  return (
    <React.Fragment>
      <Modal>
        {data && data.errors && (
          <ul>
            {Object.values(data.errors).map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}
        {data && data.message && <p>{data.message}</p>}
        <div>
          <p>
            Credit Account:{" "}
            <strong>
              {accounting.credit_account} - ({accounting.credit_amount})
            </strong>
          </p>
          <p>
            Debit Account:{" "}
            <strong>
              {accounting.debit_account} - {accounting.debit_amount}
            </strong>
          </p>
        </div>

        <button onClick={cancelHandler}>Back</button>
      </Modal>
    </React.Fragment>
  );
}

export default CustomerPaymentAccountingViewPage;

export async function loader({ params, request }) {
  const id = params.id;
  let url = "/customer/payment/";
  const token = getAuthToken();
  const response = await fetch(url + id + "/account", {
    method: "get",
    headers: {
      Authorization: "Bearer " + token,
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
  console.log(resData);
  return resData.accounting[0];
}
