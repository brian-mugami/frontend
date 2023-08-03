import React from "react";
import {
  Form,
  useNavigate,
  useNavigation,
  redirect,
  useActionData,
  json,
} from "react-router-dom";
import { getAuthToken } from "../../../util/Auth";
import { unitTypes } from "../../../data/paymentTypes";

function ItemForm({ method, itemData, title, categories }) {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const data = useActionData()
  const isSubmitting = navigation.state === "submitting";
  function cancelHandler() {
    navigate("..");
  }

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
            Item Creation
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Input item details here.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-2 sm:col-start-1">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                *Item Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="itemName"
                  required
                  defaultValue={itemData ? itemData.item_name : ""}
                  placeholder="Item Name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="region"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Item Unit Measure
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="unit"
                  placeholder="Unit Measure"
                  defaultValue={itemData ? itemData.item_unit : 1}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="Item-Volume"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Unit Type
              </label>
              <div className="mt-2">
              <select
                  id="unit type"
                  name="unit-type"
                  defaultValue={itemData ? itemData.unit_type : "unit"}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  {unitTypes.map((unit) => (
                    <option key={unit.id} value={unit.unit_type}>
                      {" "}
                      {unit.unit_type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="Price"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                *Price
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="price"
                  required
                  defaultValue={itemData ? itemData.price : ""}
                  placeholder="Price"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-1">
              <label
                htmlFor="country"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Category
              </label>
              <div className="mt-2">
                <select
                  id="country"
                  name="category"
                  required
                  defaultValue={itemData ? itemData.category.name : ""}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {" "}
                      {category.account.account_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label>Status</label>
              <div>
                <label>Active</label>
                <input type="radio" name="active" value="True" />
                <label>Inactive</label>
                <input type="radio" name="active" value="False" />
              </div>
            </div>
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
      </Form>
    </React.Fragment>
  );
}

export default ItemForm;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();
  const token = getAuthToken();

  const ItemData = {
    item_name: data.get("itemName"),
    item_unit: data.get("unit"),
    unit_type: data.get("unit-type"),
    price: data.get("price"),
    is_active: data.get("active"),
    category_name: data.get("category"),
  };

  let url = "https://flask-inventory.onrender.com/item";
  if (method === "POST") {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(ItemData),
    });
    if (response.status === 409){
      return response
    }
    if (response.status === 404){
      return response
    }
    if (!response.ok) {
      window.alert("failed");
      throw json({ message: "Failed to save the lot" }, { status: 500 });
    }

    return redirect("/item/main");
  } else {
    const id = params.id;
    url = "/item/" + id;
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(ItemData),
    });
    if (response.status === 404){
      return response
    }
    if (!response.ok) {
      window.alert("failed update");
      throw json({ message: "Failed to save the Item. Try Again!!" }, { status: 500 });
    }

    return redirect("/item/main");
  }
}
