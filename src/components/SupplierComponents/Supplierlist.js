import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';

const PAGE_SIZE = 10;

const columns = [
  {
    field: 'supplier_name',
    headerName: 'Supplier Name',
    width: 200,
    renderCell: (params) => (
      <Link to={`./${params.row.id}`}>{params.value}</Link>
    )
  },
  { field: 'supplier_number', headerName: 'Supplier Number', width: 200 },
  { field: 'supplier_email', headerName: 'Supplier Email', width: 200 },
];

const SupplierList = ({ suppliers }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const paginatedSuppliers = suppliers.slice(startIndex, endIndex);

  const totalPages = Math.ceil(suppliers.length / PAGE_SIZE);

  const handlePageChange = (params) => {
    setCurrentPage(params.page + 1);
  };

  return (
    <div className="max-w-screen-lg mx-auto">
      <h2 className="text-lg font-semibold mb-4">Suppliers</h2>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          columns={columns}
          rows={paginatedSuppliers}
          pagination
          pageSize={PAGE_SIZE}
          rowCount={suppliers.length}
          onPageChange={handlePageChange}
        />
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

export default SupplierList;
