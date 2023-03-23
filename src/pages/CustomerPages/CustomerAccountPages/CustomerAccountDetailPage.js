import { Await, defer, json, redirect, useRouteLoaderData } from "react-router-dom";
import React, { Suspense } from "react";
import Accountitem from "../../../components/Accountcomponents/AccountItem";
import { getAuthToken } from "../../../util/Auth";

function CustomerAccountDetailPage(){
const {account} = useRouteLoaderData('customer-detail')

    return(
        <React.Fragment>
            <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
                <Await resolve={account}>
                    {(loadedsupplier)=><Accountitem account={loadedsupplier} title="Customer"/>}
                </Await>
            </Suspense>
        </React.Fragment>
    )
}

export default CustomerAccountDetailPage;

async function loadcustomer(id){
    const token = getAuthToken();
    const response = await fetch('/customer/account/' + id,{
        headers : {
            'Authorization': 'Bearer ' + token
        }
    })
    if (!response.ok)
        {throw json (
            {message: "Could not fetch customer account"},
            {status: 500}
        )}
    else{
        const resData = await response.json()
        return resData
    }
}


export async function loader ({request, params}){
    const id = params.id;
    return defer({
        account: await loadcustomer(id),
    })
}

export async function action({request,params}){
    const token = getAuthToken();
    const id = params.id;
    const response = await fetch("/customer/account/" + id, {
        method: request.method,
        headers : {
            'Authorization': 'Bearer ' + token
        }
    });
    if (!response.ok) {
        throw json(
          { message: 'Could not delete account.' },
          {
            status: 500,
          }
        );
      }
      return redirect("/account/customer")
}