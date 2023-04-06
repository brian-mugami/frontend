import React from "react";
import { Outlet } from "react-router-dom";
import CustomerNav from "../../../components/CustomerComponents/CustomerNav";

function CustomerRoot(){
    return(
        <React.Fragment>
            <div className=""><CustomerNav/></div>
            <div className="px-5"><Outlet/></div>
            
            
        </React.Fragment>
    )
}

export default CustomerRoot;