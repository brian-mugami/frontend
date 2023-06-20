import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";

const ItemList = ({ items }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = items.length; // Set the page size to the number of items

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedItems = items.slice(startIndex, endIndex);

  const totalPages = Math.ceil(items.length / pageSize);

  const handlePageChange = (params) => {
    setCurrentPage(params.page);
  };

  const columns = [
    { field: "id", headerName: "ID", hide: true },
    {
      field: "item_name",
      headerName: "Item Name",
      width: 250,
      renderCell: (params) => <Link to={`./${params.id}`}>{params.value}</Link>,
    },
    { field: "item_number", headerName: "Item Number", width: 200 },
    { field: "price", headerName: "Price", width: 200 },
  ];

  const rows = paginatedItems.map((item) => {
    return {
      id: item.id,
      item_name: item.item_name,
      item_number: item.item_number,
      price: item.price,
    };
  });

  return (
    <div className="max-w-screen-lg mx-auto">
      <h2 className="text-lg font-semibold mb-4">Items</h2>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pagination
          pageSize={pageSize}
          rowCount={items.length}
          onPageChange={handlePageChange}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
    </div>
  );
};

export default ItemList;
