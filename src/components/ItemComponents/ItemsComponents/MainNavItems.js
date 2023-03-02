import { NavLink } from "react-router-dom";
import React from "react";
function ItemNavigation(){
    return(
        <React.Fragment>
            <header>
                <nav>
                    <ul>
                        <li>
                            <NavLink to="./lot">Item Lots</NavLink>
                        </li>
                        <li>
                            <NavLink to="./category">Item Categories</NavLink>
                        </li>
                        <li>
                            <NavLink to="./main">Items</NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
        </React.Fragment>
    )
}

export default ItemNavigation;