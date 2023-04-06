import React from "react";
import { Outlet } from "react-router-dom";
import SupplierNav from "../../../components/SupplierComponents/SupplierNav";

function SupplierRoot(){
    return(
        <React.Fragment>
            <div><SupplierNav/></div>
            <div className="px-5"><Outlet/></div>
            
            
        </React.Fragment>
    )
}

export default SupplierRoot;