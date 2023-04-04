import React from "react";
import { Link, useRouteLoaderData, useSubmit } from "react-router-dom";

function InvoiceItem({invoice}){
    const token = useRouteLoaderData('root')
    const submit = useSubmit()

    function startDeleteHandler(){
        const proceed = window.confirm("Are you sure?");

        if (proceed){
            submit(null, {method: 'delete'})
        }
    }

    return(
        <React.Fragment>
            <h1>{invoice.invoice_number}</h1>
            <time>Date : {invoice.date}</time>
            {token &&<menu>
            <Link to="edit">Edit</Link>
            <button onClick={startDeleteHandler}>Delete Invoice</button>
            </menu>
            }
            
        </React.Fragment>
    )

}

export default InvoiceItem;