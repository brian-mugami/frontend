import { json, useLoaderData } from "react-router-dom";
import InvoiceForm from "../../components/InvoiceComponents/InvoiceForm";
import { getAuthToken } from "../../util/Auth";

function NewInvoicePage() {

  return <InvoiceForm method="post" title="Invoice" />;
}

export default NewInvoicePage;
