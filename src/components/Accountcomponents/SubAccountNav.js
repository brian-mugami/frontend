import { NavLink } from "react-router-dom";

function AccountNav(){
    return(
        <header>
            <nav>
                <ul>
                    <li>
                        <NavLink to=".">
                            All accounts
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="./new">
                            New account
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default AccountNav;