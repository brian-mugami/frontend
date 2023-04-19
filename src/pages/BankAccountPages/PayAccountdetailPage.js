import { Await, defer, json, redirect, useRouteLoaderData } from "react-router-dom";
import React, { Suspense } from "react";
import Accountitem from "../../components/AccountComponents/AccountItem";
import { getAuthToken } from "../../util/Auth";

function PaymentAccountDetailPage(){
const {account} = useRouteLoaderData('payment-account-detail')

    return(
        <React.Fragment>
            <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
                <Await resolve={account}>
                    {(loadedaccount)=><Accountitem account={loadedaccount} title="bank"/>}
                </Await>
            </Suspense>
        </React.Fragment>
    )
}

export default PaymentAccountDetailPage;

async function loadaccount(id){
    const token = getAuthToken();
    const response = await fetch('/bank/account/' + id,{
        headers : {
            'Authorization': 'Bearer ' + token
        }
    })
    if (!response.ok)
        {throw json (
            {message: "Could not fetch payment account"},
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
        account: await loadaccount(id),
    })
}

export async function action({request,params}){
    const token = getAuthToken();
    const id = params.id;
    const response = await fetch("/bank/account/" + id, {
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
      return redirect("/account/payment")
}