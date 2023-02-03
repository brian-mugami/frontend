import { NavLink } from "react-router-dom";
import React from "react";
function AccountNavigation(){
    return(
        <React.Fragment>
            <header>
                <nav>
                    <ul>
                        <li>
                            <NavLink to="/account/supplier">SupplierAccounts</NavLink>
                        </li>
                        <li>
                            <NavLink to="/account/item">Category Accounts</NavLink>
                        </li>
                        <li>
                            <NavLink to="/account/customer">Customer Accounts</NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
        </React.Fragment>
    )
}

export default AccountNavigation