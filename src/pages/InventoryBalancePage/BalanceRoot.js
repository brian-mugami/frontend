import { Outlet, useRouteLoaderData } from "react-router-dom";
import React from "react";
import InventoryBalancesNav from "../../components/InventoryBalancesComponents/InventoryBalancesNav";

function BalanceRoot() {
    const {items} = useRouteLoaderData('inventory-balances') 
  return (
    <React.Fragment>
      <InventoryBalancesNav items={items}/>
      <Outlet />
    </React.Fragment>
  );
}

export default BalanceRoot;
