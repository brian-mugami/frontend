import React from "react";
import {json, useLoaderData, useRouteLoaderData} from "react-router-dom";
import CategoryForm from "../../../components/ItemComponents/CategoryForm";
import { getAuthToken } from "../../../util/Auth";

function CategoryEditPage(){
        const accounts = useLoaderData()
        const category = useRouteLoaderData("category-detail")
       return(
        <React.Fragment>
            <CategoryForm method="patch" title="Edit" accounts={accounts} category={category}/>
        </React.Fragment>
       ) 
}

export default CategoryEditPage;

export async function loader({params}){
    let url = 'http://localhost:8000/item/category/'
    const id = params.id
    const token = getAuthToken()
    const response = await fetch(url + id, {
        method:"get",
        headers:{
            "Authorization": "Bearer " + token
        }
    })
    if(!response.ok){
        throw json({message: "Wrong Url"}, {status: 404})
    }
    const resData = await response.json()
    console.log(resData)
    return resData
}