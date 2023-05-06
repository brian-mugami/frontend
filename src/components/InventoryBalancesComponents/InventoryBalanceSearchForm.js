import { Form, useNavigation, useRouteLoaderData } from "react-router-dom";
import React, { useState } from "react";
import { Button } from "@material-tailwind/react";

function InventoryBalanceSearchForm({onSearchHandler}) {
    const [search, setSearch] = useState("")
    const navigation = useNavigation()

    const {items} = useRouteLoaderData("inventory-balances")

    const isSubmitting = navigation === "submitting"
    function onSearch(event){
        setSearch(event.target.value)
    }

    function onSubmit(event){
        event.preventDefault()
        onSearchHandler(search)
    }

  return (
    <React.Fragment>
      <Form className="d-flex" role="search" onSubmit={onSubmit} method="post">
        <input
          className="form-control me-2"
          list="options2"
          placeholder="Search item"
          aria-label="Search"
          name="search-balance"
          onChange={onSearch}
          value={search}
        />
        <datalist id="options2">
          {items.map((item) => (
            <option key={item.id} value={item.item_name} />
          ))}
        </datalist>
        <Button  type="submit" disabled={isSubmitting}>
          Search
        </Button>
      </Form>
    </React.Fragment>
  );
}

export default InventoryBalanceSearchForm;
