import React from "react";
import {
  Form,
  useNavigate,
  useNavigation,
  redirect,
  json,
} from "react-router-dom";
import { getAuthToken } from "../../util/Auth";
import { useActionData } from "react-router-dom";

function SupplierForm({ method, supData, accounts }) {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const data = useActionData();

  const isSubmitting = navigation.state === "submitting";
  function cancelHandler() {
    navigate("..");
  }

  return (
    <React.Fragment>
      <div className="hidden sm:block" aria-hidden="true">
        <div className="pb-2">
          <div className="border-t border-gray-200" />
        </div>
      </div>

      <div className="mt-10  sm:mt-0  bg-whitesmoke">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-base font-semibold leading-6 text-gray-900">
                Add a new supplier here
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Kindly create an account first to add supplier.
              </p>
            </div>
          </div>
          <div className="mt-2 bg-white rounded-lg mr-10 md:col-span-2 md:mt-0">
            {data && data.errors && (
              <ul>
                {Object.values(data.errors).map((err) => (
                  <li key={err}>{err}</li>
                ))}
              </ul>
            )}
            {data && data.message && <p>{data.message}</p>}
            <Form method={method}>
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="px-4 sm:px-2 py-5 ">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Supplier Name
                      </label>
                      <input
                        type="text"
                        name="supplier-name"
                        id="first-name"
                        autoComplete="given-name"
                        required
                        defaultValue={supData ? supData.supplier_name : ""}
                        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Supplier Email
                      </label>
                      <input
                        type="email"
                        name="supplier-email"
                        id="email-address"
                        defaultValue={supData ? supData.supplier_email : ""}
                        className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Supplier Phone Number
                      </label>
                      <input
                        type="text"
                        name="supplier-contact"
                        id="email-address"
                        defaultValue={supData ? supData.supplier_phone_no : ""}
                        className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Account
                      </label>
                      <select
                        name="account"
                        placeholder="Select Account"
                        required
                        defaultValue={
                          supData ? supData.account.account_name : ""
                        }
                        className="mt-2 block w-full rounded-md border-0 bg-white py-1.5 text-gray-900  ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      >
                        {accounts.map((account) => (
                          <option key={account.id} value={account.name}>
                            {" "}
                            {account.account_name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-span-6">
                      <label
                        htmlFor="street-address"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Supplier Site
                      </label>
                      <input
                        type="text"
                        name="supplier-site"
                        id="street-address"
                        defaultValue={supData ? supData.supplier_site : ""}
                        className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label>Status</label>
                      <div className=" space-x-2">
                        
                          <label>Active</label>
                          <input type="radio" name="active" value="True" />
                        <label>Inactive</label>
                        <input type="radio" name="active" value="False" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 pb-10 text-right sm:px-6">
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
          </div>
        </div>
      </div>

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>
    </React.Fragment>
  );
}

export default SupplierForm;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();
  const token = getAuthToken();

  const supData = {
    supplier_name: data.get("supplier-name"),
    supplier_phone_no: data.get("supplier-contact"),
    supplier_email: data.get("supplier-email"),
    account_name: data.get("account"),
    supplier_site: data.get("supplier-site"),
    is_active: data.get("active"),
  };

  let url = "https://flask-inventory.onrender.com/supplier";
  if (method === "POST") {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(supData),
    });
    if (response.status === 404) {
      return response;
    }
    if (response.status === 500) {
      return response;
    }
    if (response.status === 409) {
      return response;
    }
    if (!response.ok) {
      throw json({ message: "Failed to save the supplier" }, { status: 500 });
    }

    return redirect("/supplier");
  } else {
    const id = params.id;
    url = "https://flask-inventory.onrender.com/supplier/" + id;
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(supData),
    });
    if (!response.ok) {
      window.alert("failed update");
      throw json({ message: "Failed to save the supplier" }, { status: 500 });
    }

    return redirect("/supplier");
  }
}
