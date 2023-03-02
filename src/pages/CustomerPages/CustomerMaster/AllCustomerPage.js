import React, { Suspense } from "react"
import { Await,json, useRouteLoaderData } from "react-router-dom";
import { getAuthToken } from "../../../util/Auth";
import CustomerList from "../../../components/CustomerComponents/Customerlist";
import { defer } from "react-router-dom";

function CustomersPage(){
    const {customers} = useRouteLoaderData("customers")
    return(
        <React.Fragment>
            <Suspense fallback={<p style={{textAlign: 'center'}}>Loading....</p>}>
            <Await resolve={customers}>
                    {(loadedCustomer) => <CustomerList customers={loadedCustomer}/>}
                </Await>
            </Suspense>
        </React.Fragment>
    )
}

export default CustomersPage;

async function customersLoader(){
    const token = getAuthToken()
    const response = await fetch("http://localhost:8000/customer", {
        method:"get",
        headers:{
            "Authorization": "Bearer "+ token
        }
    })
    if(!response.ok){
        throw json({message:"Cant get customers"}, {status:500})
    }else{
        const resData = await response.json()
        return resData
    };
}

export function loader (){
    return(
        defer({
            customers: customersLoader()
        })
    )}