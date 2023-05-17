import React from "react";
import { Form, json, redirect, useRouteLoaderData } from "react-router-dom";
import { getAuthToken } from "../../util/Auth";

function MiscIssueForm() {
  const { items } = useRouteLoaderData("inventory-balances");
  return (
    <React.Fragment>
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
            Quantity To Decrease
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
        <div className="col-12">
          <button className="btn btn-primary" type="submit">
            Submit form
          </button>
        </div>
      </Form>
    </React.Fragment>
  );
}

export default MiscIssueForm;

export async function action({request, param}){
    const token = getAuthToken()
    const method = request.method

    const data = await request.formData()

    const miscIssueData = {
        item_name: data.get('item_name'),
        quantity: data.get('quantity'),
    }

    const response = await fetch("https://flask-inventory.onrender.com/inventory-issue", {
        method: method,
        headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + token,
            "Access-Control-Allow-Origin": "*",

        },
        body: JSON.stringify(miscIssueData)
    })

    if(!response.ok){
        throw json({message: "Error fetching"},{status: 500})
    }
    return redirect("/inventory-balance")
}
