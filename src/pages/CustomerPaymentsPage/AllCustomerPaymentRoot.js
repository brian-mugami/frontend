import React from 'react'
import { Outlet } from 'react-router-dom'
import CustomerPaymentNav from '../../components/CustomerPaymentComponents/CustomerPaymentNav'

function AllCustomerPaymentRoot() {
  return (
    <React.Fragment>
      <div className='px-4'>
        <CustomerPaymentNav/>
        <Outlet/>
        </div>
    </React.Fragment>
  )
}

export default AllCustomerPaymentRoot