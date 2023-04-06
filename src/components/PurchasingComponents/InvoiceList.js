import React from "react";
import { Link } from "react-router-dom";











function InvoiceList({invoices, title}){

    return(
        <React.Fragment>



            

















        <div>
            <h1>{title}</h1>
            <ul>
                {invoices.map((invoice)=>(
                    <li key= {invoice.id}>
                        <Link to={`${invoice.id}`}>
                        <h2>{invoice.invoice_number}</h2>- <p>{invoice.amount}</p>
                        <p>{invoice.supplier.supplier_name}</p>
                        </Link>
                        </li>
                ))}
            </ul>
        </div>
        </React.Fragment>
    )
}

export default InvoiceList;