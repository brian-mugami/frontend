import React from "react";
import { Outlet } from "react-router-dom";
import AccountNavigation from "../../components/Accountcomponents/AccountNav";
function AccountRoot(){
    return(
    <React.Fragment>
        <AccountNavigation/>
        <Outlet/>
    </React.Fragment>
    )
    
}

export default AccountRoot;