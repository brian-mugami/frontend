import React from "react";
import { DataGrid } from '@mui/x-data-grid';
import { Link } from "react-router-dom";

function LotList({ lots }) {

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'lot', headerName: 'Lot Name', width: 200, renderCell: (params) => <Link to={`./${params.value}`}>{params.value}</Link> },
    { field: 'batch', headerName: 'Lot Number', width: 200, renderCell: (params) => <Link to={`./${params.row.id}`}>{params.value}</Link> },
    { field: 'expiry_date', headerName: 'Lot Email', width: 200, renderCell: (params) => <Link to={`./${params.row.id}`}>{params.value}</Link> }
  ];

  const rows = lots.map((lot, index) => {
    return { id: lot.id, lot: lot.lot, batch: lot.batch, expiry_date: lot.expiry_date };
  });

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} />
    </div>
  );
}

export default LotList;
