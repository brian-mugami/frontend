import React from 'react'
import UserRootComp from '../../components/UserComponents/UserRootComp'
import { Outlet } from 'react-router-dom/dist/umd/react-router-dom.development'

function UserRootPage() {
  return (
    <React.Fragment>
        <UserRootComp/>
        <Outlet/>
    </React.Fragment>
  )
}

export default UserRootPage