import React from "react";
import { Outlet } from "react-router-dom";
import CustomerNav from "../../../components/CustomerComponents/CustomerNav";

function CustomerRoot(){
    return(
        <React.Fragment>
            <CustomerNav/>
            <Outlet/>
        </React.Fragment>
    )
}

export default CustomerRoot;