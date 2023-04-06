import PurchasingNav from "../../components/InvoiceComponents/PurchasingNav";
import React from "react";
import { Outlet } from "react-router";

function PurchaseRootPage(){
    return(
        <React.Fragment>
            <PurchasingNav/>
            <Outlet/>
        </React.Fragment>
    )
}

export default PurchaseRootPage;