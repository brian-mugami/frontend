import React from "react";

function ExpensesList({balances}) {
  return (
    <React.Fragment>
      <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Item Name</th>
            <th scope="col">Item Quantity</th>
            <th scope="col">Item Value</th>
          </tr>
        </thead>
        <tbody>
        {balances.map((balance) => (
          <tr key={balance.number}>
            <th scope="row">{balance.number}</th>
            <td>{balance.item_name}</td>
            <td>{balance.quantity}</td>
            <td>{balance.value}</td>
          </tr>
        ))}
      </tbody>
      </table>
    </React.Fragment>
  );
}

export default ExpensesList;
