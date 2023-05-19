import React from "react";
import { Link, useRouteLoaderData, useSubmit } from "react-router-dom";

function ReceiptItem({ receipt }) {
  const token = useRouteLoaderData("root");
  const submit = useSubmit();

  function startDeleteHandler() {
    const proceed = window.confirm("Are you sure?");

    if (proceed) {
      submit(null, { method: "delete" });
    }
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
          <Link to="void">
            <button className="btn btn-primary">Void this receipt</button>
          </Link>
        </menu>
      )}
    </React.Fragment>
  );
}

export default ReceiptItem;
