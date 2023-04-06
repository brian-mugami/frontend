import SalesNav from "../../components/ReceiptComponents/SalesNav";
import React from "react";
import { Outlet } from "react-router";


function SalesRootNav(){
    return(
        <React.Fragment>
            <SalesNav/>
            <Outlet/>
        </React.Fragment>
    )
}

export default SalesRootNav;