import React from "react";
import { useRouteLoaderData } from "react-router-dom";
import InvoiceForm from "../../components/InvoiceComponents/InvoiceForm";

function InvoiceEditPage() {
  const invoiceData = useRouteLoaderData("invoice-detail");
  return (
    <React.Fragment>
      <InvoiceForm method="patch" title="Edit" invoiceData={invoiceData} />
    </React.Fragment>
  );
}
export default InvoiceEditPage;
