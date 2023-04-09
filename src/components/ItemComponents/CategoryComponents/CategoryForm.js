import React from "react";
import {
  Form,
  useNavigate,
  useNavigation,
  json,
  redirect,
} from "react-router-dom";
import { getAuthToken } from "../../../util/Auth";
import { useActionData } from "react-router-dom";

function CategoryForm({ method, title, accounts, categories }) {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const data = useActionData();

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

      <Form method={method}>
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Category {title}
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Add categories here.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-2">
              <label
                htmlFor="Price"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                *Category Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="catname"
                  placeholder="Category name"
                  required
                  defaultValue={categories ? categories.name : ""}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-1">
              <label
                htmlFor="country"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Category Account
              </label>
              <div className="mt-2">
                <select
                  id="country"
                  name="account"
                  required
                  defaultValue={
                    categories ? categories.account.account_name : ""
                  }
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  {accounts.map((account) => (
                    <option key={account.id} value={account.account_name}>
                      {" "}
                      {account.account_name}
                    </option>
                  ))}
                </select>
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

export default CategoryForm;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();
  const token = getAuthToken();

  const CategoryData = {
    name: data.get("catname"),
    account_name: data.get("account"),
  };
  let url = "/item/category";
  if (method === "POST") {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(CategoryData),
    });
    if (!response.ok) {
      window.alert("failed");
      throw json({ message: "Failed to save the lot" }, { status: 500 });
    }

    return redirect("/item/category");
  } else {
    const id = params.id;
    url = "/item/category/" + id;
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(CategoryData),
    });
    if (!response.ok) {
      window.alert("failed update");
      throw json({ message: "Failed to save the category" }, { status: 500 });
    }

    return redirect("/item/category");
  }
}
