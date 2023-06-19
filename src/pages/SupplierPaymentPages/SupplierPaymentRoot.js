import React from 'react'
import { Outlet } from 'react-router-dom'
import SupplierPaymentNav from '../../components/SupplierPaymentComponents/SupplierPaymentNav'

function SupplierPaymentRoot() {
  return (
    <React.Fragment>
      <div className='px-4'>
        <SupplierPaymentNav/>
        <Outlet/>
        </div>
    </React.Fragment>
  )
}

export default SupplierPaymentRoot