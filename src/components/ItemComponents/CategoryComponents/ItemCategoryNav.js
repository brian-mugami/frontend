import React from "react";
import { NavLink } from "react-router-dom";

function ItemCatNav(){
    return(
        <React.Fragment>
            <header>
                <nav>
                    <ul>
                        <li>
                            <NavLink to=".">
                                All categories
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="./new">
                                New category
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
        </React.Fragment>
    )
}

export default ItemCatNav