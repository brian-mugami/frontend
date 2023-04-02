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
                                All Items
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="./new">
                                New Item
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
        </React.Fragment>
    )
}

export default SalesNav;