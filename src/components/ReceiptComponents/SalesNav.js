import React from "react";
import { NavLink } from "react-router-dom";

function SalesNav(){
    return(
        <React.Fragment>
            <header>
                <nav>
                    <ul>
                        <li>
                            <NavLink to=".">
                                All Receipts
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="./new">
                                New Receipt
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
        </React.Fragment>
    )
}

export default SalesNav;