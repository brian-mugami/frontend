import React from "react";
import { Outlet } from "react-router-dom";
import SupplierNav from "../../../components/SupplierComponents/SupplierNav";

function SupplierRoot(){
    return(
        <React.Fragment>
            <SupplierNav/>
            <Outlet/>
        </React.Fragment>
    )
}

export default SupplierRoot;