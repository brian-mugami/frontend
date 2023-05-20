import { Suspense } from "react";
import { defer, json,Await, useRouteLoaderData,  } from "react-router-dom";
import AccountsList from "../../../components/AccountComponents/AccountsList";
import { getAuthToken } from "../../../util/Auth";

function SupplierAccountsPage(){
    const {accounts} = useRouteLoaderData('supplier')

    return(
        <Suspense fallback={<p style={{textAlign: 'center'}}>Loading....</p>}>
            <Await resolve={accounts}>
                {(loadedAccounts) => <AccountsList accounts={loadedAccounts} title="Supplier"/>}
            </Await>
        </Suspense>
    )
}
export default SupplierAccountsPage;

async function AccountLoader(){
    const token = getAuthToken()
   
    const response = await fetch('https://flask-inventory.onrender.com/supplier/account', {
        method: "get",
        headers: {
            'Authorization': 'Bearer '+ token,
            "Access-Control-Allow-Origin": "*",
        }
    })
    if(!response.ok){
        throw json({message: "Could not fetch users"},{status: 500})
    }else{
        const resData = await response.json()
        if (resData.status === 401){
            throw json({message: "You are not authorized"}, {status: 401})
        }
        return resData
    }
};

export function loader(){
    return (defer({
        accounts: AccountLoader()
    }))
}
