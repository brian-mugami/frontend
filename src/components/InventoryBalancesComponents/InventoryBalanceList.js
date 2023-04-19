import React from 'react'

function InventoryBalanceList({balances}) {
  return (
    <table className="table table-striped">
  <thead>
    <tr key={balances.number}>
      <th scope="col">Balance Number</th>
      <th scope="col">Item Name</th>
      <th scope="col">Item Quantity</th>
      <th scope="col">Item Value</th>
    </tr>
  </thead>
  <tbody>
    {balances.map((balance)=>(
        <tr key={balance.number}>
        <th scope="row">{balance.number}</th>
        <td>{balance.item_name}</td>
        <td>{balance.quantity}</td>
        <td>{balance.value}</td>
      </tr>
    ))}
  </tbody>
</table>
  )
}

export default InventoryBalanceList