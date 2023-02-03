import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthentificationPage, {
  action as AuthAction,
} from "./pages/UserPages/AuthentificationPage";
import ErrorPage from "./pages/UserPages/Error";
import HomePage from "./pages/UserPages/Home";
import RootLayout from "./pages/UserPages/Root";
import UsersPage, { loader as UsersLoader } from "./pages/UserPages/Users";
import UserDetailPage, {
  loader as UserDetailLoader,
  action as DeleteAction,
} from "./pages/UserPages/UserDetailPage";
import {tokenLoader } from "./util/Auth";
import EditUserPage from "./pages/UserPages/EditUser";
import { action as UserManipulateAction } from "./components/UserComponents/UserForm";
import { action as LogoutAction } from "./pages/UserPages/Logout";
import AccountRoot from "./pages/AccountPages/AccountsRoot";
import SupplierAccountsPage, {
  loader as supplieraccountsLoader,
} from "./pages/AccountPages/SupplierAccountPage";
import CustomerAccountsPage, {
  loader as customeraccountsloader,
} from "./pages/AccountPages/CustomeraccountPage";
import ItemAccountsPage, {
  loader as itemaccountsloader,
} from "./pages/AccountPages/ItemAccountPage";
import AllAccountRoot from "./pages/SupplierPages/SupplierAccountRoot";
import NewAccountPage from "./pages/AccountPages/Newaccount";
import { action as AccountAction } from "./components/UserComponents/UserForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: "root",
    loader: tokenLoader,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "auth",
        element: <AuthentificationPage />,
        action: AuthAction,
      },
      {
        path: "logout",
        action: LogoutAction,
      },
      {
        path: "account",
        element: <AccountRoot />,
        children: [
          {
            path: "supplier",
            element: <AllAccountRoot/>,
            loader: supplieraccountsLoader,
            id: "supplier",
            children:[
              {index: true, element:<SupplierAccountsPage />},
              {path: "new", element: <NewAccountPage/>, action: AccountAction}
            ]
          },
          {
            path: "customer",
            element: <AllAccountRoot />,
            loader: customeraccountsloader,
            id:"customer",
            children:[
              {index: true, element:<CustomerAccountsPage />}
            ]
          },
          {
            path: "item",
            element: <AllAccountRoot />,
            loader: itemaccountsloader,
            id:"item",
            children:[
              {index: true, element:<ItemAccountsPage/>}
            ]
          },
        ],
      },
      {
        path: "user",
        children: [
          { index: true, element: <UsersPage />, loader: UsersLoader },
          {
            path: ":userId",
            id: "user-detail",
            loader: UserDetailLoader,
            children: [
              {
                index: true,
                element: <UserDetailPage />,
                action: DeleteAction,
              },
              {
                path: "edit",
                element: <EditUserPage />,
                action: UserManipulateAction,
              },
            ],
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
