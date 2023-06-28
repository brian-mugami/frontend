import React from "react"
import { useLoaderData, json } from "react-router-dom";
import CustomerForm from "../../../components/CustomerComponents/CustomerForm";
import { getAuthToken } from "../../../util/Auth";

function NewCustomerPage(){
const accounts = useLoaderData()

    return(
        <React.Fragment>
            <CustomerForm method="post" title="Creation" accounts={accounts}/>
        </React.Fragment>
    )
}

export default NewCustomerPage;

export async function loader(){
    const token = getAuthToken()
   
    const response = await fetch('/customer/account', {
        method: "get",
        headers: {
            "Authorization": 'Bearer '+ token,
            "Access-Control-Allow-Origin": "*",
        }
    })
    if(!response.ok){
        throw json({message: "The response was not ok"},{status: 500})
    }else{
        const resData = await response.json()
        return resData
    }
};