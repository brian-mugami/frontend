import React from "react";
import { useRouteLoaderData } from "react-router-dom";
import LotForm from "../../../components/ItemComponents/LotForm";


function LotEditPage(){
    const {lot} = useRouteLoaderData("lot-detail")
    return(
        <LotForm method="patch" lotData={lot} title="Edit"/>
    )
}

export default LotEditPage