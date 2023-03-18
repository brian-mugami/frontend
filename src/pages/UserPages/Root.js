import React from "react";
import { Outlet } from "react-router-dom";
import MainNavigation from "../../components/UserComponents/Mainnavigation";
import Sidebar from "../../components/Sidenav";

function RootLayout(){
    return(
        <React.Fragment>
             <div class="flex">
            <aside class="h-screen sticky top-0">
                <Sidebar/>
            </aside>
            <main>
                <Outlet/>
            </main>
            </div>
        </React.Fragment>
    )
}

export default RootLayout;