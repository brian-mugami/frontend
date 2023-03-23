import React from "react";
import { useSubmit, Link, useRouteLoaderData } from "react-router-dom";
import { PaperClipIcon } from '@heroicons/react/20/solid'
import card from "@material-tailwind/react/theme/components/card";

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
                <div>             
                <div className="overflow-hidden w-full bg-white shadow sm:rounded-lg ml-5">
                  <div className=" py-5 sm:px-3">
                    <h3 className="text-base font-semibold leading-6 text-gray-900">Supplier Details</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">Suppliers' information.</p>
                  </div>
                  <div className="border-t border-gray-200">
                    <dl>
                      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Supplier name</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{supplier.supplier_name}</dd>
                      </div>
                      <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Supplier number</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{supplier.supplier_number}</dd>
                      </div>
                      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Supplier contact</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{supplier.supplier_contact}</dd>
                      </div>
                      <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Supplier account</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{supplier.account.account_name}</dd>
                      </div>
                      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Supplier site</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        {supplier.supplier_site}
                        </dd>
                      </div>
                      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Supplier payment type</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        {supplier.payment_type}
                        </dd>
                      </div>
                      <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Is Item Active</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        {supplier.is_active ? "Active":"Inactive"}
                        </dd>
                      </div>
                      {token && 
                      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      
                        <dt className="text-sm font-medium text-gray-500"><button onClick={startDeleteHandler}>Delete</button></dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        <Link to="edit">Edit</Link>
                        </dd>
                        
                      </div>}
                    </dl>
                  </div>
                </div>
                </div> 
                
        )


}

export default SupplierItem;