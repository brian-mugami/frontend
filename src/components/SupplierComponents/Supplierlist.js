import React from "react"
import { Link } from "react-router-dom";

function SupplierList({suppliers}){
    return (
        <React.Fragment>
            <div>
                <h2>Suppliers</h2>
                <ul>
                    {suppliers.map((supplier)=><li key={supplier.id}><Link to={`./${supplier.id}`}>{supplier.supplier_name} - {supplier.supplier_number}</Link></li>)}
                </ul>
            </div>
        </React.Fragment>
    )
}
export default SupplierList;