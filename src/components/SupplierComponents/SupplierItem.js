import React from "react";
import { useSubmit, Link, useRouteLoaderData } from "react-router-dom";

function SupplierItem({supplier}){
    const token = useRouteLoaderData('root')
    const submit = useSubmit()

    function startDeleteHandler() {
        const proceed = window.confirm('Are you sure?');
    
        if (proceed) {
          submit(null, { method: 'delete'});
        }
      }

      return(
        <React.Fragment>
            <h3>Supplier Details</h3>
            <p>Supplier name-{supplier.supplier_name}</p>
            <p>Supplier number-{supplier.supplier_number}</p>
            <p>Supplier contact-{supplier.supplier_contact}</p>
            <p>Supplier account-{supplier.account.account_name}</p>
            <p>Supplier site-{supplier.supplier_site}</p>
            <p>Supplier Creation Date - {supplier.date_registered}</p>
            <p>Is Item Active - {supplier.is_active ? "Active":"Inactive"}</p>
            {token && <menu>
                <Link to="edit">Edit</Link>
                <button onClick={startDeleteHandler}>Delete</button>
                </menu>}
        </React.Fragment>)


}

export default SupplierItem;