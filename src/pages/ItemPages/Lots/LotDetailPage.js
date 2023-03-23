import React from "react"
import { getAuthToken } from "../../../util/Auth";
import { Suspense } from "react";
import { Await, json, defer, useRouteLoaderData, redirect } from "react-router-dom";
import Lotitem from "../../../components/ItemComponents/LotComponents/Lotitem";

function LotDetailPage(){
    const {lot} = useRouteLoaderData('lot-detail')
    return(
        <React.Fragment>
           <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
                <Await resolve={lot}>
                    {(loadedLot)=><Lotitem lot={loadedLot}/>}
                </Await>
            </Suspense>
        </React.Fragment>
    )
}

export default LotDetailPage;

async function loadLot(id){
    const token = getAuthToken()
    const response = await fetch('/item/lot/' + id, {
        method:"get",
        headers:{
            "Authorization": "Bearer " + token
        }
        
    })
    if (!response){
        throw json(
            {
              message: "Url is wrong.",
            },
            { status: 404 }
          );
    }else{        
        const resData = await response.json()
        return resData
        
    }
}   

export async function loader ({request, params}){
    const id = params.id;
    return defer({
        lot: await loadLot(id),
    })
}

export async function action({request,params}){
    const token = getAuthToken();
    const id = params.id;
    const response = await fetch("/item/lot/" + id, {
        method: request.method,
        headers : {
            'Authorization': 'Bearer ' + token
        }
    });
    if (!response.ok) {
        throw json(
          { message: 'Could not delete lot.' },
          {
            status: 500,
          }
        );
      }
      return redirect("/item/lot")
}