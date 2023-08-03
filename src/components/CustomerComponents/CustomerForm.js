import React from "react";
import {
  Form,
  useNavigate,
  useNavigation,
  redirect,
  json,
  useActionData,
} from "react-router-dom";
import { getAuthToken } from "../../util/Auth";

function CustomerForm({ method, cusData, title, accounts }) {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const data = useActionData();

  const isSubmitting = navigation.state === "submitting";
  function cancelHandler() {
    navigate("..");
  }

  return (
    <React.Fragment>
      <div>
        <div className="py-4"> 
          <div className="border-t border-gray-200" />
        </div>
      </div>

      <div className="mt-10">
        <div className="md:grid  md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-base font-semibold leading-6 text-gray-900">
                Customer {title}
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Input Customer details here
              </p>
            </div>
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
          </div>
          <div className="mt-5 bg-white mr-10 md:col-span-2 md:mt-0">
            <Form method={method}>
              <div className="overflow-hidden  shadow sm:rounded-md">
                <div className=" px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Customer Name
                      </label>
                      <input
                        type="text"
                        name="cussname"
                        required
                        defaultValue={cusData ? cusData.customer_name : ""}
                        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder=""
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Customer Phone Number
                      </label>
                      <input
                        name="cuscon"
                        type="text"
                        defaultValue={cusData ? cusData.customer_phone_no : ""}
                        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder=""
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Customer Bill To Site
                      </label>
                      <input
                        name="billto"
                        type="text"
                        defaultValue={
                          cusData ? cusData.customer_bill_to_site : "main"
                        }
                        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder=""
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Customer Site
                      </label>
                      <input
                        name="site"
                        type="text"
                        defaultValue={cusData ? cusData.customer_site : "main"}
                        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder=""
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Customer Email
                      </label>
                      <input
                        name="email"
                        type="email"
                        defaultValue={cusData ? cusData.customer_email : ""}
                        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder=""
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Account
                      </label>
                      <select
                        name="account"
                        required
                        defaultValue={ cusData ? cusData.account.account_name : "" }
                        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      >
                        {accounts.map((account) => (
                          <option key={account.id} value={account.name}>
                            {" "}
                            {account.account_name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-span-6 sm:col-span-4 ">
                      <label>Status</label>
                      <div className="space-x-2">
                        <label>Active</label>
                        <input type="radio" name="active" value="True" />
                        <label>Inactive</label>
                        <input type="radio" name="active" value="False" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <button
                    type="button"
                    onClick={cancelHandler}
                    disabled={isSubmitting}
                    className="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold mr-10 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
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

export default CustomerForm;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();
  const token = getAuthToken();

  const ItemData = {
    customer_name: data.get("cussname"),
    customer_phone_no: data.get("cuscon"),
    customer_email: data.get("email"),
    account_name: data.get("account"),
    is_active: data.get("active"),
    customer_site: data.get("site"),
    customer_bill_to_site: data.get("billto"),
  };

  let url = "/customer";
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
    if (response.status === 404) {
      return response;
    }
    if (response.status === 409) {
      return response;
    }
    if (response.status === 500) {
      return response;
    }
    if (!response.ok) {
      throw json({ message: "Failed to save the customer" }, { status: 500 });
    }

    return redirect("/customer");
  } else {
    const id = params.id;
    url = "/customer/" + id;
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(ItemData),
    });
    if (!response.ok) {
      window.alert("failed update");
      throw json({ message: "Failed to save the customer" }, { status: 500 });
    }

    return redirect("/customer");
  }
}
