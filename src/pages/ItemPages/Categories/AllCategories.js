import React, { Suspense } from "react"
import { Await,json, useRouteLoaderData } from "react-router-dom";
import { getAuthToken } from "../../../util/Auth";
import CategoryList from "../../../components/ItemComponents/CategoryComponents/ItemCategoryList";
import { defer } from "react-router-dom";

function CategoriesPage(){
    const {categories} = useRouteLoaderData("category")
    return(
        <React.Fragment>
            <Suspense fallback={<p style={{textAlign: 'center'}}>Loading....</p>}>
            <Await resolve={categories}>
                    {(loadedCategories) => <CategoryList categories={loadedCategories}/>}
                </Await>
            </Suspense>
        </React.Fragment>
    )
}

export default CategoriesPage;

 export async function catLoader(){
    const token = getAuthToken()
    const response = await fetch("/item/category", {
        method:"get",
        headers:{
            "Authorization": "Bearer "+ token
        }
    })
    if(!response.ok){
        throw json({message:"Cant get categories"}, {status:500})
    }else{
        const resData = await response.json()
        return resData
    };
}

export function loader (){
    return(
        defer({
            categories: catLoader()
        })
    )}