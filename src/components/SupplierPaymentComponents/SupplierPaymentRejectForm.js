import React from "react";
import { Form, useActionData, useNavigate, useNavigation, json, redirect } from "react-router-dom";
import Modal from "../UIComponents/Modal";
import { getAuthToken } from "../../util/Auth";

function SupplierPaymentRejectForm({ bank, amount, supplier, currency }) {
    const data = useActionData()
    const navigation = useNavigation();
    const navigate = useNavigate();
    const isSubmitting = navigation.state === "submitting";
    function cancelHandler() {
      navigate("/payment");
    }
  return (
    <Modal>
    <h3 className="text-base font-semibold leading-7 text-gray-900">Payment Rejection Form</h3>
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
        Are you sure you want to reject this payment of <b>{currency} {amount}{" "}</b> 
      </p>
      <p className="mt-1 text-sm leading-6 text-gray-600">
        To <strong>supplier</strong>:{supplier} from <strong>bank</strong> :
        {bank}
      </p>


      
      <div className="col-span-full pt-2">
              <label htmlFor="reason" className="block text-sm font-medium leading-6 text-gray-900">
                Reason
              </label>
              <div className="mt-2">
                <textarea
                  id="reason"
                  name="reason"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={''}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">Write the reason for Rejection .</p>
            </div>      
            
            <div  className="mt-6 flex items-center justify-end gap-x-6">
      <button 
      type="button" 
      onClick={cancelHandler}

      >
        No
      </button>
      <button 
      type="submit" 
      disabled={isSubmitting}
      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"

      >
        Yes
      </button>
      </div>
    </Form>
  </Modal>
  )
}

export default SupplierPaymentRejectForm;

export async function action({ request, params }) {
    const token = getAuthToken();
    const id = params.id;
    let url = "/payment/reject/" + id;
    const data = await request.formData()

    const rejectData = {
        reason: data.get('reason')
    }
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(rejectData)
    });
    if (response.status === 400){
      return response
    }
    if (!response.ok) {
      window.alert("Failed to reject payment");
      throw json({ message: "Failed to reject payment" }, { status: 500 });
    }
    return redirect("/payment");
  }