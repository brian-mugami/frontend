import { Suspense } from "react";
import { defer, json,Await, useRouteLoaderData} from "react-router-dom";
import { getAuthToken } from "../../util/Auth";
import InventoryBalanceList from "../../components/InventoryBalancesComponents/InventoryBalanceList";

function InventoryBalancesPage(){
    const {balances} = useRouteLoaderData('inventory-balances');
    return(
        <Suspense fallback={<p style={{textAlign: 'center'}}>Loading....</p>}>
            <Await resolve={balances}>
                {(loadedBalances) => <InventoryBalanceList balances={loadedBalances} title="Expense"/>}
            </Await>
        </Suspense>
    )
}
export default InventoryBalancesPage;

async function InventoryBalancesLoader(){
    const token = getAuthToken()
   
    const response = await fetch('https://flask-inventory.onrender.com/inventory-balances', {
        method: "get",
        headers: {
            'Authorization': 'Bearer '+ token,
            "Access-Control-Allow-Origin": "*",
        }
    })
    if (response.status === 404){
        return response
    }
    if(!response.ok){
        throw json({message: "The response was not ok"},{status: 500})
    }else{
        const resData = await response.json()
        return resData.balances
    }
};
async function ItemsLoader(){
    const token = getAuthToken()

    const response = await fetch("https://flask-inventory.onrender.com/item", {
        method: "get",
        headers: {
            "Authorization": "Bearer "+ token,
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

async function InvAdjAccountsLoader(){
    const token = getAuthToken()

    const response = await fetch("/inventory-adjustment/account", {
        method: "get",
        headers: {
            "Authorization": "Bearer "+ token
        }
    })
    if(!response.ok){
        throw json({message: "The response was not ok"},{status: 500})
    }else{
        const resData = await response.json()
        return resData
    }

}

export async function loader(){
    return (defer({
        balances:  await InventoryBalancesLoader(),
        items: await ItemsLoader(),
        adjAccounts: await InvAdjAccountsLoader()
    }))
}