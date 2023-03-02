import React from "react";
import { NavLink } from "react-router-dom";

function ItemLotNav(){
    return(
        <React.Fragment>
            <header>
                <nav>
                    <ul>
                        <li>
                            <NavLink to=".">
                                All lots
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="./new">
                                New Lots
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
        </React.Fragment>
    )
}

export default ItemLotNav