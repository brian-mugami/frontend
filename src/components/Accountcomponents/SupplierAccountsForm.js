import { Form, redirect, useNavigate, useNavigation, json } from "react-router-dom";
import { getAuthToken } from "../../util/Auth";
import { accountTypes } from "../../data/paymenttypes";


function SupplierAccountForm({method, title, account}){
    const navigate = useNavigate()  
    const navigation = useNavigation()

    const isSubmitting = navigation.state === 'submitting';
    function cancelHandler(){
        navigate('..')
    }

    return(
    <Form method={method}>
        <h3>Create {title} Account</h3> 
        <p>
            <label>account name</label>
            <input placeholder="account name" type="text" name="accname" required defaultValue={account? account.account_name : ""}></input>
        </p>
        <p>
            <label>account description</label>
            <input placeholder="account description" type="text" rows="5" name="accdesc" defaultValue={account? account.account_description : ''}></input>
        </p>
        <p>
            <label>account number</label>
            <input placeholder="account number" type="text"  name="accnum" required defaultValue={account? account.account_number: ''}></input>
        </p>
        <div className="col-span-6 sm:col-span-3">
        <label className="block text-sm font-medium leading-6 text-gray-900">
          Supplier Payment Type
        </label>
        <select
          name="paytype"
          autoComplete="country-name"
          required
          defaultValue={account ? account.payment_type : ""}
          className="mt-2 block w-full rounded-md border-0 bg-white py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
          {accountTypes.map((type) => (
            <option key={type.id} value={type.account_type}>
              {" "}
              {type.payment_type}
            </option>
          ))}
        </select>
      </div>
      <div></div>
        <div>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Save'}
        </button>
      </div>
    </Form>)
}

export default SupplierAccountForm;

export async function action({request, params}){
    const method = request.method
    const data = await request.formData()
    const token = getAuthToken()

    const accountData = {
        account_name:data.get("accname"),
        account_description:data.get("accdesc"),
        account_number:data.get("accnum"),
        account_type: data.get("paytype")
    }

    let url = '/supplier/account'
    if(method==='POST'){
        const response = await fetch(url,{
            method: "POST",
            headers: {
                'Content-Type':'application/json',
                'Authorization': "Bearer " + token,
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(accountData)
        });
        if (!response.ok){
            window.alert("failed")
            throw json ({message: "Failed to save the account"}, {status: 500})
        }

        return redirect("/account/supplier")
    }else{
        const id = params.id
        url = '/supplier/account/'+id
        const response = await fetch(url,{
            method: "PATCH",
            headers: {
                'Content-Type':'application/json',
                'Authorization': "Bearer " + token,
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(accountData)
        });
        if (!response.ok){
            window.alert("failed update")
            throw json ({message: "Failed to update the account"}, {status: 500})
        }

        return redirect("/account/supplier")
    }
}
