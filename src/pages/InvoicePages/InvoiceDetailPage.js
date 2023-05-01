import React from "react";
import { json,useRouteLoaderData, redirect } from "react-router-dom";
import InvoiceItem from "../../components/InvoiceComponents/InvoiceItem";
import { getAuthToken } from "../../util/Auth";

function InvoiceDetailPage(){
    const invoice = useRouteLoaderData("invoice-detail")
    return(
        <React.Fragment>
                    <InvoiceItem invoice={invoice}/>
        </React.Fragment>
    )   
}
export default InvoiceDetailPage;

export async function loader({request, params}){
    let url = '/invoice/'
    const token = getAuthToken()
    const id = params.id
    const response = await fetch(url + id, {
        method:"get",
        headers:{
            "Authorization": "Bearer " + token
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
    const response = await fetch("/invoice/" + id, {
        method: request.method,
        headers : {
            'Authorization': 'Bearer ' + token
        }
    });
    if (!response.ok) {
        throw json(
          { message: 'Could not delete invoice.' },
          {
            status: 500,
          }
        );
      }
      return redirect("/invoice")
}