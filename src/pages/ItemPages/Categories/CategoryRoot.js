import ItemCatNav from "../../../components/ItemComponents/CategoryComponents/ItemCategoryNav";
import React from "react";
import { Outlet } from "react-router-dom";

function CategoryRoot(){
    return(
        <React.Fragment>
            <ItemCatNav/>
            <Outlet/>
        </React.Fragment>
    )
}

export default CategoryRoot