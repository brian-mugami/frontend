import React from "react";
import { useSubmit, Link, useRouteLoaderData } from "react-router-dom";


function SupplierItem({supplier}){
    const token = useRouteLoaderData('root')
    const submit = useSubmit()

    function startDeleteHandler() {
        const proceed = window.confirm('Are you sure?');
    
        if (proceed) {
          submit(null, { method: 'delete'});
        }
      }

      return(




<div className="max-w-screen-lg mx-auto">
    <h2 className="text-lg font-semibold mb-4">suppliers</h2>
    <div className="shadow border rounded-md">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Suppliers' information.
            </th>

          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
         
            <>
            
              <tr className="hover:bg-gray-100 transition-colors duration-200"   >                      
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"> Supplier name </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">        {supplier.supplier_name}          </td>
              </tr>
              <tr className="hover:bg-gray-100 transition-colors duration-200" >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">    Supplier number        </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">    {supplier.supplier_number}      </td>
              </tr>
              <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">         Supplier contact       </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">           {supplier.supplier_phone_no}     </td>
              </tr>
              <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              Supplier email
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {supplier.supplier_email}
              </td> </tr>
              <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">        Supplier account      </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">        {supplier.account.account_name}     </td>
              </tr>
              <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">        Supplier site      </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">           {supplier.supplier_site}     </td>
              </tr>
              <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">         Supplier payment type    </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">         {supplier.payment_type}    </td>
              </tr>
              <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">        Supplier status      </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">        {supplier.is_active ? "Active":"Inactive"}    </td>
              </tr>

              <tr>
              {token && <menu>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"> <button onClick={startDeleteHandler}>Delete</button>  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"> <Link to="edit">Edit</Link></td>
                  </menu>}
              </tr>



              </>
         
        </tbody>
      </table>
    </div>
  
    
  </div>




































                
        )


}

export default SupplierItem;