import React from "react";
import { Form, useNavigate, useNavigation, redirect, json } from "react-router-dom";
import { getAuthToken } from "../../util/Auth";

function SupplierForm({method, supData, title, accounts}){
    const navigate = useNavigate()
    const navigation = useNavigation()

    const isSubmitting = navigation.state === 'submitting'
    function cancelHandler(){
        navigate('..')
    }

    return(
        <React.Fragment>
            <h2>Supplier {title}</h2>
            <Form method={method}>
                <p>
                    <label>Supplier Name</label>
                    <input placeholder="Supplier Name" name="supname" type="text" required defaultValue={supData ? supData.supplier_name:""}></input>
                </p>
                <p>
                    <label>Supplier Contact</label>
                    <input placeholder="Supplier contact" name="supcon" type="text" defaultValue={supData ? supData.supplier_contact:""}></input>
                </p>
                                <p>
                    <label>Supplier Site</label>
                    <input placeholder="Supplier site" name="supsite" type="text" defaultValue={supData ? supData.supplier_site:""}></input>
                </p>
                <p>
                    <label>Account</label>
                    <select name="account" required defaultValue={supData ? supData.account.account_name:""}>
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

export default SupplierForm;

export async function action({request, params}){
    const method = request.method;
    const data = await request.formData();
    const token = getAuthToken()

    const supData = {
        supplier_name: data.get("supname"),
        supplier_contact: data.get("supcon"),
        account_name: data.get("account"),
        supplier_site:data.get("supsite"),
        is_active:data.get("active"),
    }

    let url = 'http://localhost:8000/supplier'
    if(method==="POST"){
        const response = await fetch(url,{
            method: method,
            headers: {
                'Content-Type':'application/json',
                'Authorization': "Bearer " + token,
                'Access-Control-Allow-Origin': '*'
            },
            body:JSON.stringify(supData)
        });
        if (!response.ok){
            window.alert("failed")
            throw json ({message: "Failed to save the supplier"}, {status: 500})
        }

        return redirect("/supplier")
    }else{
        const id = params.id
        url = 'http://localhost:8000/supplier/'+id
        const response = await fetch(url,{
            method: method,
            headers: {
                'Content-Type':'application/json',
                'Authorization': "Bearer " + token,
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(supData)
        });
        if (!response.ok){
            window.alert("failed update")
            throw json ({message: "Failed to save the supplier"}, {status: 500})
        }

        return redirect("/supplier")
    }
}