import React from "react";
import { Outlet } from "react-router-dom";
import ItemNavigation from "../../components/ItemComponents/ItemsComponents/MainNavItems";

function ItemsRoot(){
    return(
        <React.Fragment>
            <div className="px-5">
            <ItemNavigation/>
            </div>
            
                        
        </React.Fragment>
    )
}

export default ItemsRoot;