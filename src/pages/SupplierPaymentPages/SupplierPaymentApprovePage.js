import React from "react";
import { useRouteLoaderData } from "react-router-dom";
import SupplierPaymentApproveForm from "../../components/SupplierPaymentComponents/SupplierPaymentApproveForm";

function SupplierPaymentApprovePage() {
  const { payment } = useRouteLoaderData("payment");
  return (
    <React.Fragment>
      <SupplierPaymentApproveForm
        bank={payment.account.account_name}
        amount={payment.amount}
        supplier = {payment.invoice.supplier.supplier_name}
        currency={payment.currency}
      />
    </React.Fragment>
  );
}

export default SupplierPaymentApprovePage;
