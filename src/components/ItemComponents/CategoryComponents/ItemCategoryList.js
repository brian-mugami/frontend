import { Link } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';

function CategoryList({categories}){

  const columns = [
    { field: 'name', headerName: 'Category Name', flex: 1 },
    { field: 'accountName', headerName: 'Category Account', flex: 1 ,  renderCell: (params) => (<Link to={`./${params.id}`}>{params.value}</Link>) },
  ];

  const rows = categories.map((cat) => {
    return { 
      id: cat.id,
      name: cat.name,
      accountName: cat.account.account_name,
    }
  });

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} />
    </div>
  );
}

export default CategoryList;
