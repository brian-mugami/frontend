import React from "react";
import { useRouteLoaderData, Link, useSubmit } from "react-router-dom";

function Accountitem({ account, title }) {
  const {token} = useRouteLoaderData("root");
  const submit = useSubmit();

  function startDeleteHandler() {
    const proceed = window.confirm("Are you sure?");

    if (proceed) {
      submit(null, { method: "delete" });
    }
  }

  return (
    <React.Fragment>
      <div className="max-w-screen-lg mx-auto">
        <h2 className="text-lg font-semibold mb-4">accounts</h2>
        <div className="shadow border rounded-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {title} account
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <>
                <tr className="hover:bg-gray-100 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {" "}
                    name{" "}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {" "}
                    {account.account_name}{" "}
                  </td>
                </tr>
                <tr className="hover:bg-gray-100 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {" "}
                    description{" "}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {" "}
                    {account.account_description}{" "}
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {" "}
                    number{" "}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {" "}
                    {account.account_number}{" "}
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    type
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {account.account_type}
                  </td>{" "}
                </tr>

                <tr>
                  {token && (
                    <menu>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {" "}
                        <Link to="edit">Edit</Link>{" "}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {" "}
                        <button onClick={startDeleteHandler}>
                          Delete
                        </button>{" "}
                      </td>
                    </menu>
                  )}
                </tr>
              </>
            </tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Accountitem;
