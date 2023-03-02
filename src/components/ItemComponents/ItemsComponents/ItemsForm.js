import React from "react";
import { Form, useNavigate, useNavigation, redirect, json } from "react-router-dom";
import { getAuthToken } from "../../../util/Auth";

function ItemForm({method, itemData, title, categories}){
    const navigate = useNavigate()
    const navigation = useNavigation()

    const isSubmitting = navigation.state === 'submitting'
    function cancelHandler(){
        navigate('..')
    }

    return(
        <React.Fragment>
            <h2>Item {title}</h2>
            <Form method={method}>
                <p>
                    <label>Item Name</label>
                    <input placeholder="Item Name" name="itemname" type="text" required defaultValue={itemData ? itemData.item_name:""}></input>
                </p>
                <p>
                    <label>Item Weight</label>
                    <input placeholder="Item Weight" name="itemweight" type="number" defaultValue={itemData ? itemData.item_weight:""}></input>
                </p>
                <p>
                    <label>Item Volume</label>
                    <input placeholder="Item Volume" name="itemvolume" type="number" defaultValue={itemData ? itemData.item_volume:""}></input>
                </p>
                <p>
                    <label>Price</label>
                    <input placeholder="Price" name="price" type="number" required defaultValue={itemData ? itemData.price:""}></input>
                </p>
                <p>
                    <label>Category</label>
                    <select name="category" required defaultValue={itemData ? itemData.category.name:""}>
                    {categories.map((category)=><option key={category.id} value={category.name}> {category.account.account_name}</option>)}
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

export default ItemForm;

export async function action({request, params}){
    const method = request.method;
    const data = await request.formData();
    const token = getAuthToken()

    const ItemData = {
        item_name: data.get("itemname"),
        item_weight: data.get("itemweight"),
        item_volume: data.get("itemvolume"),
        price:data.get("price"),
        is_active:data.get("active"),
        category_name:data.get("category")
    }

    let url = 'http://localhost:8000/item'
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
            throw json ({message: "Failed to save the lot"}, {status: 500})
        }

        return redirect("/item/main")
    }else{
        const id = params.id
        url = 'http://localhost:8000/item/'+id
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
            throw json ({message: "Failed to save the lot"}, {status: 500})
        }

        return redirect("/item/main")
    }
}