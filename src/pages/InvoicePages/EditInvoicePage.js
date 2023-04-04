import React from "react";
import {json, useRouteLoaderData} from "react-router-dom";
import InvoiceForm from "../../components/PurchasingComponents/InvoiceForm";
import { getAuthToken } from "../../util/Auth";

function InvoiceEditPage(){
        const invoiceData = useRouteLoaderData("invoice-detail")
       return(
        <React.Fragment>
            <InvoiceForm method="patch" title="Edit" invoiceData={invoiceData}/>
        </React.Fragment>
       ) 
}

export default InvoiceEditPage;

export async function loader(){
    const token = getAuthToken()
   
    const response = await fetch('/customer/account', {
        method: "get",
        headers: {
            "Authorization": 'Bearer '+ token
        }
    })
    if(!response.ok){
        throw json({message: "The response was not ok"},{status: 500})
    }else{
        const resData = await response.json()
        return resData
    }
};