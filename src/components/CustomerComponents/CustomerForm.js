import React from "react";
import { Form, useNavigate, useNavigation, redirect, json } from "react-router-dom";
import { getAuthToken } from "../../util/Auth";

function CustomerForm({method, cusData, title, accounts}){
    const navigate = useNavigate()
    const navigation = useNavigation()

    const isSubmitting = navigation.state === 'submitting'
    function cancelHandler(){
        navigate('..')
    }

    return(
        <React.Fragment>
            <h2>Customer {title}</h2>
            <Form method={method}>
                <p>
                    <label>Customer Name</label>
                    <input placeholder="Customer Name" name="cussname" type="text" required defaultValue={cusData ? cusData.customer_name:""}></input>
                </p>
                <p>
                    <label>Customer Contact</label>
                    <input placeholder="Customer contact" name="cuscon" type="text" defaultValue={cusData ? cusData.customer_contact:""}></input>
                </p>
                <p>
                    <label>Account</label>
                    <select name="account" required defaultValue={cusData ? cusData.account.account_name:""}>
                    {accounts.map((account)=><option key={account.id} value={account.name}> {account.account_name}</option>)}
                    </select>
                </p>
                <div>
                    <label>Status</label>
                    <div>
                    <label>Active</label>
                    <input type="radio" name="active" value="True"/>
                    <label>Inactive</label>
                    <input type="radio" name="active" value="False"/>
                    </div>
                </div>
                <div>
                    <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
                    Cancel
                    </button>
                    <button disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Save'}
                    </button>
                </div>
            </Form>
        </React.Fragment>
    )
}

export default CustomerForm;

export async function action({request, params}){
    const method = request.method;
    const data = await request.formData();
    const token = getAuthToken()

    const ItemData = {
        customer_name: data.get("cussname"),
        customer_contact: data.get("cuscon"),
        account_name: data.get("account"),
        is_active:data.get("active"),
    }

    let url = 'http://localhost:8000/customer'
    if(method==="POST"){
        const response = await fetch(url,{
            method: method,
            headers: {
                'Content-Type':'application/json',
                'Authorization': "Bearer " + token,
                'Access-Control-Allow-Origin': '*'
            },
            body:JSON.stringify(ItemData)
        });
        if (!response.ok){
            window.alert("failed")
            throw json ({message: "Failed to save the customer"}, {status: 500})
        }

        return redirect("/customer")
    }else{
        const id = params.id
        url = 'http://localhost:8000/customer/'+id
        const response = await fetch(url,{
            method: method,
            headers: {
                'Content-Type':'application/json',
                'Authorization': "Bearer " + token,
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(ItemData)
        });
        if (!response.ok){
            window.alert("failed update")
            throw json ({message: "Failed to save the customer"}, {status: 500})
        }

        return redirect("/customer")
    }
}