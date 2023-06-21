import React from 'react'
import { json } from 'react-router-dom'
import { getAuthToken } from '../../util/Auth'
import ExpensesList from '../../components/ExpenseComponents/ExpensesList'
import { useLoaderData } from 'react-router-dom/dist/umd/react-router-dom.development'
function AllExpensesBalancePage() {
    const balances = useLoaderData()
  return (
    <React.Fragment>
        <ExpensesList balances={balances}/>
    </React.Fragment>
  )
}

export default AllExpensesBalancePage

export async function loader(){
    const token = getAuthToken()
   
    const response = await fetch('/expenses', {
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