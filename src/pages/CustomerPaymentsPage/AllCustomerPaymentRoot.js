import React from 'react'
import { Outlet } from 'react-router-dom'
import CustomerPaymentNav from '../../components/CustomerPaymentComponents/CustomerPaymentNav'

function AllCustomerPaymentRoot() {
  return (
    <React.Fragment>
        <CustomerPaymentNav/>
        <Outlet/>
    </React.Fragment>
  )
}

export default AllCustomerPaymentRoot