import React, { useState } from "react";
import { Link, useActionData } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const PAGE_SIZE = 10;

const columns = [
  {
    field: "id",
    headerName: "Payment",
    width: 150,
    renderCell: (params) => (
      <Link to={`./${params.value}`}>{params.value}</Link>
    ),
  },
  {
    field: "supplierName",
    headerName: "Supplier",
    width: 200,
  },
  {
    field: "invoiceNumber",
    headerName: "Invoice Number",
    width: 200,
  },
  {
    field: "approvalStatus",
    headerName: "Approval Status",
    width: 150,
   
  },
  {
    field: "date",
    headerName: "Date",
    width: 200,
  },
  {
    field: "invoiceDate",
    headerName: "Invoice Date",
    width: 200,
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 300,
    renderCell: (params) => (
      <div className="flex" >
        <div className="pr-2">
        <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
          <Link to={`./${params.value}/approve`}>Approve</Link>
        </span>
        </div>
        <div className="pr-2">
        <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
          <Link to={`./${params.value}/accounting`}>Accounting</Link>
        </span>
        </div>
        <div>
        <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-black-700 ring-1 ring-inset ring-blue-700/10">
          <Link to={`./${params.value}/reject`}>Reject</Link>
        </span>
        </div>
      </div>
    ),
  },
];

const SupplierPaymentList = ({ payments }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const paginatedPayments = payments.slice(startIndex, endIndex);
  const data = useActionData();
  const totalPages = Math.ceil(payments.length / PAGE_SIZE);

  const handlePageChange = (params) => {
    setCurrentPage(params.page);
  };

  return (
    <div className="max-w-screen-lg mx-auto">
      <h2 className="text-lg font-semibold mb-4">Payments</h2>
      <div className="shadow border rounded-md">
        {data && data.errors && (
          <ul>
            {Object.values(data.errors).map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}
        {data && data.message && <p>{data.message}</p>}
        <div style={{ height: 500, width: "100%" }}>
          <DataGrid
            rows={paginatedPayments.map((payment) => ({
              id: payment.id,
              supplierName: payment.invoice.supplier.supplier_name,
              invoiceNumber: payment.invoice.invoice_number,
              approvalStatus: payment.approval_status,
              date: payment.date,
              invoiceDate: payment.invoice.date,
              actions: payment.id,
            }))}
            columns={columns}
            pagination
            pageSize={PAGE_SIZE}
            rowCount={payments.length}
            onPageChange={handlePageChange}
            
            components={{
              Toolbar: GridToolbar,
            }}
          />
        </div>
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
};

export default SupplierPaymentList;
