import { useState } from "react";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Tooltip } from "@material-tailwind/react";

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
      field: "customer_name",
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
        <>
        <Tooltip content="View accounting">
          <button className="px-2">
            <Link to={`./${params.row.id}/accounting`}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"
                />
              </svg>
            </Link>
          </button>
          </Tooltip>
          <Tooltip content="Pay">
          <button className="">
            <Link to={`./${params.row.id}/pay`}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                />
              </svg>
            
            </Link>
          </button>
          </Tooltip>
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
