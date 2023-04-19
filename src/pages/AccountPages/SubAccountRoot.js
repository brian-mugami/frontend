import { Outlet } from "react-router-dom";
import AccountNav from "../../components/AccountComponents/SubAccountNav";
function AllAccountRoot(){
    return(
        <div>
            <br></br>
            <AccountNav/>
            <br></br>
            <Outlet/>
        </div>
    )
}

export default AllAccountRoot;