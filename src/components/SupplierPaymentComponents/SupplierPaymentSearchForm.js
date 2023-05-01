import React, { useState } from "react";
import {
  Form,
  useNavigate,
  useNavigation,
} from "react-router-dom";

function SupplierPaymentSearchForm({ onSearch }) {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const [searchName, setSearchName] = useState("");
  const isSubmitting = navigation.state === "submitting";

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
          placeholder="search supplier"
          value={searchName}
          onChange={onSearchHandler}
        />
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
