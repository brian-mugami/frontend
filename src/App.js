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
} from "./pages/SupplierPages/SupplierAccounts/SupplierAccountPage";
import CustomerAccountsPage, {
  loader as customeraccountsloader,
} from "./pages/CustomerPages/CustomerAccountPages/CustomeraccountPage";
import ItemAccountsPage, {
  loader as itemaccountsloader,
} from "./pages/ItemPages/ItemAccountPages/ItemAccountPage";
import AllAccountRoot from "./pages/AccountPages/SubAccountRoot";
import NewSupplierAccountPage from "./pages/SupplierPages/SupplierAccounts/NewSupplierAccount";
import NewCustomerAccountPage from "./pages/CustomerPages/CustomerAccountPages/NewCustomerAccount";
import NewItemAccountPage from "./pages/ItemPages/ItemAccountPages/NewItemAccount";
import {action as SupplierAccountAction} from "./components/Accountcomponents/SupplierAccountsForm"
import {action as CreateItemAccountAction} from './components/Accountcomponents/ItemaccountForm'
import {action as CreateCustomerAccountAction} from './components/Accountcomponents/Customeraccountform'
import SupplierAccountDetailPage, {loader as supplierAccountLoader} from "./pages/SupplierPages/SupplierAccounts/SupplierAccountDetailPage";

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
              {path: "new", element: <NewSupplierAccountPage/>, action: SupplierAccountAction},
              {path: ":id", id: "supplier-detail", loader: supplierAccountLoader, children: [
                {index: true, element:<SupplierAccountDetailPage/>},
                {path:"edit", element:<SupplierEditPage/>}
              ]}
            ]
          },
          {
            path: "customer",
            element: <AllAccountRoot />,
            loader: customeraccountsloader,
            id:"customer",
            children:[
              {index: true, element:<CustomerAccountsPage />},
              {path: "new", element: <NewCustomerAccountPage/>, action: CreateCustomerAccountAction}
            ]
          },
          {
            path: "item",
            element: <AllAccountRoot />,
            loader: itemaccountsloader,
            id:"item",
            children:[
              {index: true, element:<ItemAccountsPage/>},
              {path: "new", element: <NewItemAccountPage/>, action: CreateItemAccountAction}
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
