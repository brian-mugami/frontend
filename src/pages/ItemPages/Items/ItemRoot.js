import React from "react";
import { Outlet } from "react-router-dom";
import ItemNav from "../../../components/ItemComponents/ItemsComponents/ItemsNav";

function ItemRoot(){
    return(
        <React.Fragment>
            <ItemNav/>
            <Outlet/>
        </React.Fragment>
    )
}

export default ItemRoot;