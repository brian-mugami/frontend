import SalesNav from "../../components/ReceiptComponents/SalesNav";
import React from "react";
import { Outlet } from "react-router";


function SalesRootNav(){
    return(
        <React.Fragment>
            <div className="px-4">
            <SalesNav/>
            <Outlet/>
            </div>
        </React.Fragment>
    )
}

export default SalesRootNav;