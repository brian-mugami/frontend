import {
  Form,
  redirect,
  useNavigate,
  useNavigation,
  json,
} from "react-router-dom";
import { getAuthToken } from "../../util/Auth";
import { useActionData } from "react-router-dom";
import React from "react";

function InvAdjAccountForm({ method, title, account }) {
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
      {data && data.message && <p>{data.message}</p>}
      <Form method={method}>
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Create {title} Account
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
                account name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="accName"
                  required
                  defaultValue={account ? account.account_name : ""}
                  placeholder="account name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="region"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                account description
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="accDesc"
                  rows="5"
                  placeholder="account description"
                  defaultValue={account ? account.account_description : ""}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="Item-Volume"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                account number
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="accNum"
                  required
                  defaultValue={account ? account.account_number : ""}
                  placeholder="account number"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
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

export default InvAdjAccountForm;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();
  const token = getAuthToken();

  const accountData = {
    account_name: data.get("accName"),
    account_description: data.get("accDesc"),
    account_number: data.get("accNum"),
  };

  let url = "https://inventory-accounting.onrender.com/inventory-adjustment/account";
  if (method === "POST") {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(accountData),
    });
    if (response.status === 409) {
      return response;
    }
    if (response.status === 400) {
      return response;
    }

    if (!response.ok) {
      throw json({ message: "Failed to save the account" }, { status: 500 });
    }

    return redirect("/account/inv-adj");
  } else {
    const id = params.id;
    url = "/inventory-adjustment/account/" + id;
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(accountData),
    });
    if (response.status === 400) {
      return response;
    }

    if (!response.ok) {
      throw json({ message: "Failed to update the account" }, { status: 500 });
    }

    return redirect("/account/inv-adj");
  }
}
