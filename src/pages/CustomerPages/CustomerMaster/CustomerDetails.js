import React from "react";
import { json,useRouteLoaderData, redirect } from "react-router-dom";
import CustomerItem from "../../../components/CustomerComponents/CustomerItem";
import { getAuthToken } from "../../../util/Auth";

function CustomerDetailPage(){
    const customer = useRouteLoaderData("customers-detail")
    return(
        <React.Fragment>
                    <CustomerItem customer={customer}/>
        </React.Fragment>
    )
    
}

export default CustomerDetailPage;

export async function loader({request, params}){
    let url = 'https://inentory-test.onrender.com/customer/'
    const token = getAuthToken()
    const id = params.id
    const response = await fetch(url + id, {
        method:"get",
        headers:{
            "Authorization": "Bearer " + token,
            "Access-Control-Allow-Origin": "*",
        }
    })

    if(!response.ok){
        throw json({message: "Wrong Url"}, {status: 404})
    }

    const resData = await response.json()
    console.log(resData)
    return resData
}


export async function action({request,params}){
    const token = getAuthToken();

    const id = params.id;
    const response = await fetch("/customer/" + id, {
        method: request.method,
        headers : {
            'Authorization': 'Bearer ' + token
        }
    });
    if (!response.ok) {
        throw json(
          { message: 'Could not delete customer.' },
          {
            status: 500,
          }
        );
      }
      return redirect("/customer")
}