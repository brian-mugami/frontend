import React from 'react'
import { NavLink } from "react-router-dom"; 

function BankBalanceNav() {
  return (
    <React.Fragment>
      <div className="nav justify-content-center">
        <NavLink to="." className="nav-link">
          All Balances 
        </NavLink>

      </div>
    </React.Fragment>
  )
}

export default BankBalanceNav