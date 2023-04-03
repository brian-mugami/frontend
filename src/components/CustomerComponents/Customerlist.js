import React from "react";
import { Link } from "react-router-dom";

function CustomerList({ customers }) {
  return (
    <React.Fragment>
      <div className="shadow-lg rounded-lg overflow-hidden border border-gray-200">
        <div className="relative">
          <div className="absolute top-0 left-0 bg-purple-700 py-1 px-4 text-white shadow-lg text-2xl font-bold tracking-wide z-10 filter drop-shadow-lg">
            Customers
          </div>
          <div className="relative overflow-x-auto pt-12">
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2 bg-gray-200 font-semibold text-gray-600 text-left">
                    Customer Name
                  </th>
                  <th className="px-4 py-2 bg-gray-200 font-semibold text-gray-600 text-left">
                    Customer Number
                  </th>
                  <th className="px-4 py-2 bg-gray-200 font-semibold text-gray-600 text-left">
                    Customer Email
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-gray-100">
                  <td className="px-4 py-2 border border-t border-gray-200 pt-4">
                    {customers.map((customer) => (
                      <li key={customer.id}>
                        <Link to={`./${customer.id}`}>
                          {customer.customer_name}{" "}
                        </Link>
                      </li>
                    ))}
                  </td>
                  <td className="px-4 py-2 border border-t border-gray-200 pt-4">
                    {customers.map((customer) => (
                      <li key={customer.id}>
                        <Link to={`./${customer.id}`}>
                          {customer.customer_number}
                        </Link>
                      </li>
                    ))}
                  </td>
                  <td className="px-4 py-2 borde rborder-t border-gray-200 pt-4">
                    {customers.map((customer) => (
                      <li key={customer.id}>
                        <Link to={`./${customer.id}`}>
                          {customer.customer_email}
                        </Link>
                      </li>
                    ))}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default CustomerList;
