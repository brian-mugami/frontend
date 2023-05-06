import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';

const PAGE_SIZE = 10;

function CustomerPaymentsList({ payments }) {
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const paginatedPayments = payments.slice(startIndex, endIndex);

  const totalPages = Math.ceil(payments.length / PAGE_SIZE);

  const handlePageChange = (params) => {
    setCurrentPage(params.page + 1);
  };

  const columns = [
    {
      field: 'payment',
      headerName: 'Payment',
      flex: 1,
      renderCell: (params) => (
        <Link to={`./${params.row.id}`}>{params.row.id}</Link>
      ),
    },
    {
      field: 'customer',
      headerName: 'Customer',
      flex: 1,
      valueGetter: (params) =>
        params.row.receipt.customer.customer_name || '',
    },
    {
      field: 'receiptNumber',
      headerName: 'Receipt Number',
      flex: 1,
      valueGetter: (params) => params.row.receipt.receipt_number || '',
    },
    {
      field: 'approved',
      headerName: 'Approved',
      flex: 1,
      valueGetter: (params) =>
        params.row.approved === true ? 'approved' : 'Not Approved',
    },
    {
      field: 'paymentDate',
      headerName: 'Payment Date',
      flex: 1,
      valueGetter: (params) => params.row.date || '',
    },
    {
      field: 'receiptDate',
      headerName: 'Receipt Date',
      flex: 1,
      valueGetter: (params) => params.row.receipt.date || '',
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <div>
          <button className="btn btn-danger">
            <Link to={`./${params.row.id}/approve`}>Approve</Link>
          </button>
          <button className="btn btn-primary">
            <Link to={`./${params.row.id}/accounting`}>Accounting</Link>
          </button>
        </div>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <h2 className="text-lg font-semibold mb-4">Payments</h2>
      <DataGrid
        rows={paginatedPayments}
        columns={columns}
        pagination
        pageSize={PAGE_SIZE}
        onPageChange={handlePageChange}
        rowCount={payments.length}
        paginationMode="server"
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
                        ? 'bg-gray-900 text-white'
                        : 'bg-white text-gray-700'
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

export default CustomerPaymentsList;