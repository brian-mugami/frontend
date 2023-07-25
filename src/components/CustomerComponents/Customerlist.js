import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
const PAGE_SIZE = 20;

const CustomerList = ({ customers }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const paginatedCustomers = customers.slice(startIndex, endIndex);

  const totalPages = Math.ceil(customers.length / PAGE_SIZE);

  const handlePageChange = (params) => {
    setCurrentPage(params.page);
  };

  const columns = [
    { field: "id", headerName: "ID", hide: true },
    {
      field: "customer_name",
      headerName: "Customer Name",
      width: 250,
      renderCell: (params) => <Link to={`./${params  .id}`}>{params.value}</Link>,
    },
    { field: "customer_number", headerName: "Customer Number", width: 200 },
    { field: "customer_email", headerName: "Customer Email", width: 300 },
    { field: "checkbox", headerName: "Checkbox", width: 100, type: "checkbox" },
  ];

  const rows = paginatedCustomers.map((customer) => {
    return {
      id: customer.id,
      customer_name: customer.customer_name,
      customer_number: customer.customer_number,
      customer_email: customer.customer_email,
    };
  });

  return (
    <div className="max-w-screen-lg mx-auto">
      <h2 className="text-lg font-semibold mb-4">Customers</h2>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pagination
          pageSize={PAGE_SIZE}
          rowCount={customers.length}
          onPageChange={handlePageChange}
          checkboxSelection
        />
      </div>
    </div>
  );
};

export default CustomerList;
