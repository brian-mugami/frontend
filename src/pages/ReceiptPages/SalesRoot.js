import SalesNav from "../../components/ReceiptComponents/SalesNav";
import React from "react";
import { Outlet } from "react-router";


function SalesRootNav(){
    return(
        <React.Fragment>
          <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Receipt Management</h2>
            <p className="text-muted-foreground">
             View & Pay for receipts
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <SalesNav />
          </div>
        </div>
     
          <Outlet/>
      
      </div>
        </React.Fragment>
    )
}

export default SalesRootNav;