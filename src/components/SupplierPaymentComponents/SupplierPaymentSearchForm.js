import React, { useState } from "react";
import { Form, useNavigate, useNavigation } from "react-router-dom";
import {
  defer,
  json,
  useLoaderData,
} from "react-router-dom/dist/umd/react-router-dom.development";
import { getAuthToken } from "../../util/Auth";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

function SupplierPaymentSearchForm({ onSearch }) {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const [searchName, setSearchName] = useState("");
  const isSubmitting = navigation.state === "submitting";
  const { suppliers } = useLoaderData();
  const onSearchHandler = (event) => {
    setSearchName(event.target.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    onSearch(searchName);
  };

  const cancelHandler = () => {
    navigate("..");
  };

  return (
    <React.Fragment>
      <div className="sm:col-span-4">
        <Form id="search-form" onSubmit={onSubmitHandler}>
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Search the supplier
          </label>
          <input
            required
            name="supplier_name"
            type="text"
            list="options"
            className="block w-half rounded-md border-0 py-1.5 text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="search supplier"
            value={searchName}
            onChange={onSearchHandler}
          />
          <datalist id="options">
            {suppliers.map((supplier) => (
              <option key={supplier.id} value={supplier.supplier_name} />
            ))}
          </datalist>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              onClick={cancelHandler}
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || searchName.length === 0}
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Search
            </button>
          </div>
        </Form>
      </div>
    </React.Fragment>
  );
}

export default SupplierPaymentSearchForm;

async function suppliersLoader() {
  const token = getAuthToken();
  const response = await fetch(
    "https://flask-inventory.onrender.com/supplier",
    {
      method: "get",
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  if (!response.ok) {
    throw json({ message: "Cant get suppliers" }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData;
  }
}

export async function loader() {
  return defer({
    suppliers: await suppliersLoader(),
  });
}
