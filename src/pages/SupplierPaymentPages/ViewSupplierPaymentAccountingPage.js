import React from "react";
import { defer, json, useLoaderData, useNavigate } from "react-router-dom";
import Modal from "../../components/UIComponents/Modal";
import { getAuthToken } from "../../util/Auth";

function ViewSupplierPaymentAccountingPage() {
  const navigate = useNavigate();

  function cancelHandler() {
    navigate("/payment");
  }

  const { accounting } = useLoaderData();
  return (
    <React.Fragment>
      <Modal>
        {accounting.map((account) => (
          <div>
            <p>
              Credit Account:{" "}
              <strong>
                {account.credit_account} - ({account.credit_amount})
              </strong>
            </p>
            <p>
              Debit Account:{" "}
              <strong>
                {account.debit_account} - {account.debit_amount}
              </strong>
            </p>
          </div>
        ))}
        <button onClick={cancelHandler}>Back</button>
      </Modal>
    </React.Fragment>
  );
}

export default ViewSupplierPaymentAccountingPage;
async function accountingLoader(id) {
  let url = "/payment/";
  const token = getAuthToken();
  const response = await fetch(url + id + "/account", {
    method: "get",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    throw json({ message: "Not gotten accounting" }, { status: 404 });
  }
  const resData = await response.json();
  console.log(resData)
  return resData.accounting;
}

export async function loader({ params, request }) {
  const id = params.id;
  return defer({
    accounting: await accountingLoader(id),
  });
}
