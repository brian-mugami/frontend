import React from "react";
import { NavLink } from "react-router-dom";

function CustomerNav(){
    return(
        <React.Fragment>
            <header>
                <nav>
                    <ul>
                        <li>
                            <NavLink to=".">
                                All customers
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="./new">
                                New customer
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
        </React.Fragment>
    )
}

export default CustomerNav