import React from 'react'
import { defer, json, useLoaderData, useNavigate } from 'react-router-dom';
import Modal from '../../components/UIComponents/Modal'
import { getAuthToken } from '../../util/Auth';

function ViewInvoiceAccountingPage() {
    const {accounting} = useLoaderData()
    const navigate = useNavigate()
    function cancelHandler() {
        navigate("/invoice");
      }
  return (
    <React.Fragment>
        <Modal>
            <p>Credit Account:  <strong>{accounting.credit_account} - ({accounting.credit_amount})</strong></p>
            <p>Debit Account:  <strong>{accounting.debit_account} - {accounting.debit_amount}</strong></p>
            <button onClick={cancelHandler}>Back</button>
        </Modal>
    </React.Fragment>
  )
}
export default ViewInvoiceAccountingPage

async function accountingLoader(id){
    let url = "/invoice/";
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
  return resData;

}

export async function loader({params, request}){
    const id = params.id;
    return defer({
        accounting: await accountingLoader(id),
      });
}
