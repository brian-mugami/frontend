import React from "react";
import {json, useLoaderData, useRouteLoaderData} from "react-router-dom";
import CustomerForm from "../../../components/CustomerComponents/CustomerForm";
import { getAuthToken } from "../../../util/Auth";

function CustomerEditPage(){
        const accounts = useLoaderData()
        const cusData = useRouteLoaderData("customers-detail")
       return(
        <React.Fragment>
            <CustomerForm method="patch" title="Edit" accounts={accounts} cusData={cusData}/>
        </React.Fragment>
       ) 
}

export default CustomerEditPage;

export async function loader(){
    const token = getAuthToken()
   
    const response = await fetch('https://flask-inventory.onrender.com/customer/account', {
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