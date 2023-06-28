import { Suspense } from "react";
import { defer, json,Await, useRouteLoaderData,  } from "react-router-dom";
import { getAuthToken } from "../../util/Auth";
import AccountsList from "../../components/AccountComponents/AccountsList";

function ExpenseAccountsPage(){
    const {accounts} = useRouteLoaderData('expense-accounts');
    return(
        <Suspense fallback={<p style={{textAlign: 'center'}}>Loading....</p>}>
            <Await resolve={accounts}>
                {(loadedAccounts) => <AccountsList accounts={loadedAccounts} title="Expense"/>}
            </Await>
        </Suspense>
    )
}
export default ExpenseAccountsPage;

async function AccountLoader(){
    const token = getAuthToken()
   
    const response = await fetch('https://inentory-test.onrender.com/expense/account', {
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
