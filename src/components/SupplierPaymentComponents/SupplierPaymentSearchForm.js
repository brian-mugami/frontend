import React, { useState } from "react";
import { Form, useNavigate, useNavigation } from "react-router-dom";
import { defer, json, useLoaderData} from "react-router-dom/dist/umd/react-router-dom.development";
import { getAuthToken } from "../../util/Auth";

function SupplierPaymentSearchForm({ onSearch }) {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const [searchName, setSearchName] = useState("");
  const isSubmitting = navigation.state === "submitting";
  const {suppliers} = useLoaderData()
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
      <Form id="search-form" onSubmit={onSubmitHandler}>
        <label>Search the supplier</label>
        <input
          required
          name="supplier_name"
          type="text"
          list="options"
          placeholder="search supplier"
          value={searchName}
          onChange={onSearchHandler}
        />
        <datalist id="options">
          {suppliers.map((supplier) => (
            <option key={supplier.id} value={supplier.supplier_name} />
          ))}
        </datalist>
        <button
          disabled={isSubmitting || searchName.length === 0}
          type="submit"
          className="btn btn-success"
        >
          Search
        </button>
        <button onClick={cancelHandler} type="button" className="btn btn-dark">
          Cancel
        </button>
      </Form>
    </React.Fragment>
  );
}

export default SupplierPaymentSearchForm;

async function suppliersLoader(){
  const token = getAuthToken()
  const response = await fetch("https://flask-inventory.onrender.com/supplier", {
      method:"get",
      headers:{
          "Authorization": "Bearer "+ token
      }
  })
  if(!response.ok){
      throw json({message:"Cant get suppliers"}, {status:500})
  }else{
      const resData = await response.json()
      console.log(resData)
      return resData
  };
}

export async function loader (){
  return(
      defer({
          suppliers: await suppliersLoader()
      })
  )}
