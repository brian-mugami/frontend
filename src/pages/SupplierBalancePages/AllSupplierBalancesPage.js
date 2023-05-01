import React from 'react'
import SupplierBalanceList from '../../components/SupplierBalanceComponents/SupplierBalanceList'
import { json, useRouteLoaderData } from 'react-router-dom'
import { getAuthToken } from '../../util/Auth'

function AllSupplierBalancesPage() {
    const balances = useRouteLoaderData("supplier-balances")
  return (
    <SupplierBalanceList balances={balances}/>
  )
}

export default AllSupplierBalancesPage

export async function loader(){
    const token = getAuthToken()
   
    const response = await fetch('/supplier-balance', {
        method: "get",
        headers: {
            'Authorization': 'Bearer '+ token
        }
    })
    if (response.status === 404){
        return response
    }
    if(!response.ok){
        throw json({message: "The response was not ok"},{status: 500})
    }else{
        const resData = await response.json()
        console.log(resData)
        return resData.balances
    }
};