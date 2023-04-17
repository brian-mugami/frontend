import React, { Suspense } from 'react'
import { useRouteLoaderData, Await, json, defer, redirect } from 'react-router-dom'
import SupplierPaymentItem from '../../components/SupplierPaymentComponents/SupplierPaymentItem'
import { getAuthToken } from '../../util/Auth'

function SupplierPaymentDetailPage() {
    const {payment} = useRouteLoaderData("payment")
  return (
    <React.Fragment>
            <Suspense fallback={<p style={{textAlign: 'center'}}>Loading....</p>}>
            <Await resolve={payment}>
                    {(loadedPayment) => <SupplierPaymentItem payment={loadedPayment}/>}
                </Await>
            </Suspense>

        </React.Fragment>
  )
}

export default SupplierPaymentDetailPage

async function paymentLoader(id){
    let url = '/payment/'
    const token = getAuthToken()
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
    return resData
}

export async function loader ({request, params}){
    const id = params.id
    return(
        defer({
            payment: await paymentLoader(id)
        })
    )}


export async function action({request,params}){
    const token = getAuthToken();

    const id = params.id;
    const response = await fetch("/payment/" + id, {
        method: request.method,
        headers : {
            'Authorization': 'Bearer ' + token
        }
    });
    if (!response.ok) {
        throw json(
          { message: 'Could not delete payment.' },
          {
            status: 500,
          }
        );
      }
      return redirect("/payment")
}