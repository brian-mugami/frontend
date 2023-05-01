import React from 'react'

function SupplierBalanceList({balances}) {
  return (
    <table className="table table-striped">
      <thead>
        <tr key={balances.number}>
          <th scope="col">Balance Number</th>
          <th scope="col">Supplier Name</th>
          <th scope="col">Currency</th>
          <th scope="col">Amount</th>
        </tr>
      </thead>
      <tbody>
        {balances.map((balance) => (
          <tr key={balance.number}>
            <th scope="row">{balance.number}</th>
            <td>{balance.supplier_name}</td>
            <td>{balance.currency}</td>
            <td>{balance.total_amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default SupplierBalanceList