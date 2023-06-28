import React from "react";
import {
  useActionData,
  useNavigation,
  Form,
  json,
  redirect,
  useNavigate,
} from "react-router-dom";
import { getAuthToken } from "../../util/Auth";

function UserForm({ user }) {
  const data = useActionData();
  const navigation = useNavigation();
  const navigate = useNavigate();

  const isSubmitting = navigation.state === "submitting";

  function cancelHandler() {
    navigate("/user");
  }

  return (
    <React.Fragment>
        <div className="p-5">
      {data && data.message && (
        <ul>
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      <Form method="patch">
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
export default UserForm;

export async function action({ request, params }) {
  const formdata = await request.formData();
  const token = getAuthToken();

  const Userdata = {
    first_name: formdata.get("fname"),
    last_name: formdata.get("lname"),
    email: formdata.get("email"),
    
  };

  const id = params.userId;

  const response = await fetch(
    "https://inentory-test.onrender.com/user/" + id,
    {
      method: "Patch",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(Userdata),
    }
  );

  if (!response.ok) {
    throw json({ message: "Could not update user data" }, { status: 500 });
  }

  return redirect("/user");
}
