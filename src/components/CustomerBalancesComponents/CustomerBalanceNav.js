import React from 'react'
import { NavLink } from "react-router-dom"; 

function CustomerBalanceNav() {
  return (
    <React.Fragment>
      <div className="nav justify-content-center">
        <NavLink to="." className="nav-link">
          All Balances
        </NavLink>
        <NavLink to="./search" className="nav-link">
          Search
        </NavLink>
      </div>
    </React.Fragment>
  )
}

export default CustomerBalanceNav