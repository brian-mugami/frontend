import { Form, redirect, useNavigate, useNavigation, json } from "react-router-dom";
import { getAuthToken } from "../../util/Auth";
import { accountTypes } from "../../data/paymenttypes";


function ItemAccountForm({method, title, account}){
    const navigate = useNavigate()  
    const navigation = useNavigation()

    const isSubmitting = navigation.state === 'submitting';
    function cancelHandler(){
        navigate('..')
    }

    return(
    <Form method={method}>












<div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Create {title} Account</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Input  details here.</p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            


      
          <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
              account name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="accname"
                
                  required defaultValue={account? account.account_name : ""}
                  placeholder="account name"               
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>





            <div className="sm:col-span-2">
              <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
              account description
              </label>
              <div className="mt-2">
                <input
                   type="text"
                   name="accdesc"
                  rows="5"
                  
                  placeholder="account description" 
                  defaultValue={account? account.account_description : ''}
                 
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>





            <div className="sm:col-span-2">
              <label htmlFor="Item-Volume" className="block text-sm font-medium leading-6 text-gray-900">
              account number
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="accnum" 
                  required defaultValue={account? account.account_number: ''}            
                  placeholder="account number"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>





 

            <div className="sm:col-span-1">
              <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
              Payment Type
              </label>
              <div className="mt-2">
                <select
                 name="paytype"
                  
                  name="category"
                  required defaultValue={account ? account.payment_type : ""}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                        {accountTypes.map((type) => (
            <option key={type.id} value={type.account_type}>
              {" "}
              {type.payment_type}
            </option>
          ))}

                </select>
              </div>
            </div>
  
          </div>



          <div className=" px-4 py-3 pb-10 text-right sm:px-6">
                  <button
                    type="button"
                    onClick={cancelHandler}
                    disabled={isSubmitting}
                    className="inline-flex justify-center rounded-md bg-indigo-600 mr-5 py-2 px-3 text-sm font-semibold text-white  hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    Cancel
                  </button>
                  <button
                    disabled={isSubmitting}
                    className="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white  hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    {isSubmitting ? "Submitting..." : "Save"}
                  </button>
                </div>






        </div>


    </Form>)
}

export default ItemAccountForm;

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

    let url = '/category/account'
    if(method==='POST'){
        const response = await fetch(url,{
            method: method,
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

        return redirect("/account/item")
    }else{
        const id = params.id
        url = '/category/account/'+id
        const response = await fetch(url,{
            method: method,
            headers: {
                'Content-Type':'application/json',
                'Authorization': "Bearer " + token,
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(accountData)
        });
        if (!response.ok){
            window.alert("failed update")
            throw json ({message: "Failed to save the account"}, {status: 500})
        }

        return redirect("/account/item")
    }
}
