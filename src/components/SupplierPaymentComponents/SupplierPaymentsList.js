import React, { useState } from "react";
import { Link, useActionData } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';

const PAGE_SIZE = 10;

const columns = [
  {
    field: 'id',
    headerName: 'Payment',
    width: 150,
    renderCell: (params) => (
      <Link to={`./${params.value}`}>{params.value}</Link>
    )
  },
  {
    field: 'supplierName',
    headerName: 'Supplier',
    width: 200,
  },
  {
    field: 'invoiceNumber',
    headerName: 'Invoice Number',
    width: 200,
  },
  {
    field: 'approved',
    headerName: 'Approved',
    width: 150,
    renderCell: (params) => (
      <span>
        {params.value === true ? "approved" : "Not Approved"}
      </span>
    )
  },
  {
    field: 'date',
    headerName: 'Date',
    width: 200,
  },
  {
    field: 'invoiceDate',
    headerName: 'Invoice Date',
    width: 200,
  },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 300,
    renderCell: (params) => (
      <div>
        <button className="btn btn-danger">
          <Link to={`./${params.value}/approve`}>Approve</Link>
        </button>
        <button className="btn btn-primary">
          <Link to={`./${params.value}/accounting`}>Accounting</Link>
        </button>
      </div>
    )
  },
];

const SupplierPaymentList = ({ payments }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const paginatedPayments = payments.slice(startIndex, endIndex);
  const data = useActionData()
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
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={paginatedPayments.map(payment => ({
              id: payment.id,
              supplierName: payment.invoice.supplier.supplier_name,
              invoiceNumber: payment.invoice.invoice_number,
              approved: payment.approved,
              date: payment.date,
              invoiceDate: payment.invoice.date,
              actions: payment.id,
            }))}
            columns={columns}
            pagination
            pageSize={PAGE_SIZE}
            rowCount={payments.length}
            onPageChange={handlePageChange}
            autoHeight
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
