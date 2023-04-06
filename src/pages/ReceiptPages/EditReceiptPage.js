import React from "react";
import { useRouteLoaderData } from "react-router-dom";
import ReceiptForm from "../../components/ReceiptComponents/ReceiptForm";

function ReceiptEditPage() {
  const receiptData = useRouteLoaderData("receipt-detail");
  return (
    <React.Fragment>
      <ReceiptForm method="patch" title="Edit" receiptData={receiptData} />
    </React.Fragment>
  );
}
export default ReceiptEditPage;