import React from "react";
import { Link, useRouteLoaderData, useSubmit } from "react-router-dom";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";

function InvoiceItem({ invoice }) {
  const token = useRouteLoaderData("root");
  const submit = useSubmit();
  const navigate = useNavigate()

  function startDeleteHandler() {
    const proceed = window.confirm("Are you sure?");

    if (proceed) {
      submit(null, { method: "delete" });
    }
  }

  function cancelHandler(){
    navigate("..")
  }

  return (
    <React.Fragment>
      <h1>{invoice.invoice_number}</h1>
      <time>Date : {invoice.date}</time>
      <h1>{invoice.accounted}</h1>
      <h1>{invoice.amount}</h1>
      <h1>{invoice.destination_type}</h1>
       <p className="pt-2"> <b>Items in invoice</b></p>
      {invoice.purchase_items.map((item) => (
        <h1>
          {item.item.item_name} selling price : {item.item.price} buying price :{" "}
          {item.buying_price} Quantity ordered : {item.item_quantity}{" "}
        </h1>
      ))}
      <h1>{invoice.purchase_type}</h1>
      <h1>Supplier : {invoice.supplier.supplier_name}</h1>
      <p className="pt-2"><b> Balances </b></p>
      {invoice.supplier_balance.map((supBalance) => (
        <div>
          {" "}
          <h1> Amount Paid : {supBalance.paid}</h1>
          <h1> Supplier Balance : {supBalance.balance}</h1>
        </div>
      ))}

      <b>Payments</b>
      {invoice.payments.map((payment)=>(
        <div>
        <h1>{payment.payment_status}</h1>
        <h1> Amount Paid : {payment.amount} Approval Status : {payment.approval_status }</h1>
        <h1> Transaction code : {payment.payment_description}</h1>
        </div>
      ))}

      <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start"></div>
      {token && (
        <menu>
          <div className="flex">
            <div className="pr-5">
              <Link
                to="edit"
                className="rounded-md bg-blue-300  px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Edit invoice
              </Link>
            </div>
            <div className="pr-5">
              <Link
                to="void"
                className="rounded-md bg-blue-300  px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Void invoice
              </Link>
            </div>
            <div className="pr-5">
              <button className="btn btn-warning" onClick={cancelHandler}>Back</button>
            </div>
            <div>
              <button
                onClick={startDeleteHandler}
                className="text-sm font-semibold leading-6 text-black"
              >
                Delete <span aria-hidden="true">x</span>
              </button>
            </div>
          </div>
        </menu>
      )}
    </React.Fragment>
  );
}

export default InvoiceItem;
