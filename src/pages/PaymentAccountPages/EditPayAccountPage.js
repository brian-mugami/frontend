import { useRouteLoaderData } from "react-router-dom";
import PaymentAccountForm from "../../components/Accountcomponents/PaymentAccountForm";

function EditPaymentAccountPage(){
    const {account} = useRouteLoaderData("payment-account-detail")
    return(
        <PaymentAccountForm method="patch"  title="Payment" account={account}/>
    )
}
export default EditPaymentAccountPage;