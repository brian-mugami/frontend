import React from "react"
import { useLoaderData, json } from "react-router-dom";
import ItemForm from "../../../components/ItemComponents/ItemsComponents/ItemsForm";
import { getAuthToken } from "../../../util/Auth";

function NewItemPage(){
const categories = useLoaderData()

    return(
        <React.Fragment>
            <ItemForm method="post" title="Creation" categories={categories}/>
        </React.Fragment>
    )
}

export default NewItemPage;

export async function loader(){
    const token = getAuthToken()
   
    const response = await fetch('http://localhost:8000/item/category', {
        method: "get",
        headers: {
            "Authorization": 'Bearer '+ token
        }
    })
    if(!response.ok){
        throw json({message: "The response was not ok"},{status: 500})
    }else{
        const resData = await response.json()
        return resData
    }
};