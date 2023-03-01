import React from "react";
import { Outlet } from "react-router-dom";
import ItemLotNav from "../../../components/ItemComponents/ItemLotNav";

function LotRoot(){
    return(
        <React.Fragment>
            <ItemLotNav/>
            <Outlet/>
        </React.Fragment>
    )
}

export default LotRoot;