import PurchasingNav from '../../components/InvoiceComponents/PurchasingNav'
import React from "react";
import { Outlet } from "react-router";

function PurchaseRootPage(){
    return(
        <React.Fragment>
            <div className='px-4 pb-4'>
            <div> <PurchasingNav/></div>
           
            <div className=''><Outlet/></div>
            </div>
            
        </React.Fragment>
    )
}

export default PurchaseRootPage;