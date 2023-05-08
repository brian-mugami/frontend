import React from 'react'
import InvoiceVoidForm from '../../components/InvoiceComponents/InvoiceVoidForm'
import { useRouteLoaderData } from 'react-router-dom/dist/umd/react-router-dom.development'

function InvoiceVoidPage() {
    const invoice = useRouteLoaderData("invoice-detail")
  return (
    <React.Fragment>
        <InvoiceVoidForm invoice={invoice}/>
    </React.Fragment>
  )
}

export default InvoiceVoidPage