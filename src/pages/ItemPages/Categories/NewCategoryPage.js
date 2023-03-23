import React from "react";
import CategoryForm from "../../../components/ItemComponents/CategoryComponents/CategoryForm";
import { json, useLoaderData } from "react-router-dom";
import { getAuthToken } from "../../../util/Auth";

function CreateCategoryPage(){

    const accounts = useLoaderData()
    return(
        <React.Fragment>
            <CategoryForm method="post" title="Create" accounts={accounts}/>
        </React.Fragment>
    )
}

export default CreateCategoryPage;

export async function loader(){
    const token = getAuthToken()
   
    const response = await fetch('/category/account', {
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

