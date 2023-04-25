import { useState } from "react";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";

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
      field: "customer_name",
      headerName: "Customer Name",
      width: 200,
      renderCell: (params) => (
        <Link to={`./${params.row.id}`}>{params.value}</Link>
      ),
    },
    { field: "receipt_number", headerName: "Receipt Number", width: 150 },
    { field: "amount", headerName: "Receipt Amount", width: 150 },
    { field: "accounted_status", headerName: "Accounting Status", width: 200 },
    { field: "status", headerName: "Payment Status", width: 150 },
    { field: "sale_type", headerName: "Sale Type", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <>
          <button className="btn btn-primary">
            <Link to={`./${params.row.id}/accounting`}>View Accounting</Link>
          </button>
          <button className="btn btn-dark">
            <Link to={`./${params.row.id}/pay`}>Pay</Link>
          </button>
        </>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <DataGrid
        rows={paginatedReceipts}
        columns={columns}
        pageSize={PAGE_SIZE}
        pagination
        page={currentPage - 1}
        onPageChange={(params) => setCurrentPage(params.page + 1)}
        rowCount={receipts.length}
      />
    </div>
  );
}

export default ReceiptList;
