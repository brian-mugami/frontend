import React from "react";
import { Suspense } from "react";
import { json, Await, defer, useRouteLoaderData } from "react-router-dom";
import { getAuthToken } from "../../../util/Auth";
import ItemList from "../../../components/ItemComponents/ItemsComponents/ItemList";

function AllItemsPage(){
    const {items} = useRouteLoaderData("items")

    return(
        <React.Fragment>
            <Suspense fallback={<p style={{textAlign: 'center'}}>Loading....</p>}>
                <Await resolve={items}>
                    {(loadedItems) => <ItemList items={loadedItems}/>}
                </Await>
            </Suspense>
        </React.Fragment>
    )
}

export default AllItemsPage;

async function ItemsLoader(){
    const token = getAuthToken()

    const response = await fetch("https://flask-inventory.onrender.com/item", {
        method: "get",
        headers: {
            "Authorization": "Bearer "+ token,
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

export function loader (){
    return(
        defer({
            items: ItemsLoader()
        })
    )
}