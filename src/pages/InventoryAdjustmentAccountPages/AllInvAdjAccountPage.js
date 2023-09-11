import { Suspense } from "react";
import { defer, json,Await, useRouteLoaderData,  } from "react-router-dom";
import { getAuthToken } from "../../util/Auth";
import AccountsList from "../../components/AccountComponents/AccountsList";

function InvAdjAccountsPage(){
    const {accounts} = useRouteLoaderData('inv-adj-accounts');
    return(
        <Suspense fallback={<p style={{textAlign: 'center'}}>Loading....</p>}>
            <Await resolve={accounts}>
                {(loadedAccounts) => <AccountsList accounts={loadedAccounts} title="Inventory Adjustment"/>}
            </Await>
        </Suspense>
    )
}
export default InvAdjAccountsPage;

async function AccountLoader(){
    const token = getAuthToken()
   
    const response = await fetch('https://inventory-accounting.onrender.com/inventory-adjustment/account', {
        method: "get",
        headers: {
            'Authorization': 'Bearer '+ token,
            "Access-Control-Allow-Origin": "*",

        }
    })
    if(!response.ok){
        throw json({message: "The response was not ok"},{status: 500})
    }else{
        const resData = await response.json()
        return resData
    }
};

export async function loader(){
    return (defer({
        accounts:  await AccountLoader()
    }))
}
