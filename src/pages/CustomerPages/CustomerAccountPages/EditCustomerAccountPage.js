import { useRouteLoaderData } from "react-router-dom";
import CustomerAccountForm from "../../../components/Accountcomponents/Customeraccountform";

function EditCustomerAccountPage(){
    const {account} = useRouteLoaderData("customer-detail")
    return(
        <CustomerAccountForm method="patch"  title="Customer" account={account}/>
    )
}
export default EditCustomerAccountPage;
