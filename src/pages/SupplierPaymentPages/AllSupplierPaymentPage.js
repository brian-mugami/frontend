import React from "react";
import { Suspense } from "react";
import { useRouteLoaderData, Await, json, defer } from "react-router-dom";
import SupplierPaymentList from "../../components/SupplierPaymentComponents/SupplierPaymentsList";
import { getAuthToken } from "../../util/Auth";

function AllSupplierPaymentPage() {
  const { payments } = useRouteLoaderData("payments");
  return (
    <React.Fragment>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading....</p>}>
        <Await resolve={payments}>
          {(loadedPayments) => (
            <SupplierPaymentList payments={loadedPayments} />
          )}
        </Await>
      </Suspense>
    </React.Fragment>
  );
}

export default AllSupplierPaymentPage;

async function AllPaymentsLoader(){
    const token = getAuthToken()
    const response = await fetch("/payment", {
        method:"get",
        headers:{
            "Authorization": "Bearer "+ token
        }
    })
    if(!response.ok){
        throw json({message:"Cant get payments"}, {status:500})
    }else{
        const resData = await response.json()
        return resData
    };
}

export async function loader (){
    return(
        defer({
            payments: await AllPaymentsLoader()
        })
    )}
