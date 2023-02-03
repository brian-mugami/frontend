import { Outlet } from "react-router-dom";
import AccountNav from "../../components/Accountcomponents/SubAccountNav";
function AllAccountRoot(){
    return(
        <div>
            <AccountNav/>
            <Outlet/>
        </div>
    )
}

export default AllAccountRoot;