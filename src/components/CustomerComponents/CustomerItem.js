import React from "react";
import { useSubmit, Link, useRouteLoaderData } from "react-router-dom";

function CustomerItem({customer}){
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
            <h3>Customer Details</h3>
            <p>Customer name-{customer.customer_name}</p>
            <p>Customer number-{customer.customer_number}</p>
            <p>Customer contact-{customer.customer_contact}</p>
            <p>Customer account-{customer.account.account_name}</p>
            <p>Customer Creation Date - {customer.date_registered}</p>
            <p>Is Item Active - {customer.is_active ? "Active":"Inactive"}</p>
            {token && <menu>
                <Link to="edit">Edit</Link>
                <button onClick={startDeleteHandler}>Delete</button>
                </menu>}
        </React.Fragment>)


}

export default CustomerItem;