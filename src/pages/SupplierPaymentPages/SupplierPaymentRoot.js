import React from 'react'
import { Outlet } from 'react-router-dom'
import SupplierPaymentNav from '../../components/SupplierPaymentComponents/SupplierPaymentNav'

function SupplierPaymentRoot() {
  return (
    <React.Fragment>
        <SupplierPaymentNav/>
        <Outlet/>
    </React.Fragment>
  )
}

export default SupplierPaymentRoot