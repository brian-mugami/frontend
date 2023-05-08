import React from 'react'
import { useRouteLoaderData } from 'react-router-dom/dist/umd/react-router-dom.development';
import SupplierPaymentRejectForm from '../../components/SupplierPaymentComponents/SupplierPaymentRejectForm';

function SupplierPaymentRejectPage() {
    const { payment } = useRouteLoaderData("payment");
  return (
    <React.Fragment>
    <SupplierPaymentRejectForm
      bank={payment.account.account_name}
      amount={payment.amount}
      supplier = {payment.invoice.supplier.supplier_name}
      currency={payment.currency}
    />
  </React.Fragment>
  )
}

export default SupplierPaymentRejectPage