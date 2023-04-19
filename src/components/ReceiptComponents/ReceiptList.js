import React, { useState } from "react";
import { Link } from "react-router-dom";

const PAGE_SIZE = 10;

function ReceiptList({ receipts, title }) {
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const paginatedreceipts = receipts.slice(startIndex, endIndex);

  const totalPages = Math.ceil(receipts.length / PAGE_SIZE);

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="max-w-screen-lg mx-auto">
      <h2 className="text-lg font-semibold mb-4">receipts</h2>
      <div className="shadow border rounded-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Customer Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                receipt Number
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                receipt Amount
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedreceipts.map((receipt) => (
              <tr
                key={receipt.id}
                className="hover:bg-gray-100 transition-colors duration-200"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <Link to={`./${receipt.id}`}>
                    {receipt.customer.customer_name}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {receipt.receipt_number}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {receipt.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button><Link to={`./${receipt.id}/accounting`}>View Accounting</Link></button>
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

export default ReceiptList;
