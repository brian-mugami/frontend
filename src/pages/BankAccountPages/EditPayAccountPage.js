import { useRouteLoaderData } from "react-router-dom";
import PaymentAccountForm from "../../components/AccountComponents/BankAccountForm";

function EditPaymentAccountPage(){
    const {account} = useRouteLoaderData("payment-account-detail")
    return(
        <PaymentAccountForm method="patch"  title="Bank" account={account}/>
    )
}
export default EditPaymentAccountPage;