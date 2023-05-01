import PurchasingNav from '../../components/InvoiceComponents/PurchasingNav'
import React from "react";
import { Outlet } from "react-router";

function PurchaseRootPage(){
    return(
        <React.Fragment>
            <div> <PurchasingNav/></div>
           
            <div className=''><Outlet/></div>
            
        </React.Fragment>
    )
}

export default PurchaseRootPage;