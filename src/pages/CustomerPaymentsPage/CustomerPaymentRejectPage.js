import React from 'react'
import { Form, json, redirect, useActionData, useNavigate, useNavigation, useRouteLoaderData } from 'react-router-dom/dist/umd/react-router-dom.development'
import { getAuthToken } from '../../util/Auth'
import Modal from '../../components/UIComponents/Modal'

function CustomerPaymentRejectPage() {
    const payment  = useRouteLoaderData("customer-payment-detail")
    const data = useActionData()
    const navigation = useNavigation();
    const navigate = useNavigate();
    const isSubmitting = navigation.state === "submitting";
    function cancelHandler() {
      navigate("/customer-payment");
    }
  return (
    <Modal>
    <h3 className="text-base font-semibold leading-7 text-gray-900">Payment Approval Form</h3>
    {data && data.errors && (
      <ul>
        {Object.values(data.errors).map((err) => (
          <li key={err}>{err}</li>
        ))}
      </ul>
    )}
    {data && data.message && <p>{data.message}</p>}
    <Form method="post">
      <p className="mt-1 text-sm leading-6 text-gray-600">
        Are you sure you want to reject this payment of <b>{payment.currency} {payment.amount}{" "}</b> 
      </p>
      <p className="mt-1 text-sm leading-6 text-gray-600">
        from <strong>customer</strong>:{payment.receipt.customer.customer_name} to <b>{payment.account.account_name}</b>
      </p>
      <input name="reason" type="text" placeholder="reason" required></input>
      <div  className="mt-6 flex items-center justify-end gap-x-6">
      <button type="submit" disabled={isSubmitting}>
        Yes
      </button>
      <button type="button" onClick={cancelHandler}>
        No
      </button>
      </div>
    </Form>
  </Modal>
  )
}

export default CustomerPaymentRejectPage

export async function action({request,params}){
    const data = await request.formData()
    const id = params.id
    const token = getAuthToken()
    const rejectData = {
        reason : data.get("reason")
    }

    const response = await fetch('https://inventory-accounting.onrender.com/customer/payment/reject/'+id, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(rejectData)
    })

    if(response.status === 400){
        return response
    }
    if(!response.ok){
        throw json({message: "Can not reject the payment", status: 400})
    }
    return redirect('/customer-payment')
}