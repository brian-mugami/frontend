import React, { Suspense } from "react"
import { Await, defer, useRouteLoaderData } from "react-router-dom";
import ItemLotList from "../../../components/ItemComponents/LotComponents/ItemLotList";
import { getAuthToken } from "../../../util/Auth";
import { json } from "react-router-dom";

function LotPage(){
    const {lots} = useRouteLoaderData("lot")

    return(
        <React.Fragment>
            <Suspense fallback={<p style={{textAlign: 'center'}}>Loading....</p>}>
                <Await resolve={lots}>
                    {(loadedLots) => <ItemLotList lots={loadedLots}/>}
                </Await>
            </Suspense>
        </React.Fragment>
    )
}

export default LotPage;

async function LotLoader(){
    const token = getAuthToken()

    const response = await fetch("https://inventory-accounting.onrender.com/item/lot", {
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
            lots: LotLoader()
        })
    )
}