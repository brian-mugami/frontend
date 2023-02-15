import { useRouteLoaderData } from "react-router-dom";
import ItemAccountForm from "../../../components/Accountcomponents/ItemaccountForm";

function EditCategoryAccountPage(){
    const {account} = useRouteLoaderData("item-detail")
    return(
        <ItemAccountForm method="patch"  title="Category" account={account}/>
    )
}
export default EditCategoryAccountPage;
