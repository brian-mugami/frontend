import React, { useState } from "react";
import { Form, useNavigate, useNavigation } from "react-router-dom";
import { defer, json, useLoaderData } from "react-router-dom/dist/umd/react-router-dom.development";
import { getAuthToken } from "../../util/Auth";

function CustomerSearchPaymentForm({ onSearch }) {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const [searchName, setSearchName] = useState("");
  const isSubmitting = navigation.state === "submitting";
  const {customers} = useLoaderData()

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
        <label>Search the customer</label>
        <input
          required
          name="customer_name"
          type="text"
          list="options"
          placeholder="search customer"
          value={searchName}
          onChange={onSearchHandler}
        />
        <datalist id="options">
          {customers.map((customer) => (
            <option key={customer.id} value={customer.customer_name} />
          ))}
        </datalist>
        <button
          disabled={isSubmitting || searchName.length === 0}
          type="submit"
          className="btn btn-success"
        >
          {isSubmitting ? "Searching..." : "Search"}
        </button>
        <button onClick={cancelHandler} type="button" className="btn btn-dark">
          Cancel
        </button>
      </Form>
    </React.Fragment>
  );
}

export default CustomerSearchPaymentForm;

async function customersLoader(){
  const token = getAuthToken()
  const response = await fetch("https://inventory-accounting.onrender.com/customer", {
      method:"get",
      headers:{
          "Authorization": "Bearer "+ token
      }
  })
  if(!response.ok){
      throw json({message:"Cant get customers"}, {status:500})
  }else{
      const resData = await response.json()
      return resData
  };
}

export async function loader (){
  return(
      defer({
          customers: await customersLoader()
      })
  )}