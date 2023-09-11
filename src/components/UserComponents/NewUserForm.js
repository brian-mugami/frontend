import React, { useState } from "react";
import {
  useActionData,
  useNavigation,
  Form,
  json,
  redirect,
  useNavigate,
} from "react-router-dom";
import { getAuthToken } from "../../util/Auth";
import { userTypes } from "../../data/paymentTypes";

function NewUserForm({ user, method }) {
  const data = useActionData();
  const navigation = useNavigation();
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const isSubmitting = navigation.state === "submitting";

  function cancelHandler() {
    navigate("/user");
  }

  return (
    <React.Fragment>
      <div className="p-5">
      {data && data.errors && (
        <ul>
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      {data && data.message && <p>{data.message}</p>}
        <Form method={method}>
          {isSubmitting && <p>Submitting...</p>}
          <label className="block text-sm my-2 font-medium leading-6 text-gray-900">
            First name
          </label>
          <input
            id="fname"
            type="text"
            name="fname"
            required
            defaultValue={user ? user.first_name : ""}
            className="block w-1/2 rounded-md border-0 py-1.5 text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          ></input>
          <label className="block text-sm my-2 font-medium leading-6 text-gray-900">
            Last name
          </label>
          <input
            id="lname"
            type="text"
            name="lname"
            required
            defaultValue={user ? user.last_name : ""}
            className="block w-1/2 rounded-md border-0 py-1.5 text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          ></input>
          <label className="block text-sm my-2 font-medium leading-6 text-gray-900">
            email
          </label>
          <input
            id="fname"
            type="email"
            name="email"
            required
            defaultValue={user ? user.email : ""}
            className="block w-3/4 rounded-md border-0 py-1.5 text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          ></input>
          <div className="sm:col-span-3">
            <label
              htmlFor="password1"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Set password
            </label>
            <div className="mt-2">
              <input
                type="text"
                required
                name="password1"
                id="password1"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="password2"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Confirm password
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="password2"
                required
                id="password2"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              User Type
            </label>
            <div className="mt-2">
              <select
                name="is-admin"
                type="text"
                defaultValue={user && user.is_admin === true ? "Admin" : "User"}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              >
                {userTypes.map((type) => (
                  <option key={type.id} value={type.value}>
                    {" "}
                    {type.userType}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6 ">
            <button
              type="button"
              onClick={cancelHandler}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white  hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {isSubmitting ? "Saving.." : "Save"}
            </button>
          </div>
        </Form>
      </div>
    </React.Fragment>
  );
}
export default NewUserForm;

export async function action({ request, params }) {
  const data = await request.formData();
  const method = request.method;
  const token = getAuthToken();
  const id = params.userId;
  const UserData = {
    first_name: data.get("fname"),
    last_name: data.get("lname"),
    email: data.get("email"),
    is_admin: data.get("is-admin"),
    password1: data.get("password1"),
    password2: data.get("password2"),
  };

  if (method === "POST") {
    const response = await fetch("/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(UserData),
    });
    if (response.status === 409) {
      return response;
    }
    if (response.status === 417) {
      return response;
    }
    if (response.status === 400) {
      return response;
    }
    if (!response.ok) {
      throw json({ message: "Could not create user" }, { status: 500 });
    }

    return redirect("/user");
  } else if (method==="PATCH"){
    const response = await fetch("/user/" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(UserData),
    });
    if (response.status === 409) {
      return response;
    }
    if (response.status === 417) {
      return response;
    }
    if (response.status === 400) {
      return response;
    }
    if (!response.ok) {
      throw json({ message: "Could not update user" }, { status: 500 });
    }

    return redirect("/user");
  }
}
