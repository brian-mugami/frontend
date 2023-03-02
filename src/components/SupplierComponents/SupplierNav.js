import React from "react";
import { NavLink } from "react-router-dom";

function SupplierNav(){
    return(
        <React.Fragment>
            <header>
                <nav>
                    <ul>
                        <li>
                            <NavLink to=".">
                                All suppliers
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="./new">
                                New supplier
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
        </React.Fragment>
    )
}

export default SupplierNav