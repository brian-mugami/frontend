import React from "react"
import { useLoaderData, json } from "react-router-dom";
import SupplierForm from "../../../components/SupplierComponents/SupplierForm";
import { getAuthToken } from "../../../util/Auth";

function NewSupplierPage(){
const accounts = useLoaderData()

    return(
        <React.Fragment>
            <SupplierForm method="post" title="Creation" accounts={accounts}/>
        </React.Fragment>
    )
}

export default NewSupplierPage;

export async function loader(){
    const token = getAuthToken()
   
    const response = await fetch('http://localhost:8000/supplier/account', {
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