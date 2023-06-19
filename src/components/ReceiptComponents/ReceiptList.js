import { useState } from "react";
import { Link } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";


const PAGE_SIZE = 10;

function ReceiptList({ receipts, title }) {
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const paginatedReceipts = receipts.slice(startIndex, endIndex);

  const totalPages = Math.ceil(receipts.length / PAGE_SIZE);

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const columns = [
    {
      field: "receipt_number",
      headerName: "Receipt Number",
      width: 150,
      renderCell: (params) => (
        <Link to={`./${params.row.id}`}>{params.value}</Link>
      ),
    },
    {
      field: "customer",
      headerName: "Customer Name",
      width: 200,
    },
    { field: "amount", headerName: "Receipt Amount", width: 150 },
    { field: "accounted_status", headerName: "Accounting Status", width: 200 },
    { field: "status", headerName: "Payment Status", width: 150 },
    { field: "sale_type", headerName: "Sale Type", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <div className="flex">
          <div className="pr-2">
            <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
              <Link to={`./${params.row.id}/accounting`}>View accounting</Link>
            </span>
          </div>
          <div>
            <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
              <Link to={`./${params.row.id}/pay`}>Pay</Link>
            </span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div style={{ height: 500, width: "100%" }}>
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <DataGrid
        rows={paginatedReceipts}
        columns={columns}
        pageSize={PAGE_SIZE}
        rowCount={receipts.length}
        pagination
        paginationMode="server"
        page={currentPage - 1}
        onPageChange={(params) => setCurrentPage(params.page + 1)}
        components={{
          Toolbar: GridToolbar,
        }}
      />
    </div>
  );
}

export default ReceiptList;



