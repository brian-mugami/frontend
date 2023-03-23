import { Outlet } from "react-router-dom";
import AccountNav from "../../components/Accountcomponents/SubAccountNav";
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