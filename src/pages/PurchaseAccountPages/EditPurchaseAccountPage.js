import { useRouteLoaderData } from "react-router-dom";
import PurchaseAccountForm from "../../components/Accountcomponents/PurchaseAccountform";

function EditPurchaseAccountPage() {
  const { account } = useRouteLoaderData("purchase-account-detail");
  return (
    <PurchaseAccountForm method="patch" title="Purchase" account={account} />
  );
}
export default EditPurchaseAccountPage;
