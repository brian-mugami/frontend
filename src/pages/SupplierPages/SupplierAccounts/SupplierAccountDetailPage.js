import { Await, defer, json, useRouteLoaderData } from "react-router-dom";
import React, { Suspense } from "react";
import AccountsList from "../../../components/Accountcomponents/AccountsList";
import Accountitem from "../../../components/Accountcomponents/AccountItem";

function SupplierAccountDetailPage(){
const {account, accounts } = useRouteLoaderData('supplier-detail')

    return(
        <React.Fragment>
            <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
                <Await resolve={account}>
                    {(loadedsupplier)=><Accountitem account={loadedsupplier} title="Supplier"/>}
                </Await>
            </Suspense>
            <Suspense fallback={<p style={{textAlign: 'center'}}>Loading....</p>}>
                <Await resolve={accounts}>
                    {(loadedAccounts) => <AccountsList accounts={loadedAccounts} title="Supplier"/>}
                </Await>
        </Suspense>
        </React.Fragment>
    )
}

export default SupplierAccountDetailPage;

async function loadSupplier(id){
    const response = await fetch('http://localhost:8000/supplier/account/' + id)
    if (!response.ok){
        {throw json (
            {message: "Could not fetch supplier account"},
            {status: 500}
        )}
    }else{
        const resData = await response.json()
        return resData
    }
}

async function loadsuppliers(){
    const response = await fetch('http://localhost:8000/supplier/account/')
    if (!response.ok){
        {throw json (
            {message: "Could not fetch supplier accounts"},
            {status: 500}
        )}
    }else{
        const resData = await response.json()
        return resData
    }
}

export async function loader ({request, params}){
    const id = params.id;
    return defer({
        supplier: await loadSupplier(id),
        suppliers: loadsuppliers()
    })
}