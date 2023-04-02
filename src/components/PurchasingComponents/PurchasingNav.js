import React from "react";
import { NavLink } from "react-router-dom";

function PurchasingNav(){
    return(
        <React.Fragment>
            <header>
                <nav>
                    <ul>
                        <li>
                            <NavLink to=".">
                                All Purchases
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="./new">
                                Make a new purchase
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
        </React.Fragment>
    )
}

export default PurchasingNav;