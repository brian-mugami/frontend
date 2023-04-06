import React from "react";
import { Link } from "react-router-dom";

function ReceiptList({receipts, title}){

    return(
        <React.Fragment>
        <div>
            <h1>{title}</h1>
            <ul>
                {receipts.map((receipt)=>(
                    <li key= {receipt.id}>
                        <Link to={`${receipt.id}`}>
                        <h2>{receipt.receipt_number}</h2>- <p>{receipt.amount}</p>
                        <p>{receipt.customer.customer_name}</p>
                        </Link>
                        </li>
                ))}
            </ul>
        </div>
        </React.Fragment>
    )
}

export default ReceiptList;