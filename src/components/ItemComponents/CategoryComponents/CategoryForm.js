import React from "react";
import { Form, useNavigate, useNavigation, json, redirect} from "react-router-dom";
import { getAuthToken } from "../../../util/Auth";

function CategoryForm({method, title, accounts, categories}){

    const navigate = useNavigate()
    const navigation = useNavigation()
    const isSubmitting = navigation.state === 'submitting'
    function cancelHandler(){
        navigate('..')
    }

    return(
        <React.Fragment>
            <h2>Category {title}</h2>
            <Form method={method}>
                <p>
                    <label>Category Name</label>
                    <input placeholder="Category name" name="catname" type="text" required defaultValue={categories? categories.name:""}></input>
                </p>
                <p>
                <label>Category Account</label> 
                    <select name="account" required defaultValue={categories? categories.account.account_name: ""}>
                    {accounts.map((account)=><option key={account.id} value={account.account_name}> {account.account_name}</option>)}
                    </select>
                </p>
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

export default CategoryForm;

export async function action({request, params}){
    const method = request.method
    const data = await request.formData();
    const token = getAuthToken()

    const CategoryData = {
        name: data.get("catname"),
        account_name: data.get("account")
    }
    let url = '/item/category'
    if(method==="POST"){
        const response = await fetch(url,{
            method: method,
            headers: {
                'Content-Type':'application/json',
                'Authorization': "Bearer " + token,
                'Access-Control-Allow-Origin': '*'
            },
            body:JSON.stringify(CategoryData)
        });
        if (!response.ok){
            window.alert("failed")
            throw json ({message: "Failed to save the lot"}, {status: 500})
        }

        return redirect("/item/category")
    }else{
        const id = params.id
        url = '/item/category/'+id
        const response = await fetch(url,{
            method: method,
            headers: {
                'Content-Type':'application/json',
                'Authorization': "Bearer " + token,
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(CategoryData)
        });
        if (!response.ok){
            window.alert("failed update")
            throw json ({message: "Failed to save the category"}, {status: 500})
        }

        return redirect("/item/category")
        
    }
}

