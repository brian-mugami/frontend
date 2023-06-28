import { Suspense } from "react";
import { defer, json,Await, useRouteLoaderData,  } from "react-router-dom";
import { getAuthToken } from "../../util/Auth";
import AccountsList from "../../components/AccountComponents/AccountsList";

function PaymentAccountsPage(){
    const {accounts} = useRouteLoaderData('payment-accounts');
    return(
        <Suspense fallback={<p style={{textAlign: 'center'}}>Loading....</p>}>
            <Await resolve={accounts}>
                {(loadedAccounts) => <AccountsList accounts={loadedAccounts} title="Bank"/>}
            </Await>
        </Suspense>
    )
}
export default PaymentAccountsPage;

async function AccountLoader(){
    const token = getAuthToken()
   
    const response = await fetch('/bank/account', {
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
        accounts: await AccountLoader()
    }))
}
