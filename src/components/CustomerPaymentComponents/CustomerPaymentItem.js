import React from "react";
import { useSubmit, Link, useRouteLoaderData, useNavigate } from "react-router-dom";

function CustomerPaymentItem({payment}) {
  const token = useRouteLoaderData("root");
  const submit = useSubmit();
  const navigate = useNavigate()

  function cancelHandler() {
    navigate("..");
  }

  function startDeleteHandler() {
    const proceed = window.confirm("Are you sure?");

    if (proceed) {
      submit(null, { method: "delete" });
    }
  }
  return (
    <div className="max-w-screen-lg mx-auto">
      <h2 className="text-lg font-semibold mb-4">Payment</h2>
      <div className="shadow border rounded-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Payment information.
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <>
              <tr className="hover:bg-gray-100 transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {" "}
                  Customer name{" "}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {" "}
                  {payment.receipt.customer.customer_name}{" "}
                </td>
              </tr>
              <tr className="hover:bg-gray-100 transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {" "}
                  Invoice number{" "}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {" "}
                  {payment.receipt.receipt_number}{" "}
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {" "}
                  Payment Date{" "}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {" "}
                  {payment.date}{" "}
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Invoice Date
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {payment.receipt.date}
                </td>{" "}
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {" "}
                  Currency{" "}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {" "}
                  {payment.currency}{" "}
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {" "}
                  Balance{" "}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {" "}
                  {payment.receipt.customer_balance[0].balance}{" "}
                </td>
              </tr>
              <tr>
                {token && (
                  <menu>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {" "}
                      <button onClick={startDeleteHandler}>Delete</button>{" "}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {" "}
                      <button onClick={cancelHandler}>Back</button>{" "}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {" "}
                      <Link to="edit">Edit</Link>
                    </td>
                  </menu>
                )}
              </tr>
            </>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CustomerPaymentItem