import React, { useState } from "react";

import {
  Form,
  useNavigate,
  useNavigation,
  useActionData,
  redirect,
  json,
  useLoaderData,
  defer,
} from "react-router-dom";
import { getAuthToken } from "../../util/Auth";
import { currencyTypes, purchaseTypes } from "../../data/paymentTypes";

let item_list = []
let existingData
function ReceiptForm({ receiptData, title, method }) {
  existingData = receiptData
  const { customers, items } = useLoaderData();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const date = new Date().toISOString().slice(0, 10);
  const data = useActionData();
  const [tableRows, setTableRows] = useState(() => {
    if (receiptData && receiptData.sale_items) {
      return receiptData.sale_items.map((item) => ({
        item_name: item.item.item_name,
        item_quantity: parseFloat(item.quantity),
        selling_price: parseFloat(item.selling_price),
        item_cost: parseFloat(item.item_cost),
      }));
    } else {
      return Array.from({ length: 1 }, () => ({
        item_name: "",
        item_quantity: 1,
        selling_price: 1,
        item_cost: 1,
      }));
    }
  });

  const isSubmitting = navigation.state === "submitting";

  function cancelHandler() {
    navigate("..");
  }

  const handleAddRow = () => {
    setTableRows((rows) => [
      ...rows,
      {
        item_name: "",
        item_quantity: 1,
        selling_price: 1,
        item_cost: 1,
      },
    ]);
  };

  const handleRemoveRow = (index) => {
    setTableRows((rows) => rows.filter((row, i) => i !== index));
  };

  const handleInputChange = (event, index, key) => {
    const value = event.target.value;
    if (key === 'item_name') {
      // Find the item with the matching name in the items list
      const selectedItem = items.find(item => item.item_name === value);
  
      // If a matching item is found, update the selling price for the corresponding row
      if (selectedItem) {
        const newSellingPrice = parseFloat(selectedItem.price);
        setTableRows(rows => {
          const newRows = [...rows];
          newRows[index][key] = value;
          newRows[index]['selling_price'] = newSellingPrice;
          newRows[index]['item_cost'] = newRows[index]['item_quantity'] * newSellingPrice;
          return newRows;
        });
      } else {
        // If no matching item is found, reset the selling price and item cost for the corresponding row
        setTableRows(rows => {
          const newRows = [...rows];
          newRows[index][key] = value;
          newRows[index]['selling_price'] = 0;
          newRows[index]['item_cost'] = 0;
          return newRows;
        });
      }
    } else {
      // If a different key is changed (e.g., selling_price), update the corresponding value directly
      setTableRows(rows => {
        const newRows = [...rows];
        newRows[index][key] = value;
        if (key === 'item_quantity' || key === 'selling_price') {
          const itemQuantity = newRows[index]['item_quantity'];
          const sellingPrice = newRows[index]['selling_price'];
          newRows[index]['item_cost'] = itemQuantity * sellingPrice;
        }
        return newRows;
      });
    }
  };
  

  item_list = tableRows

  return (
    <React.Fragment>
      {data && data.errors && (
        <ul>
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      {data && data.message && <p>{data.message}</p>}

      <Form method={method}>
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Create {title}
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Input details here.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-2 sm:col-start-1">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Receipt Number
              </label>
              <div className="mt-2">
                <input
                  placeholder="Receipt Number"
                  name="receipt_number"
                  type="text"
                  disabled
                  defaultValue={receiptData ? receiptData.receipt_number : ""}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Receipt Amount
              </label>
              <div className="mt-2">
                <input
                  disabled
                  placeholder="Receipt Amount"
                  name="receipt_amount"
                  type="number"
                  step="0.01"
                  defaultValue={
                    receiptData ? receiptData.amount : ""
                  }
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="Description"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Description
              </label>
              <div className="mt-2">
                <input
                  placeholder="Description"
                  name="description"
                  type="text"
                  defaultValue={receiptData ? receiptData.description : ""}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="">
              <label
                htmlFor="country"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Select currency
              </label>
              <div className="mt-2">
                <select
                  placeholder="Currency"
                  name="currency"
                  type="text"
                  defaultValue={receiptData ? receiptData.currency : "KES"}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  {currencyTypes.map((type) => (
                    <option key={type.id} value={type.currency_type}>
                      {" "}
                      {type.currency_type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Customer
              </label>
              <div className="mt-2">
                <select
                  name="customer"
                  type="text"
                  required
                  defaultValue={
                    receiptData ? receiptData.customer.customer_name : ""
                  }
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  {customers.map((customer) => (
                    <option key={customer.id} value={customer.customer_name}>
                      {" "}
                      {customer.customer_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Sale Type
              </label>
              <div className="mt-2">
                <select
                  name="sale_type"
                  type="text"
                  required
                  defaultValue={
                    receiptData ? receiptData.purchase_type : "cash"
                  }
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  {purchaseTypes.map((type) => (
                    <option key={type.id} value={type.purchase_type}>
                      {" "}
                      {type.purchase_type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <p>
              <label>Date</label>
              <input
                name="date"
                type="date"
                required
                defaultValue={receiptData ? receiptData.date : date}
              ></input>
            </p>
          </div>

          <div className=" px-4 py-3 pb-10 text-right sm:px-6">
            <button
              type="button"
              onClick={cancelHandler}
              disabled={isSubmitting}
              className="inline-flex justify-center rounded-md bg-indigo-600 mr-5 py-2 px-3 text-sm font-semibold text-white  hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Cancel
            </button>
            <button
              disabled={isSubmitting}
              className="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white  hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              {isSubmitting ? "Submitting..." : "Save"}
            </button>
          </div>
        </div>
        <div>
          <button className="btn btn-secondary" onClick={handleAddRow}>
            Add Row
          </button>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Line Number</th>
                <th scope="col">Item Name</th>
                <th scope="col">Item Quantity</th>
                <th scope="col">Selling Price</th>
                <th scope="col">Item Set Price</th>
                <th scope="col">Total Cost</th>
              </tr>
            </thead>
            <tbody>
            {tableRows.map((row, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>
                      <input
                        name="item_name"
                        defaultValue={
                          receiptData?.sale_items?.[index]?.item
                            .item_name || row.item_name
                        }
                        list="options"
                        onChange={(e) =>
                          handleInputChange(e, index, "item_name")
                        }
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      />
                      <datalist id="options">
                        {items.map((item) => (
                          <option key={item.id} value={item.item_name} />
                        ))}
                      </datalist>
                    </td>
                    <td>
                      <input
                        required
                        type="number"
                        name="item_quantity"
                        min="1"
                        defaultValue={row.item_quantity}
                        onChange={(e) =>
                          handleInputChange(e, index, "item_quantity")
                        }
                      />
                    </td>
                    <td>
                      <input
                        required
                        type="number"
                        min="1"
                        step="0.01"
                        defaultValue={row.selling_price}
                        onChange={(e) =>
                          handleInputChange(e, index, "selling_price")
                        }
                      />
                    </td>
                    <td>{row.selling_price}</td>
                    <td>{row.item_cost}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleRemoveRow(index)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </Form>
    </React.Fragment>
  );
}

export default ReceiptForm;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();
  const token = getAuthToken();

  const ReceiptData = {
    currency: data.get("currency"),
    description: data.get("description"),
    date: data.get("date"),
    sale_type: data.get("sale_type"),
    customer_name: data.get("customer"),
  };

  const ReceiptUpdateData = {
    currency: data.get("currency"),
    description: data.get("description"),
    date: data.get("date"),
    sale_type: data.get("sale_type"),
    customer_name: data.get("customer"),
  };

  let url = "https://flask-inventory.onrender.com/receipt";
  if (method === "POST") {
    const response = await fetch(url, {
      method: request.method,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(ReceiptData),
    });
    if (response.status === 404) {
      return response;
    }
    if (response.status === 500) {
      return response;
    }
    if (response.status === 400) {
      return response;
    }
    if (!response.ok) {
      throw json({ message: "Failed to save the receipt" }, { status: 500 });
    }
    const receiptId = (await response.json()).id;
    const lines = {
      receipt_id: receiptId,
      item_list: item_list.map((item) => ({
        item_name: item.item_name,
        selling_price: item.selling_price,
        quantity: item.item_quantity,
      })),
    };
    const receiptLines = await fetch("https://flask-inventory.onrender.com/sales", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(lines),
    });
    if (receiptLines.status === 400){
      return receiptLines
    }
    if (receiptLines.status === 500){
      return receiptLines
    }
    if (receiptLines.status === 404){
      return receiptLines
    }
    if (!receiptLines.ok) {
      window.alert("error in receipt lines");
      return redirect("./");
    }
    return redirect("/receipt");
  } else {
    const id = params.id;
    url = "/receipt/" + id;
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(ReceiptUpdateData),
    });
    if(response.status === 400){
      return response
    }
    if(response.status === 404){
      return response
    }
    if (!response.ok) {
      throw json({ message: "Failed to update" }, { status: 500 });
    }
    const receiptUpdateLines = {
      receipt_id: id,
      item_list: item_list.map((item) => ({
        item_name: item.item_name,
        selling_price: item.selling_price,
        quantity: item.item_quantity,
      })),
    };
    for (let item of existingData.sale_items) {
      const lineResponse = await fetch("https://flask-inventory.onrender.com/sales/" + item.id, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",

        },
        body: JSON.stringify(receiptUpdateLines),
      });
      if (lineResponse.status === 400) {
        return lineResponse;
      }
      if (lineResponse.status === 404) {
        return lineResponse;
      }
    }
    return redirect("/receipt");
  }
}

async function customersLoader() {
  const token = getAuthToken();
  const response = await fetch("https://flask-inventory.onrender.com/customer", {
    method: "get",
    headers: {
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*",

    },
  });
  if (!response.ok) {
    throw json({ message: "Cant get customers" }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData;
  }
}

async function itemsLoader() {
  const token = getAuthToken();

  const response = await fetch("https://flask-inventory.onrender.com/item", {
    method: "get",
    headers: {
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*",

    },
  });
  if (!response.ok) {
    throw json({ message: "The response was not ok" }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData;
  }
}

export async function Loader({ params, request }) {
  return defer({
    customers: await customersLoader(),
    items: await itemsLoader(),
  });
}
