import PurchasingNav from '../../components/InvoiceComponents/PurchasingNav'
import React from "react";
import { Outlet } from "react-router";

function PurchaseRootPage(){
    return(
        <React.Fragment>
         <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Invoice Management</h2>
            <p className="text-muted-foreground">
             Account, Pay and View invoice details here.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <PurchasingNav />
          </div>
        </div>
     
          <Outlet/>
      
      </div>
            
        </React.Fragment>
    )
}

export default PurchaseRootPage;