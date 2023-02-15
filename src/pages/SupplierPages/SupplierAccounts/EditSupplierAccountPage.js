import { useRouteLoaderData } from "react-router-dom";
import SupplierAccountForm from "../../../components/Accountcomponents/SupplierAccountsForm";

function EditSupplierAccountPage(){
    const {account} = useRouteLoaderData("supplier-detail")
    return(
        <SupplierAccountForm method="patch"  title="supplier" account={account}/>
    )
}
export default EditSupplierAccountPage;
