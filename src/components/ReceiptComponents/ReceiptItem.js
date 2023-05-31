import { Button, Flex, List, ListItem } from "@tremor/react";
import React from "react";
import { Link, useNavigate, useRouteLoaderData, useSubmit } from "react-router-dom";
import {

  PencilIcon,
  PrinterIcon,
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
      const response = await fetch(`https://flask-inventory.onrender.com/receipt/download/test/${id}`, {
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
      <div className="pb-2">
      <Button size="sm" variant="secondary" onClick={cancelHandler} >
        Back
      </Button>
      </div>
      <div>
      <h1>{receipt.receipt_number}</h1>
      <time>Date : {receipt.date}</time>
      <hi>{receipt.sale_type}</hi>
      </div>

      <div>
      <p className="pt-2">
        {" "}
        <b>Items in Receipt</b>
      </p>
      <List>
        {receipt.sale_items.map((item) => (
          <ListItem>
            {item.item.item_name} Selling Price : {item.selling_price} Actual Price : {item.item.price} 
            Quantity ordered : {item.item_quantity}{" "}
          </ListItem>
        ))}
      </List>

      </div>





      {token && (
        <menu>
          <Flex justifyContent="end" className="space-x-2">
            <Link to="edit">
            <button
            type="button"
            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900  ring-1 ring-inset ring-gray-700 hover:bg-gray-50"
          >
            <PencilIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
            Edit
          </button>
          </Link>
          
          <Link to="void">
            <button className="btn btn-primary">Void this receipt</button>
          </Link>
          <button 
          onClick={printReceiptHandler} 
          className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900  ring-1 ring-inset ring-gray-700 hover:bg-gray-50"
          >
            <PrinterIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
            Print
          </button>
          <button onClick={startDeleteHandler} className="btn btn-danger">
            Delete
          </button>
          </Flex>
        </menu>
      )}
    </React.Fragment>
  );
}

export default ReceiptItem;
