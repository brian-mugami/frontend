import { Suspense } from "react";
import { defer, json,Await, useRouteLoaderData,  } from "react-router-dom";
import { getAuthToken } from "../../util/Auth";
import AccountsList from "../../components/Accountcomponents/AccountsList";

function SalesAccountsPage(){
    const {accounts} = useRouteLoaderData('sales-accounts');
    return(
        <Suspense fallback={<p style={{textAlign: 'center'}}>Loading....</p>}>
            <Await resolve={accounts}>
                {(loadedAccounts) => <AccountsList accounts={loadedAccounts} title="Sales"/>}
            </Await>
        </Suspense>
    )
}
export default SalesAccountsPage;

async function AccountLoader(){
    const token = getAuthToken()
   
    const response = await fetch('/sales/account', {
        method: "get",
        headers: {
            'Authorization': 'Bearer '+ token
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