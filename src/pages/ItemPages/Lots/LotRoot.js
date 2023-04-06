import React from "react";
import { Outlet } from "react-router-dom";
import ItemLotNav from "../../../components/ItemComponents/LotComponents/ItemLotNav";

function LotRoot(){
    return(
        <React.Fragment>
            <div className="px-5">
            <ItemLotNav/>
            </div>
            <div className="px-5"><Outlet/></div>
            
        </React.Fragment>
    )
}

export default LotRoot;