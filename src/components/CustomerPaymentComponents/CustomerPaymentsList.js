import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const PAGE_SIZE = 10;

const columns = [
  {
    field: "payment",
    headerName: "Payment",
    renderCell: (params) => (
      <Link to={`./${params.row.id}`}>{params.row.id}</Link>
    ),
    width: 200,
  },
  {
    field: "customer",
    headerName: "Customer",
    valueGetter: (params) => params.row.receipt.customer.customer_name || "",
    width: 200,
  },
  {
    field: "receiptNumber",
    headerName: "Receipt Number",
    width: 200,

    valueGetter: (params) => params.row.receipt.receipt_number || "",
  },
  {
    field: "approved",
    headerName: "Approved",
    width: 200,
    valueGetter: (params) =>
      params.row.approved === true ? "approved" : "Not Approved",
  },
  {
    field: "paymentDate",
  headerName: "Payment Date",
    width: 200,
    valueGetter: (params) => params.row.date || "",
  },
  {
    field: "receiptDate",
    headerName: "Receipt Date",
    width: 200,
    valueGetter: (params) => params.row.receipt.date || "",
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 300,

    renderCell: (params) => (
      <div className="flex">
        <div className="pr-2">
          <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
            <Link to={`./${params.row.id}/approve`}>Approve</Link>
          </span>
        </div>
        <div className="pr-2">
          <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
            <Link to={`./${params.row.id}/accounting`}>Accounting</Link>
          </span>
        </div>
        <div>
          <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
            <Link to={`./${params.row.id}/reject`}>Reject</Link>
          </span>
        </div>
      </div>
    ),
  },
];
function CustomerPaymentsList({ payments }) {
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const paginatedPayments = payments.slice(startIndex, endIndex);
  const totalPages = Math.ceil(payments.length / PAGE_SIZE);

  const handlePageChange = (params) => {
    setCurrentPage(params.page + 1);
  };

  return (
    <div style={{ height: 500, width: "100%" }}>
      <h2 className="text-lg font-semibold mb-4">Payments</h2>
      <DataGrid
        rows={paginatedPayments}
        columns={columns}
        pagination
        pageSize={PAGE_SIZE}
        onPageChange={handlePageChange}
        rowCount={payments.length}
        paginationMode="server"
        components={{
          Toolbar: GridToolbar,
        }}
      />
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
                    onClick={() => setCurrentPage(index + 1)}
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

export default CustomerPaymentsList;
