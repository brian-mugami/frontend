import React from "react"
import { Link } from "react-router-dom";

function CustomerList({customers}){
    return (
        <React.Fragment>
            <div>
                <h2>Customers</h2>
                <ul>
                    {customers.map((customer)=><li key={customer.id}><Link to={`./${customer.id}`}>{customer.customer_name} - {customer.customer_number}</Link></li>)}
                </ul>
            </div>
        </React.Fragment>
    )
}
export default CustomerList;