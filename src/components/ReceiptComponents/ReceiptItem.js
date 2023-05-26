import { Button, Flex } from "@tremor/react";
import React from "react";
import { Link, useNavigate, useRouteLoaderData, useSubmit } from "react-router-dom";
import {

  PencilIcon,
} from '@heroicons/react/20/solid'
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
      const response = await fetch(`/receipt/download/test/${id}`, {
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
      <Button size="sm" variant="secondary" onClick={cancelHandler}>
        Back
      </Button>

      <h1>{receipt.receipt_number}</h1>
      <time>Date : {receipt.date}</time>
      {token && (
        <menu>
          <Flex justifyContent="end" className="space-x-2">
            <Link to="edit">
            <button
            type="button"
            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-4 ring-inset ring-gray-700 hover:bg-gray-50"
          >
            <PencilIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
            Edit
          </button>
          </Link>
          
          <Link to="void">
            <button className="btn btn-primary">Void this receipt</button>
          </Link>
          </Flex>
        </menu>
      )}
    </React.Fragment>
  );
}

export default ReceiptItem;
