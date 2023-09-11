import React, { useState } from "react";
import { redirect } from "react-router-dom";
import InventoryBalanceSearchForm from "../../components/InventoryBalancesComponents/InventoryBalanceSearchForm";
import InventoryBalanceSearchResultList from "../../components/InventoryBalancesComponents/InventoryBalanceSearchResultList";
import { getAuthToken } from "../../util/Auth";

function InventoryBalanceSearchPage() {
  const [balances, setBalances] = useState("");
  async function onSearchHandler(searchItem) {
    const token = getAuthToken();
    const response = await fetch("https://inventory-accounting.onrender.com/balance/search/?item_name=" + searchItem, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Access-Control-Allow-Origin": "*",
      },
    });

    if (!response.ok) {
      window.alert("This item does not exist. Please select again");
      return redirect("./");
    }

    const resData = await response.json();
    setBalances(resData.balances);
    console.log(balances);
    return balances;
  }
  return (
    <React.Fragment>
      <InventoryBalanceSearchForm
        onSearchHandler={onSearchHandler}
        className="justify-content-center"
      ></InventoryBalanceSearchForm>
      {balances.length > 0 && (
        <InventoryBalanceSearchResultList balances={balances} />
      )}
    </React.Fragment>
  );
}

export default InventoryBalanceSearchPage;
