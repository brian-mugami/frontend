import React from "react";
import { json,useRouteLoaderData, redirect } from "react-router-dom";
import ReceiptItem from "../../components/ReceiptComponents/ReceiptItem";
import { getAuthToken } from "../../util/Auth";

function ReceiptDetailPage(){
    const receipt = useRouteLoaderData("receipt-detail")
    return(
        <React.Fragment>
                    <ReceiptItem receipt={receipt} id={receipt.id}/>
        </React.Fragment>
    )   
}
export default ReceiptDetailPage;

export async function loader({request, params}){
    let url = '/receipt/'
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
    const response = await fetch("/receipt/" + id, {
        method: request.method,
        headers : {
            'Authorization': 'Bearer ' + token
        }
    });
    if (!response.ok) {
        throw json(
          { message: 'Could not delete receipt.' },
          {
            status: 500,
          }
        );
      }
      return redirect("/receipt")
}