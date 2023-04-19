import React, { useState } from "react";
import { Link } from "react-router-dom";

const PAGE_SIZE = 10;

function InvoiceList({ invoices, title }) {
    const [currentPage, setCurrentPage] = useState(1);

    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    const paginatedInvoices = invoices.slice(startIndex, endIndex);
  
    const totalPages = Math.ceil(invoices.length / PAGE_SIZE);
  
    const goToPage = (pageNumber) => {
      setCurrentPage(pageNumber);
    };

  return (

    <div className="max-w-screen-lg mx-auto">
    <h2 className="text-lg font-semibold mb-4">invoices</h2>
    <div className="shadow border rounded-md">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              invoice Number
            </th>
          <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Creation Date
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Supplier Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              invoice Amount
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Currency
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Payement Status
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Accounted Status
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Update Date
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Matched Status
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Options
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {paginatedInvoices.map((invoice) => (
            <tr
              key={invoice.id}
              className="hover:bg-gray-100 transition-colors duration-200"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                <Link to={`./${invoice.id}`}>{invoice.invoice_number}</Link>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {invoice.date}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {invoice.supplier.supplier_name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {invoice.amount}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {invoice.currency}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {invoice.status}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {invoice.accounted}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {invoice.update_date}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {invoice.matched_to_lines}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <button className="btn btn-success"><Link to={`./${invoice.id}/account`}> Account</Link></button>
              <button className="btn btn-warning"><Link to={`./${invoice.id}/payment`}> Pay</Link></button>
              <button className="btn btn-primary"><Link to={`./${invoice.id}/accounting`}> View Accounting</Link></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {totalPages > 1 && (
      <div className="flex justify-center mt-4">
        <nav className="inline-flex rounded-md shadow">
          <ul className="flex">
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index}>
                <button
                  className={`px-4 py-2 ${
                    currentPage === index + 1
                      ? "bg-gray-900 text-white"
                      : "bg-white text-gray-700"
                  } font-medium`}
                  onClick={() => goToPage(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    )}
  </div>






    





  
   
  );
}

export default InvoiceList;
