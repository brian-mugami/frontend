import React from "react";
import { Link, useRouteLoaderData, useSubmit } from "react-router-dom";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
import { getAuthToken } from "../../util/Auth";

function ReceiptItem({ receipt, id }) {
  const token = useRouteLoaderData("root");
  const submit = useSubmit();
  const navigate = useNavigate();

  function startDeleteHandler() {
    const proceed = window.confirm("Are you sure?");

    if (proceed) {
      submit(null, { method: "delete" });
    }
  }

  async function printReceiptHandler() {
    const token = getAuthToken();

    try {
      const response = await fetch(`/receipt/download/${id}`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (response.ok) {
        const blob = await response.blob();
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "receipt " + receipt.receipt_number;
        link.click();
      } else {
        console.error("Failed to download receipt PDF");
      }
    } catch (error) {
      console.error("An error occurred", error);
    }
  }

  function cancelHandler() {
    navigate("..");
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
          <button onClick={printReceiptHandler} className="btn btn-dark">
            Print
          </button>
        </menu>
      )}
    </React.Fragment>
  );
}

export default ReceiptItem;
