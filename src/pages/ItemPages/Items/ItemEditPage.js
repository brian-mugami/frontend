import React from "react";
import {json, useLoaderData, useRouteLoaderData} from "react-router-dom";
import ItemForm from "../../../components/ItemComponents/ItemsComponents/ItemsForm";
import { getAuthToken } from "../../../util/Auth";

function ItemEditPage(){
        const categories = useLoaderData()
        const itemData = useRouteLoaderData("item-main")
       return(
        <React.Fragment>
            <ItemForm method="patch" title="Edit" categories={categories} itemData={itemData}/>
        </React.Fragment>
       ) 
}

export default ItemEditPage;

export async function loader(){
    const token = getAuthToken()
   
    const response = await fetch('https://inentory-test.onrender.com/item/category', {
        method: "get",
        headers: {
            "Authorization": 'Bearer '+ token,
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