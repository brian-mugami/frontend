import React from "react";
import {json, useLoaderData, useRouteLoaderData} from "react-router-dom";
import SupplierForm from "../../../components/SupplierComponents/SupplierForm";
import { getAuthToken } from "../../../util/Auth";

function SupplierEditPage(){
        const accounts = useLoaderData()
        const supData = useRouteLoaderData("suppliers-detail")
       return(
        <React.Fragment>
            <SupplierForm method="patch" title="Edit" accounts={accounts} supData={supData}/>
        </React.Fragment>
       ) 
}

export default SupplierEditPage;

export async function loader(){
    const token = getAuthToken()
   
    const response = await fetch('https://flask-inventory.onrender.com/supplier/account', {
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