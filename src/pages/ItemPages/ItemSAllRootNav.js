import React from "react";
import { Outlet } from "react-router-dom";
import ItemNavigation from "../../components/ItemComponents/ItemsComponents/MainNavItems";

function ItemsRoot(){
    return(
        <React.Fragment>
            <ItemNavigation/>
            
                        
        </React.Fragment>
    )
}

export default ItemsRoot;