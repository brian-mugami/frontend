import React from "react";
import { Link, useRouteLoaderData, useSubmit } from "react-router-dom";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";

function ReceiptItem({ receipt }) {
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
      <h1>{receipt.receipt_number}</h1>
      <time>Date : {receipt.date}</time>
      {token && (
        <menu>
          <Link to="edit">
            <button className="btn btn-success">Edit</button>
          </Link>
          <button onClick={startDeleteHandler} className="btn btn-danger">
            Delete Receipt
          </button>
          <button onClick={cancelHandler} className="btn btn-warning">
            Back
          </button>
          <Link to="void">
            <button className="btn btn-primary">Void this receipt</button>
          </Link>
        </menu>
      )}
    </React.Fragment>
  );
}

export default ReceiptItem;
