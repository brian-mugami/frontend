import React from "react";
import { json,useRouteLoaderData, redirect } from "react-router-dom";
import SupplierItem from "../../../components/SupplierComponents/SupplierItem";
import { getAuthToken } from "../../../util/Auth";

function SupplierDetailPage(){
    const supplier = useRouteLoaderData("suppliers-detail")
    return(
        <React.Fragment>
                    <SupplierItem supplier={supplier}/>
        </React.Fragment>
    )
    
}

export default SupplierDetailPage;

export async function loader({request, params}){
    let url = 'https://inentory-test.onrender.com/supplier/'
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
    return resData
}


export async function action({request,params}){
    const token = getAuthToken();

    const id = params.id;
    const response = await fetch("/supplier/" + id, {
        method: request.method,
        headers : {
            'Authorization': 'Bearer ' + token
        }
    });
    if (!response.ok) {
        throw json(
          { message: 'Could not delete supplier.' },
          {
            status: 500,
          }
        );
      }
      return redirect("/supplier")
}