import React from "react";
import { Form, json, redirect, useRouteLoaderData } from "react-router-dom";
import { getAuthToken } from "../../util/Auth";
import { useActionData } from "react-router-dom/dist/umd/react-router-dom.development";

function MiscReceiptForm() {
  const { items, adjAccounts } = useRouteLoaderData("inventory-balances");
  const data = useActionData();
  return (
    <React.Fragment>
      <p>
        {data && data.errors && (
          <ul>
            {Object.values(data.errors).map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}
        {data && data.message && <p>{data.message}</p>}
      </p>
      <Form className="row g-3 needs-validation" noValidate method="post">
        <div className="col-md-4 position-relative">
          <label htmlFor="validationTooltip01" className="form-label">
            Item Name
          </label>
          <input
            type="text"
            className="form-control"
            id="validationTooltip01"
            placeholder="Item Name"
            name="item_name"
            list="options"
            autoComplete="options"
            required
          />
          <datalist id="options">
            {items.map((item) => (
              <option key={item.id} value={item.item_name} />
            ))}
          </datalist>
          <div className="valid-tooltip">Looks good!</div>
        </div>
        <div className="col-md-4 position-relative">
          <label htmlFor="validationTooltip02" className="form-label">
            Quantity To Increase
          </label>
          <input
            type="number"
            min="1"
            className="form-control"
            id="validationTooltip02"
            placeholder="Quantity"
            name="quantity"
            required
          />
          <div className="valid-tooltip">Looks good!</div>
        </div>
        <div className="col-md-4 position-relative">
          <label htmlFor="validationTooltipUsername" className="form-label">
            Unit Cost
          </label>
          <div className="input-group has-validation">
            <input
              type="number"
              className="form-control"
              name="unit_cost"
              placeholder="Unit Cost"
              id="validationTooltipUsername"
              aria-describedby="validationTooltipUsernamePrepend"
              required
            />
            <div className="invalid-tooltip">Please choose a unit cost.</div>
          </div>
        </div>
        <div className="col-md-4 position-relative">
          <label htmlFor="validationTooltipUsername" className="form-label">
            Account
          </label>
          <div className="input-group has-validation">
            <select
              name="account_name"
              required
              className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              {adjAccounts.map((account) => (
                <option key={account.id} value={account.account_name}>
                  {" "}
                  {account.account_name}
                </option>
              ))}
            </select>
            <div className="invalid-tooltip">Please choose a unit cost.</div>
          </div>
        </div>
        <div className="col-12">
          <button className="btn btn-primary" type="submit">
            Submit form
          </button>
        </div>
      </Form>
    </React.Fragment>
  );
}

export default MiscReceiptForm;

export async function action({ request, param }) {
  const token = getAuthToken();
  const method = request.method;

  const data = await request.formData();

  const miscReceiptData = {
    item_name: data.get("item_name"),
    quantity: data.get("quantity"),
    unit_cost: data.get("unit_cost"),
    account_name: data.get("account_name"),
  };

  const response = await fetch("https://inventory-accounting.onrender.com/inventory-balances", {
    method: method,
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*",

    },
    body: JSON.stringify(miscReceiptData),
  });
  if (response.status === 400) {
    return response;
  }
  if (response.status === 404) {
    return response;
  }
  if (response.status === 500) {
    return response;
  }
  if (!response.ok) {
    throw json(
      { message: "An error occurred!Please try again" },
      { status: 500 }
    );
  }
  return redirect("/inventory-balance");
}
