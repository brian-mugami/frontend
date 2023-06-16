import * as React from "react";
import { Link } from "react-router-dom";
import { useActionData } from "react-router";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const PAGE_SIZE = 10;

function InvoiceList({ invoices, title }) {
  const [currentPage, setCurrentPage] = React.useState(1);

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const paginatedInvoices = invoices.slice(startIndex, endIndex);
  const data = useActionData();

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const columns = [
    {
      field: "invoice_number",
      headerName: "Invoice number",
      width: 100,
      renderCell: (params) => <Link to={`./${params.id}`}>{params.value}</Link>,
    },
    {
      field: "date",
      headerName: "Creation Date",
      width: 200,
    },
    {
      field: "supplier",
      headerName: "Supplier Name",
      width: 200,
      valueGetter: (params) => params.row.supplier.supplier_name,
    },
    {
      field: "amount",
      headerName: "Invoice Amount",
      width: 200,
    },
    {
      field: "currency",
      headerName: "Currency",
      width: 150,
    },
    {
      field: "status",
      headerName: "Payment Status",
      width: 200,
    },
    {
      field: "accounted",
      headerName: "Accounted Status",
      width: 200,
    },
    {
      field: "update_date",
      headerName: "Update Date",
      width: 200,
    },
    {
      field: "matched_to_lines",
      headerName: "Matched Status",
      width: 200,
    },
    {
      field: "options",
      headerName: "Actions",
      width: 400,
      renderCell: (params) => (
        <div className="flex">
          <div className="pr-2">
            <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
              <Link to={`./${params.row.id}/account`}>Account</Link>
            </span>
          </div>
          <div className="pr-2">
            <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
              <Link to={`./${params.row.id}/payment`}>Pay</Link>
            </span>
          </div>
          <div>
            <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
              <Link to={`./${params.row.id}/accounting`}>View</Link>
            </span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div style={{ height: 600, width: "100%" }}>
      <h2 className="text-lg font-semibold mb-4">invoices</h2>
      <div className="shadow border rounded-md">
        {data && data.errors && (
          <ul>
            {Object.values(data.errors).map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}
        {data && data.message && <p>{data.message}</p>}
        <DataGrid
          rows={paginatedInvoices}
          columns={columns}
          pageSize={PAGE_SIZE}
          rowCount={invoices.length}
          pagination
          paginationMode="server"
          onPageChange={(params) => goToPage(params.page + 1)}
          autoHeight
          components={{
            Toolbar: GridToolbar,
          }}
        />
      </div>
    </div>
  );
}

export default InvoiceList;
